/**
 * SIXTEEN — 16-cell wall on a 1920×1080 canvas
 *
 * Each cell is 480×270 (exactly 16:9). Edit DEFAULT_CELLS below.
 * In the preview you can also press E and click a frame.
 *
 *   ┌────────┬────────┬────────┬────────┐
 *   │   01   │   02   │   03   │   04   │  top row — four videos
 *   ├────────┼────────┴────────┼────────┤
 *   │        │                 │        │
 *   │   05   │       06        │   08   │  05 = left custom  (cells 05+09)
 *   │        │     CENTER      │        │  06 = center video (cells 06+07+10+11)
 *   │  480×  │     960×540     │  480×  │  08 = right custom (cells 08+12)
 *   │   540  │   (size of 4)   │   540  │
 *   ├────────┼────────┬────────┼────────┤
 *   │   13   │   14   │   15   │   16   │  bottom row — four videos
 *   └────────┴────────┴────────┴────────┘
 *
 * Cells 07, 09, 10, 11, 12 are consumed by those merges.
 *
 * `src` accepts:
 *   - a direct video file (.mp4 / .webm)
 *   - a YouTube video, short, or playlist URL
 *   - a Vimeo URL
 *   - a PeerTube video (/w/…) or playlist (/w/p/…)
 *   - any embed URL when type is "iframe"
 *   - an image URL when type is "image"
 *
 * `html` is raw markup for a side frame (type: "html"). Scripts run
 * inside a sandboxed iframe, so you can drop in widgets or snippets.
 */

export type CellType = "video" | "iframe" | "image" | "html" | "clock" | "board" | "prices";

export type CellConfig = {
  id: number;
  type: CellType;
  label: string;
  src?: string;
  html?: string;
  symbols?: string;
  muted?: boolean;
  loop?: boolean;
  autoplay?: boolean;
};

export const WALL_WIDTH = 1920;
export const WALL_HEIGHT = 1080;
export const STORAGE_KEY = "sixteen-wall-v1";

export const ACTIVE_CELL_IDS = [1, 2, 3, 4, 5, 6, 8, 13, 14, 15, 16] as const;
export type ActiveCellId = (typeof ACTIVE_CELL_IDS)[number];

const SAMPLE = {
  bunny: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  elephants: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  blazes: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  escapes: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  fun: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  joyrides: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  meltdowns: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  sintel: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  tears: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
} as const;

export const STARTER_HTML = `<div class="wrap">
  <p class="kicker">Custom frame</p>
  <h1>Your code lives here</h1>
  <p>Replace this markup with any HTML, CSS, or a small script. Clocks, tickers, notes, iframes — this cell is a sandbox.</p>
</div>
<style>
  .wrap { height:100%; display:flex; flex-direction:column; justify-content:flex-end; gap:12px; }
  .kicker { margin:0; font-size:11px; letter-spacing:0.22em; text-transform:uppercase; color:#a1a1aa; }
  h1 { margin:0; font-size:28px; font-weight:500; letter-spacing:-0.03em; }
  p { margin:0; max-width:36ch; font-size:14px; line-height:1.5; color:#a1a1aa; }
</style>`;

export const DEFAULT_RIGHT_HTML = `<div class="slate">
  <p class="kicker">Program</p>
  <h1>Evening block</h1>
  <ol>
    <li><span>19:00</span> Open + ident</li>
    <li><span>19:08</span> Feature A</li>
    <li><span>19:42</span> Hold / slate</li>
    <li><span>19:45</span> Feature B</li>
    <li><span>20:30</span> Close</li>
  </ol>
  <p class="foot">Edit this cell and paste any HTML you want in the side frame.</p>
</div>
<style>
  .slate { height:100%; display:flex; flex-direction:column; }
  .kicker { margin:0 0 8px; font-size:11px; letter-spacing:0.22em; text-transform:uppercase; color:#a1a1aa; }
  h1 { margin:0 0 28px; font-size:32px; font-weight:500; letter-spacing:-0.03em; }
  ol { list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:10px; flex:1; }
  li { display:flex; gap:16px; font-size:15px; color:#f4f4f5; border-top:1px solid #2a2a30; padding-top:10px; }
  li span { font-family: "IBM Plex Mono", ui-monospace, monospace; color:#a1a1aa; font-size:12px; min-width:4.5ch; }
  .foot { margin:24px 0 0; font-size:12px; line-height:1.5; color:#71717a; }
</style>`;

export const DEFAULT_CELLS: Record<ActiveCellId, CellConfig> = {
  1: { id: 1, type: "video", label: "CAM 01", src: SAMPLE.bunny, muted: true, loop: true, autoplay: true },
  2: { id: 2, type: "video", label: "CAM 02", src: SAMPLE.elephants, muted: true, loop: true, autoplay: true },
  3: { id: 3, type: "video", label: "CAM 03", src: SAMPLE.blazes, muted: true, loop: true, autoplay: true },
  4: { id: 4, type: "video", label: "CAM 04", src: SAMPLE.escapes, muted: true, loop: true, autoplay: true },
  5: { id: 5, type: "clock", label: "TIME", html: STARTER_HTML },
  6: { id: 6, type: "video", label: "PGM", src: SAMPLE.tears, muted: true, loop: true, autoplay: true },
  8: { id: 8, type: "html", label: "SLATE", html: DEFAULT_RIGHT_HTML },
  13: { id: 13, type: "video", label: "CAM 05", src: SAMPLE.fun, muted: true, loop: true, autoplay: true },
  14: { id: 14, type: "video", label: "CAM 06", src: SAMPLE.joyrides, muted: true, loop: true, autoplay: true },
  15: { id: 15, type: "video", label: "CAM 07", src: SAMPLE.meltdowns, muted: true, loop: true, autoplay: true },
  16: { id: 16, type: "video", label: "CAM 08", src: SAMPLE.sintel, muted: true, loop: true, autoplay: true },
};

export const TYPE_HELP: Record<CellType, string> = {
  video: "MP4, WebM, YouTube video or playlist, Vimeo, or a PeerTube video or playlist",
  iframe: "Any embed URL or iframe. YouTube and PeerTube playlist links are turned into players.",
  image: "Still image URL — fills the frame",
  html: "Raw HTML / CSS / JS, rendered in a sandbox",
  clock: "Live clock and date — no source needed",
  board: "Director board with source counts and stage lock",
  prices: "Stock and crypto tickers, comma separated. Example: AAPL, MSFT, BTC, ETH",
};

export function isActiveCellId(id: number): id is ActiveCellId {
  return (ACTIVE_CELL_IDS as readonly number[]).includes(id);
}

export function cloneDefaults(): Record<ActiveCellId, CellConfig> {
  return JSON.parse(JSON.stringify(DEFAULT_CELLS)) as Record<ActiveCellId, CellConfig>;
}
