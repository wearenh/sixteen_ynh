export type EmbedOptions = {
  muted?: boolean;
  loop?: boolean;
  autoplay?: boolean;
};

export type ParsedMedia =
  | { kind: "youtube"; id: string; list?: string }
  | { kind: "youtube-playlist"; id: string }
  | { kind: "vimeo"; id: string }
  | { kind: "peertube"; origin: string; id: string }
  | { kind: "peertube-playlist"; origin: string; id: string }
  | { kind: "iframe"; src: string }
  | { kind: "file"; src: string }
  | { kind: "unknown"; src: string };

const FILE = /\.(mp4|webm|ogg|ogv|mov|m4v)(\?.*)?$/i;
const YT_HOST = /^(?:www\.|m\.|music\.)?(?:youtube\.com|youtube-nocookie\.com|youtu\.be)$/i;

function flag(on: boolean | undefined, fallback = true) {
  return on === false ? "0" : fallback ? "1" : "0";
}

function asUrl(value: string): URL | null {
  try {
    return new URL(value);
  } catch {
    return null;
  }
}

function iframeSrcFromMarkup(value: string): string | null {
  const match = value.match(/<iframe\b[^>]*\ssrc=["']([^"']+)["']/i);
  return match?.[1]?.trim() || null;
}

function parseYoutube(url: URL): ParsedMedia | null {
  const host = url.hostname.replace(/^www\./, "");
  if (!YT_HOST.test(url.hostname) && host !== "youtu.be") return null;

  const list = url.searchParams.get("list")?.trim() || "";
  let videoId = url.searchParams.get("v")?.trim() || "";
  const parts = url.pathname.split("/").filter(Boolean);

  if (host === "youtu.be" || url.hostname === "youtu.be") {
    videoId = parts[0] ?? "";
  } else if (parts[0] === "embed" && parts[1] && parts[1] !== "videoseries") {
    videoId = parts[1];
  } else if (parts[0] === "shorts" || parts[0] === "live") {
    videoId = parts[1] ?? "";
  } else if (parts[0] === "playlist" || parts[1] === "videoseries") {
    videoId = "";
  }

  if (list && !videoId) return { kind: "youtube-playlist", id: list };
  if (videoId && list) return { kind: "youtube", id: videoId, list };
  if (videoId) return { kind: "youtube", id: videoId };
  if (list) return { kind: "youtube-playlist", id: list };
  return null;
}

function parsePeerTube(url: URL): ParsedMedia | null {
  if (YT_HOST.test(url.hostname) || /vimeo\.com$/i.test(url.hostname)) return null;
  const parts = url.pathname.split("/").filter(Boolean);
  const origin = url.origin;

  if (parts[0] === "w" && parts[1] === "p" && parts[2]) {
    return { kind: "peertube-playlist", origin, id: parts[2] };
  }
  if (parts[0] === "video-playlists" && parts[1] === "embed" && parts[2]) {
    return { kind: "peertube-playlist", origin, id: parts[2] };
  }
  if (parts[0] === "videos" && parts[1] === "watch" && parts[2] === "playlist" && parts[3]) {
    return { kind: "peertube-playlist", origin, id: parts[3] };
  }
  if (parts[0] === "w" && parts[1]) {
    return { kind: "peertube", origin, id: parts[1] };
  }
  if (parts[0] === "videos" && (parts[1] === "watch" || parts[1] === "embed") && parts[2]) {
    return { kind: "peertube", origin, id: parts[2] };
  }
  return null;
}

export function parseMedia(src: string): ParsedMedia {
  const raw = src.trim();
  if (!raw) return { kind: "unknown", src: raw };

  const fromIframe = iframeSrcFromMarkup(raw);
  const value = fromIframe ?? raw;
  const url = asUrl(value);

  if (url) {
    const youtube = parseYoutube(url);
    if (youtube) return youtube;

    const vimeo = value.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
    if (vimeo?.[1]) return { kind: "vimeo", id: vimeo[1] };

    const peer = parsePeerTube(url);
    if (peer) return peer;

    if (FILE.test(url.pathname) || value.startsWith("blob:") || value.startsWith("data:video")) {
      return { kind: "file", src: value };
    }

    if (url.protocol === "http:" || url.protocol === "https:") {
      return { kind: "iframe", src: value };
    }
  }

  if (FILE.test(value) || value.startsWith("blob:") || value.startsWith("data:video")) {
    return { kind: "file", src: value };
  }

  if (/^[A-Za-z0-9_-]{11}$/.test(value)) return { kind: "youtube", id: value };

  return { kind: "unknown", src: value };
}

export function youtubeEmbed(id: string, list: string | undefined, opts: EmbedOptions) {
  const q = new URLSearchParams({
    autoplay: flag(opts.autoplay),
    mute: flag(opts.muted),
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    iv_load_policy: "3",
  });
  if (opts.loop !== false) {
    q.set("loop", "1");
    q.set("playlist", list || id);
  }
  if (list) q.set("list", list);
  return `https://www.youtube-nocookie.com/embed/${id}?${q.toString()}`;
}

export function youtubePlaylistEmbed(id: string, opts: EmbedOptions) {
  const q = new URLSearchParams({
    list: id,
    autoplay: flag(opts.autoplay),
    mute: flag(opts.muted),
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
  });
  if (opts.loop !== false) q.set("loop", "1");
  return `https://www.youtube-nocookie.com/embed/videoseries?${q.toString()}`;
}

export function vimeoEmbed(id: string, opts: EmbedOptions) {
  const q = new URLSearchParams({
    autoplay: flag(opts.autoplay),
    muted: flag(opts.muted),
    loop: flag(opts.loop),
    background: "1",
    title: "0",
    byline: "0",
    portrait: "0",
  });
  return `https://player.vimeo.com/video/${id}?${q.toString()}`;
}

export function peertubeEmbed(origin: string, id: string, playlist: boolean, opts: EmbedOptions) {
  const q = new URLSearchParams({
    autoplay: flag(opts.autoplay),
    muted: flag(opts.muted),
    loop: flag(opts.loop),
    title: "0",
    warningTitle: "0",
    peertubeLink: "0",
    p2p: "0",
    controls: "0",
  });
  const path = playlist ? "video-playlists" : "videos";
  return `${origin}/${path}/embed/${encodeURIComponent(id)}?${q.toString()}`;
}

export function resolveEmbed(src: string, opts: EmbedOptions): string | null {
  const parsed = parseMedia(src);
  switch (parsed.kind) {
    case "youtube":
      return youtubeEmbed(parsed.id, parsed.list, opts);
    case "youtube-playlist":
      return youtubePlaylistEmbed(parsed.id, opts);
    case "vimeo":
      return vimeoEmbed(parsed.id, opts);
    case "peertube":
      return peertubeEmbed(parsed.origin, parsed.id, false, opts);
    case "peertube-playlist":
      return peertubeEmbed(parsed.origin, parsed.id, true, opts);
    case "iframe":
      return parsed.src;
    default:
      return null;
  }
}

export function isFileMedia(src: string) {
  const parsed = parseMedia(src);
  return parsed.kind === "file";
}
