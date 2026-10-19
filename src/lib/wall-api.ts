import { createServerFn } from "@tanstack/react-start";
import type { CellConfig } from "@/lib/wall-config";

export const getBrandingPublic = createServerFn({ method: "GET" }).handler(async () => {
  const { readBranding } = await import("./store.server");
  const { getRequestUrl } = await import("@tanstack/react-start/server");
  const brand = readBranding();
  const origin = new URL(getRequestUrl()).origin;
  return {
    ...brand,
    featureImageUrl: brand.featureImage ? new URL(brand.featureImage, origin).href : "",
    faviconUrl: brand.favicon ? new URL(brand.favicon, origin).href : "/favicon.svg",
    origin,
  };
});

export const saveBrandingPublic = createServerFn({ method: "POST" })
  .validator(
    (data: {
      title: string;
      description: string;
      customHtml: string;
      customCss: string;
      featureImageDataUrl?: string;
      faviconDataUrl?: string;
      clearFeature?: boolean;
      clearFavicon?: boolean;
    }) => data,
  )
  .handler(async ({ data }) => {
    const { saveBranding } = await import("./store.server");
    return saveBranding(data);
  });

export const getWallPublic = createServerFn({ method: "GET" })
  .validator((data: { hash: string }) => data)
  .handler(async ({ data }) => {
    const { getWall, readBranding } = await import("./store.server");
    const { getRequestUrl } = await import("@tanstack/react-start/server");
    const wall = getWall(data.hash);
    if (!wall) return null;
    const origin = new URL(getRequestUrl()).origin;
    const brand = readBranding();
    return {
      hash: wall.hash,
      cells: wall.cells,
      updatedAt: wall.updatedAt,
      url: `${origin}/tv/${wall.hash}`,
      brand: {
        ...brand,
        featureImageUrl: brand.featureImage ? new URL(brand.featureImage, origin).href : "",
        faviconUrl: brand.favicon ? new URL(brand.favicon, origin).href : "/favicon.svg",
      },
    };
  });

export const publishWall = createServerFn({ method: "POST" })
  .validator((data: { cells: Record<string, CellConfig>; hash?: string; editToken?: string }) => data)
  .handler(async ({ data }) => {
    const { saveWall } = await import("./store.server");
    const { getRequestUrl } = await import("@tanstack/react-start/server");
    const saved = saveWall(data);
    const origin = new URL(getRequestUrl()).origin;
    return {
      hash: saved.hash,
      editToken: saved.editToken,
      created: saved.created,
      path: `/tv/${saved.hash}`,
      url: `${origin}/tv/${saved.hash}`,
    };
  });

export const getQuotesPublic = createServerFn({ method: "GET" })
  .validator((data: { symbols: string }) => data)
  .handler(async ({ data }) => {
    const { getQuotes } = await import("./store.server");
    return getQuotes(data.symbols || "");
  });
