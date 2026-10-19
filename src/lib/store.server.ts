import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, readdirSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import {
  ACTIVE_CELL_IDS,
  type ActiveCellId,
  type CellConfig,
  type CellType,
  cloneDefaults,
  isActiveCellId,
} from "@/lib/wall-config";

const CELL_TYPES = new Set<CellType>(["video", "iframe", "image", "html", "clock", "board", "prices"]);

export type Branding = {
  title: string;
  description: string;
  customHtml: string;
  customCss: string;
  featureImage: string;
  favicon: string;
  yunohost: boolean;
};

export type PublicWall = {
  hash: string;
  cells: Record<ActiveCellId, CellConfig>;
  updatedAt: number;
};

function openStorage() {
  const preferred = process.env.SIXTEEN_DATA_DIR
    ? [process.env.SIXTEEN_DATA_DIR]
    : process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME
      ? [join(tmpdir(), "sixteen")]
      : [join(process.cwd(), "data", "sixteen")];
  const candidates = [...new Set([...preferred, join(tmpdir(), "sixteen")])];
  let last: unknown;
  for (const dir of candidates) {
    try {
      const brand = join(dir, "brand");
      mkdirSync(brand, { recursive: true });
      const database = new DatabaseSync(join(dir, "sixteen.db"));
      database.exec(`
        CREATE TABLE IF NOT EXISTS walls (
          hash TEXT PRIMARY KEY,
          token_hash TEXT NOT NULL,
          cells TEXT NOT NULL,
          created_at INTEGER NOT NULL,
          updated_at INTEGER NOT NULL
        )
      `);
      return { dataDir: dir, brandDir: brand, db: database };
    } catch (error) {
      last = error;
    }
  }
  throw last;
}

const storage = openStorage();
const dataDir = storage.dataDir;
const brandDir = storage.brandDir;
const db = storage.db;

const DEFAULT_BRAND: Branding = {
  title: "Sixteen",
  description:
    "A 16-cell video wall. Four cameras on top, four on the bottom, a program in the center, two custom frames on the sides.",
  customHtml: "",
  customCss: "",
  featureImage: "",
  favicon: "",
  yunohost: process.env.SIXTEEN_YUNOHOST === "1",
};

function slug(length: number) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
  const bytes = randomBytes(length);
  let out = "";
  for (let i = 0; i < length; i++) out += alphabet[bytes[i]! % alphabet.length];
  return out;
}

function tokenHash(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function tokensMatch(given: string, expectedHex: string) {
  const actual = Buffer.from(tokenHash(given), "hex");
  const expected = Buffer.from(expectedHex, "hex");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export function normalizeCells(input: unknown): Record<ActiveCellId, CellConfig> {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw new Error("A wall needs its 16 cells.");
  }
  const cells = cloneDefaults();
  for (const [key, value] of Object.entries(input as Record<string, CellConfig>)) {
    const id = Number(key);
    if (!isActiveCellId(id) || !value || typeof value !== "object") continue;
    const type = CELL_TYPES.has(value.type) ? value.type : cells[id].type;
    cells[id] = {
      ...cells[id],
      ...value,
      id,
      type,
      label: String(value.label ?? cells[id].label).slice(0, 24),
      src: value.src ? String(value.src).slice(0, 4000) : value.src,
      html: value.html ? String(value.html).slice(0, 100_000) : value.html,
      symbols: value.symbols ? String(value.symbols).slice(0, 240) : value.symbols,
    };
  }
  if (JSON.stringify(cells).length > 500_000) throw new Error("That wall is too large to save.");
  return cells;
}

export function readBranding(): Branding {
  const path = join(dataDir, "branding.json");
  let raw: Record<string, unknown> = {};
  try {
    if (existsSync(path)) raw = JSON.parse(readFileSync(path, "utf8")) as Record<string, unknown>;
  } catch {
    raw = {};
  }
  const text = (value: unknown, fallback: string) =>
    typeof value === "string" ? value.slice(0, 100_000) : fallback;
  const feature = brandPublicPath("feature") || text(raw.featureImage, "");
  const icon = brandPublicPath("favicon") || text(raw.favicon, "");
  return {
    title: text(raw.site_title ?? raw.title, DEFAULT_BRAND.title).slice(0, 80) || DEFAULT_BRAND.title,
    description: text(raw.site_description ?? raw.description, DEFAULT_BRAND.description).slice(0, 300),
    customHtml: text(raw.custom_html ?? raw.customHtml, ""),
    customCss: text(raw.custom_css ?? raw.customCss, ""),
    featureImage: feature,
    favicon: icon,
    yunohost: process.env.SIXTEEN_YUNOHOST === "1",
  };
}

function brandPublicPath(kind: "feature" | "favicon") {
  const found = readdirSync(brandDir).find((name) => name.startsWith(`${kind}.`));
  return found ? `/api/brand/${kind}` : "";
}

export function readBrandFile(kind: string) {
  if (kind !== "feature" && kind !== "favicon") return null;
  const found = readdirSync(brandDir).find((name) => name.startsWith(`${kind}.`));
  if (!found) return null;
  const path = join(brandDir, found);
  const ext = found.split(".").pop()?.toLowerCase() || "";
  const type =
    ext === "svg"
      ? "image/svg+xml"
      : ext === "jpg" || ext === "jpeg"
        ? "image/jpeg"
        : ext === "webp"
          ? "image/webp"
          : ext === "ico"
            ? "image/x-icon"
            : "image/png";
  return { body: readFileSync(path), type };
}

function writeDataUrl(dataUrl: string, kind: "feature" | "favicon") {
  const match = /^data:(image\/[a-zA-Z0-9.+-]+);base64,([a-zA-Z0-9+/=\s]+)$/.exec(dataUrl);
  if (!match) throw new Error("Use a PNG, JPEG, WEBP, or SVG.");
  const mime = match[1];
  const ext =
    mime === "image/svg+xml"
      ? "svg"
      : mime === "image/jpeg"
        ? "jpg"
        : mime === "image/webp"
          ? "webp"
          : mime === "image/x-icon"
            ? "ico"
            : "png";
  const body = Buffer.from(match[2] ?? "", "base64");
  if (body.length < 16 || body.length > 2_000_000) throw new Error("Image must be under 2 MB.");
  for (const name of readdirSync(brandDir)) {
    if (name.startsWith(`${kind}.`)) unlinkSync(join(brandDir, name));
  }
  writeFileSync(join(brandDir, `${kind}.${ext}`), body);
}

export function saveBranding(input: {
  title: string;
  description: string;
  customHtml: string;
  customCss: string;
  featureImageDataUrl?: string;
  faviconDataUrl?: string;
  clearFeature?: boolean;
  clearFavicon?: boolean;
}) {
  if (process.env.SIXTEEN_YUNOHOST === "1") {
    throw new Error("Site style is set in the YunoHost webadmin: Applications → Sixteen → Site style.");
  }
  if (input.clearFeature) {
    for (const name of readdirSync(brandDir)) {
      if (name.startsWith("feature.")) unlinkSync(join(brandDir, name));
    }
  }
  if (input.clearFavicon) {
    for (const name of readdirSync(brandDir)) {
      if (name.startsWith("favicon.")) unlinkSync(join(brandDir, name));
    }
  }
  if (input.featureImageDataUrl) writeDataUrl(input.featureImageDataUrl, "feature");
  if (input.faviconDataUrl) writeDataUrl(input.faviconDataUrl, "favicon");
  const current = readBranding();
  const next = {
    site_title: input.title.trim().slice(0, 80) || DEFAULT_BRAND.title,
    site_description: input.description.trim().slice(0, 300),
    custom_html: input.customHtml.slice(0, 100_000),
    custom_css: input.customCss.slice(0, 100_000),
    featureImage: current.featureImage,
    favicon: current.favicon,
  };
  writeFileSync(join(dataDir, "branding.json"), JSON.stringify(next, null, 2));
  return readBranding();
}

export function getWall(hash: string): PublicWall | null {
  if (!/^[a-z0-9]{8,16}$/.test(hash)) return null;
  const row = db.prepare("SELECT cells, updated_at FROM walls WHERE hash = ?").get(hash) as
    | { cells: string; updated_at: number }
    | undefined;
  if (!row) return null;
  return { hash, cells: normalizeCells(JSON.parse(row.cells)), updatedAt: row.updated_at };
}

export function saveWall(input: { cells: unknown; hash?: string; editToken?: string }) {
  const cells = normalizeCells(input.cells);
  const now = Date.now();
  const encoded = JSON.stringify(cells);

  if (input.hash) {
    if (!/^[a-z0-9]{8,16}$/.test(input.hash)) throw new Error("Unknown wall.");
    const row = db.prepare("SELECT token_hash FROM walls WHERE hash = ?").get(input.hash) as
      | { token_hash: string }
      | undefined;
    if (!row) throw new Error("Unknown wall.");
    if (!input.editToken || !tokensMatch(input.editToken, row.token_hash)) {
      throw new Error("Only the creator of this wall can change it.");
    }
    db.prepare("UPDATE walls SET cells = ?, updated_at = ? WHERE hash = ?").run(encoded, now, input.hash);
    return { hash: input.hash, editToken: input.editToken, created: false };
  }

  let hash = slug(10);
  for (let i = 0; i < 5 && getWall(hash); i++) hash = slug(10);
  const editToken = slug(24);
  db.prepare("INSERT INTO walls (hash, token_hash, cells, created_at, updated_at) VALUES (?, ?, ?, ?, ?)").run(
    hash,
    tokenHash(editToken),
    encoded,
    now,
    now,
  );
  return { hash, editToken, created: true };
}

const CRYPTO: Record<string, string> = {
  btc: "bitcoin",
  eth: "ethereum",
  sol: "solana",
  xrp: "ripple",
  ada: "cardano",
  doge: "dogecoin",
  dot: "polkadot",
  ltc: "litecoin",
  bnb: "binancecoin",
  avax: "avalanche-2",
  link: "chainlink",
  matic: "polygon-ecosystem-token",
  pol: "polygon-ecosystem-token",
  ton: "the-open-network",
  usdt: "tether",
  usdc: "usd-coin",
  xmr: "monero",
};

export type Quote = {
  symbol: string;
  name: string;
  price: number | null;
  change: number | null;
};

type Spec = { symbol: string; kind: "crypto" | "stock"; id: string };

const quoteCache = new Map<string, { at: number; quote: Quote }>();

function parseSymbols(raw: string): Spec[] {
  const seen = new Set<string>();
  const specs: Spec[] = [];
  for (const part of raw.split(/[\s,;]+/)) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const key = trimmed.toLowerCase().replace(/-usd$/, "");
    if (CRYPTO[key]) {
      const symbol = key.toUpperCase();
      if (seen.has(symbol)) continue;
      seen.add(symbol);
      specs.push({ symbol, kind: "crypto", id: CRYPTO[key] });
      continue;
    }
    const stock = trimmed.toUpperCase().replace(/[^A-Z0-9.\-]/g, "").slice(0, 12);
    if (!stock || seen.has(stock)) continue;
    seen.add(stock);
    specs.push({ symbol: stock, kind: "stock", id: stock });
    if (specs.length >= 12) break;
  }
  return specs;
}

async function fetchCrypto(specs: Spec[]) {
  if (!specs.length) return;
  const ids = [...new Set(specs.map((spec) => spec.id))].join(",");
  const response = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(ids)}&vs_currencies=usd&include_24hr_change=true`,
    { headers: { accept: "application/json" }, signal: AbortSignal.timeout(8000) },
  );
  if (!response.ok) return;
  const data = (await response.json()) as Record<string, { usd?: number; usd_24h_change?: number }>;
  for (const spec of specs) {
    const row = data[spec.id];
    quoteCache.set(spec.symbol, {
      at: Date.now(),
      quote: {
        symbol: spec.symbol,
        name: spec.id,
        price: typeof row?.usd === "number" ? row.usd : null,
        change: typeof row?.usd_24h_change === "number" ? row.usd_24h_change : null,
      },
    });
  }
}

async function fetchStocks(specs: Spec[]) {
  await Promise.all(
    specs.map(async (spec) => {
      const response = await fetch(
        `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(spec.id)}?range=5d&interval=1d`,
        {
          headers: { "user-agent": "Mozilla/5.0 Sixteen/1.0" },
          signal: AbortSignal.timeout(8000),
        },
      );
      if (!response.ok) return;
      const data = (await response.json()) as {
        chart?: {
          result?: Array<{
            meta?: {
              shortName?: string;
              longName?: string;
              regularMarketPrice?: number;
              regularMarketChangePercent?: number;
            };
          }>;
        };
      };
      const meta = data.chart?.result?.[0]?.meta;
      quoteCache.set(spec.symbol, {
        at: Date.now(),
        quote: {
          symbol: spec.symbol,
          name: meta?.shortName || meta?.longName || spec.symbol,
          price: typeof meta?.regularMarketPrice === "number" ? meta.regularMarketPrice : null,
          change:
            typeof meta?.regularMarketChangePercent === "number" ? meta.regularMarketChangePercent : null,
        },
      });
    }),
  );
}

export async function getQuotes(raw: string): Promise<Quote[]> {
  const specs = parseSymbols(raw);
  const stale = specs.filter((spec) => {
    const hit = quoteCache.get(spec.symbol);
    return !hit || Date.now() - hit.at > 60_000;
  });
  await Promise.allSettled([
    fetchCrypto(stale.filter((spec) => spec.kind === "crypto")),
    fetchStocks(stale.filter((spec) => spec.kind === "stock")),
  ]);
  return specs.map((spec) => {
    return (
      quoteCache.get(spec.symbol)?.quote ?? {
        symbol: spec.symbol,
        name: spec.symbol,
        price: null,
        change: null,
      }
    );
  });
}

export const WALL_IDS = ACTIVE_CELL_IDS;
