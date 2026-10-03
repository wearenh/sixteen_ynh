import { resolveEmbed } from "@/lib/media";
import {
  ACTIVE_CELL_IDS,
  type ActiveCellId,
  type CellConfig,
} from "@/lib/wall-config";
import { WALL_FILE_VERSION } from "@/lib/wall-store";

const VIEWER = String.raw`
(function () {
  var data = JSON.parse(document.getElementById("sixteen-wall").textContent);
  var cells = data.cells || {};
  var embeds = data.embeds || {};
  var stage = document.getElementById("stage");
  var table = document.createElement("table");
  var group = document.createElement("colgroup");
  for (var c = 0; c < 4; c++) group.appendChild(document.createElement("col"));
  table.appendChild(group);
  var body = document.createElement("tbody");
  body.appendChild(row("top", [1, 2, 3, 4]));
  body.appendChild(row("mid", [5, 6, 8]));
  body.appendChild(row("bot", [13, 14, 15, 16]));
  table.appendChild(body);
  stage.appendChild(table);

  function row(cls, ids) {
    var tr = document.createElement("tr");
    tr.className = cls;
    ids.forEach(function (id) {
      var td = document.createElement("td");
      if (id === 6) td.colSpan = 2;
      td.appendChild(render(cells[id] || { id: id, type: "board", label: "" }));
      tr.appendChild(td);
    });
    return tr;
  }

  function render(cell) {
    var root = document.createElement("div");
    root.className = "frame";
    if (cell.type === "clock") root.appendChild(clock());
    else if (cell.type === "board") root.appendChild(board());
    else if (cell.type === "html") root.appendChild(htmlFrame(cell));
    else if (cell.type === "image") root.appendChild(image(cell));
    else root.appendChild(media(cell));
    root.appendChild(chrome(cell));
    return root;
  }

  function media(cell) {
    var src = (cell.src || "").trim();
    var embed = embeds[String(cell.id)] || "";
    if (!src && !embed) return note("No source");
    var file = /\.(mp4|webm|ogg|ogv|mov|m4v)(\?|#|$)/i.test(src) || src.indexOf("blob:") === 0 || src.indexOf("data:video") === 0;
    if (cell.type === "video" && !embed && (file || src.indexOf("http") !== 0)) {
      var video = document.createElement("video");
      video.className = "fill";
      video.src = src;
      video.muted = cell.muted !== false;
      video.defaultMuted = cell.muted !== false;
      video.loop = cell.loop !== false;
      video.autoplay = cell.autoplay !== false;
      video.playsInline = true;
      video.setAttribute("playsinline", "");
      video.preload = "auto";
      return video;
    }
    var frame = document.createElement("iframe");
    frame.className = "fill";
    frame.src = embed || src;
    frame.title = cell.label || "Embed";
    frame.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
    frame.allowFullscreen = true;
    frame.referrerPolicy = "strict-origin-when-cross-origin";
    return frame;
  }

  function image(cell) {
    if (!(cell.src || "").trim()) return note("No image");
    var img = document.createElement("img");
    img.className = "fill";
    img.alt = cell.label || "";
    img.src = cell.src;
    return img;
  }

  function htmlFrame(cell) {
    var frame = document.createElement("iframe");
    frame.className = "fill";
    frame.title = cell.label || "HTML";
    frame.sandbox = "allow-scripts allow-popups allow-popups-to-escape-sandbox";
    frame.srcdoc = wrap(cell.html || "");
    return frame;
  }

  function wrap(html) {
    var trimmed = String(html).trim();
    if (/<!doctype/i.test(trimmed) || /<html[\s>]/i.test(trimmed)) return trimmed;
    return "<!DOCTYPE html><html><head><meta charset=\"utf-8\"><style>html,body{margin:0;height:100%;background:#121214;color:#f4f4f5;font-family:system-ui,sans-serif}body{padding:40px 24px 24px;box-sizing:border-box}*{box-sizing:border-box}</style></head><body>" + trimmed + "</body></html>";
  }

  function clock() {
    var box = document.createElement("div");
    box.className = "panel";
    box.innerHTML = "<p class=\"kicker\">Local time</p><p class=\"time\">--:--:--</p><p class=\"date\">&nbsp;</p><div class=\"foot\"><span>Stage lock</span><span>1920 × 1080</span></div>";
    function tick() {
      var now = new Date();
      box.querySelector(".time").textContent = now.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
      box.querySelector(".date").textContent = now.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    }
    tick();
    setInterval(tick, 1000);
    return box;
  }

  function board() {
    var box = document.createElement("div");
    box.className = "panel";
    box.innerHTML = "<div><p class=\"kicker\">Director</p><h2>Sixteen</h2><p class=\"blurb\">4×4 grid. Eight cameras, one program, two custom frames.</p></div><dl class=\"stats\"><div><dt>Canvas</dt><dd>1920×1080</dd></div><div><dt>Cells</dt><dd>16</dd></div><div><dt>Sources</dt><dd>9</dd></div><div><dt>Sides</dt><dd>2</dd></div></dl>";
    return box;
  }

  function chrome(cell) {
    var bar = document.createElement("div");
    bar.className = "bar";
    var id = String(cell.id || "").padStart(2, "0");
    var live = cell.type === "video" || cell.type === "iframe" ? "<span class=\"live\">Live</span>" : "";
    bar.innerHTML = "<span>" + id + live + "</span><span class=\"name\"></span>";
    bar.querySelector(".name").textContent = cell.label || "";
    return bar;
  }

  function note(text) {
    var p = document.createElement("p");
    p.className = "note";
    p.textContent = text;
    return p;
  }

  function fit() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    var width = w;
    var height = (w * 1080) / 1920;
    if (height > h) {
      height = h;
      width = (h * 1920) / 1080;
    }
    if (w - width < 2) width = w;
    if (h - height < 2) height = h;
    stage.style.width = Math.max(0, width) + "px";
    stage.style.height = Math.max(0, height) + "px";
  }

  function toggle() {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen().catch(function () {});
  }

  document.getElementById("fs").addEventListener("click", toggle);
  document.addEventListener("keydown", function (event) {
    if (event.key === "f" || event.key === "F") {
      event.preventDefault();
      toggle();
    }
  });
  window.addEventListener("resize", fit);
  document.addEventListener("fullscreenchange", fit);
  fit();
})();
`;

export function renderWallHtml(cells: Record<ActiveCellId, CellConfig>) {
  const embeds: Record<string, string | null> = {};
  for (const id of ACTIVE_CELL_IDS) {
    const cell = cells[id];
    const src = cell?.src?.trim();
    if (!cell || (cell.type !== "video" && cell.type !== "iframe") || !src) continue;
    embeds[String(id)] = resolveEmbed(src, {
      muted: cell.muted,
      loop: cell.loop,
      autoplay: cell.autoplay,
    });
  }

  const payload = JSON.stringify({
    version: WALL_FILE_VERSION,
    name: "sixteen",
    cells,
    embeds,
  })
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Sixteen</title>
<style>
  html, body { margin: 0; height: 100%; background: #09090b; color: #f4f4f5; font-family: system-ui, sans-serif; }
  #fit { height: 100%; display: flex; align-items: center; justify-content: center; overflow: hidden; }
  #stage { background: #09090b; }
  table { width: 100%; height: 100%; border-collapse: collapse; table-layout: fixed; }
  tbody { height: 100%; }
  col { width: 25%; }
  tr.top, tr.bot { height: 25%; }
  tr.mid { height: 50%; }
  td { position: relative; padding: 0; overflow: hidden; }
  .frame { position: absolute; inset: 2px; overflow: hidden; border-radius: 4px; background: #121214; box-shadow: inset 0 0 0 1px rgba(244,244,245,.1); container-type: size; }
  .fill { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; object-fit: cover; background: #121214; }
  .bar { position: absolute; z-index: 2; inset: 0 0 auto 0; height: 40px; display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 0 10px; background: linear-gradient(to bottom, rgba(9,9,11,.78), transparent); font-family: ui-monospace, monospace; font-size: 12px; letter-spacing: .12em; text-transform: uppercase; pointer-events: none; }
  .bar .name { color: #a1a1aa; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .live { margin-left: 8px; color: #6fbf73; }
  .live:before { content: ""; display: inline-block; width: 6px; height: 6px; margin-right: 6px; border-radius: 99px; background: #6fbf73; }
  .note { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; margin: 0; color: #a1a1aa; font-size: 14px; }
  .panel { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: space-between; padding: 12% 8% 7%; box-sizing: border-box; }
  .kicker { margin: 0; color: #a1a1aa; font-size: 11px; letter-spacing: .18em; text-transform: uppercase; }
  .time { margin: 4% 0 0; font-size: 18cqmin; line-height: 1; font-weight: 500; letter-spacing: -0.03em; font-variant-numeric: tabular-nums; }
  .date { margin: 2% 0 0; color: #a1a1aa; font-size: 3.2cqmin; }
  h2 { margin: 2% 0 0; font-size: 8cqmin; font-weight: 500; letter-spacing: -0.03em; }
  .blurb { margin: 2% 0 0; max-width: 28ch; color: #a1a1aa; font-size: 3.4cqmin; line-height: 1.45; }
  .foot, .stats { border-top: 1px solid #2a2a30; }
  .foot { display: flex; justify-content: space-between; padding-top: 4%; color: #71717a; font-family: ui-monospace, monospace; font-size: 2.8cqmin; letter-spacing: .08em; text-transform: uppercase; }
  .stats { display: grid; grid-template-columns: 1fr 1fr; gap: 3% 6%; margin: 0; padding-top: 4%; }
  .stats dt { color: #71717a; font-size: 2.6cqmin; letter-spacing: .08em; text-transform: uppercase; }
  .stats dd { margin: 2% 0 0; font-family: ui-monospace, monospace; font-size: 3.4cqmin; }
  #fs { position: fixed; top: 12px; right: 12px; z-index: 5; border: 0; border-radius: 6px; padding: 10px 12px; background: rgba(18,18,20,.8); color: #f4f4f5; font: 500 12px/1 system-ui, sans-serif; letter-spacing: .14em; text-transform: uppercase; box-shadow: inset 0 0 0 1px rgba(244,244,245,.14); cursor: pointer; }
  #fs:hover, #fs:focus-visible { background: #f4f4f5; color: #09090b; outline: none; }
  html:fullscreen #fs { opacity: 0; }
  html:fullscreen #fs:focus { opacity: 1; }
</style>
</head>
<body>
<div id="fit"><div id="stage"></div></div>
<button id="fs" type="button">Fullscreen</button>
<script type="application/json" id="sixteen-wall">${payload}</script>
<script>${VIEWER}</script>
</body>
</html>
`;
}
