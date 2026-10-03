import { useEffect, useMemo, useState } from "react";
import { Pencil, Play } from "lucide-react";
import type { CellConfig } from "@/lib/wall-config";
import { wrapHtmlDocument } from "@/lib/html-frame";
import { parseMedia, resolveEmbed } from "@/lib/media";
import { cn, padCell } from "@/lib/utils";

type FrameProps = {
  cell: CellConfig;
  editMode: boolean;
  onEdit: () => void;
  autoPlay?: boolean;
  featured?: boolean;
};

export function Frame({ cell, editMode, onEdit, autoPlay, featured }: FrameProps) {
  return (
    <div className="frame-inner">
      <FrameBody cell={cell} autoPlay={autoPlay ?? cell.autoplay !== false} featured={featured} />
      <FrameChrome cell={cell} featured={featured} />
      {editMode ? (
        <button
          type="button"
          onClick={onEdit}
          className="absolute inset-0 z-20 flex items-end justify-end p-2"
          aria-label={`Edit cell ${padCell(cell.id)} ${cell.label}`}
        >
          <span className="inline-flex items-center gap-1.5 rounded-sm bg-surface px-2 py-1 text-xs text-fg shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-fg)_14%,transparent)]">
            <Pencil className="size-3.5" />
            {padCell(cell.id)}
          </span>
        </button>
      ) : null}
    </div>
  );
}

function FrameBody({
  cell,
  autoPlay,
  featured,
}: {
  cell: CellConfig;
  autoPlay: boolean;
  featured?: boolean;
}) {
  switch (cell.type) {
    case "video":
      return <VideoBody cell={cell} autoPlay={autoPlay} featured={featured} />;
    case "iframe":
      return <EmbedBody cell={cell} />;
    case "image":
      return <ImageBody cell={cell} />;
    case "html":
      return <HtmlBody cell={cell} />;
    case "clock":
      return <ClockBody />;
    case "board":
      return <BoardBody />;
    default:
      return <EmptyBody label="Unknown type" />;
  }
}

function VideoBody({
  cell,
  autoPlay,
  featured,
}: {
  cell: CellConfig;
  autoPlay: boolean;
  featured?: boolean;
}) {
  const parsed = useMemo(() => parseMedia(cell.src ?? ""), [cell.src]);
  const embed = useMemo(
    () =>
      resolveEmbed(cell.src ?? "", {
        muted: cell.muted,
        loop: cell.loop,
        autoplay: cell.autoplay,
      }),
    [cell.src, cell.muted, cell.loop, cell.autoplay],
  );
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(autoPlay);

  useEffect(() => {
    setReady(false);
    setPlaying(autoPlay);
  }, [cell.src, autoPlay]);

  if (!cell.src?.trim()) {
    return <EmptyBody label="No video source" />;
  }

  if (embed) {
    return <PlayerFrame title={cell.label} src={embed} />;
  }

  if (parsed.kind !== "file") {
    return <EmptyBody label="Unrecognized video link" />;
  }

  if (!playing) {
    return (
      <button
        type="button"
        onClick={() => setPlaying(true)}
        className="absolute inset-0 flex items-center justify-center bg-surface"
        aria-label={`Play ${cell.label}`}
      >
        <span className="inline-flex size-12 items-center justify-center rounded-full bg-accent text-accent-fg">
          <Play className="size-5 translate-x-px" />
        </span>
      </button>
    );
  }

  return (
    <>
      <IdleLabel cell={cell} />
      <video
        key={parsed.src}
        src={parsed.src}
        muted={cell.muted !== false}
        loop={cell.loop !== false}
        autoPlay
        playsInline
        preload={featured ? "auto" : "metadata"}
        onCanPlay={() => setReady(true)}
        className={cn("transition-opacity duration-300", ready ? "opacity-100" : "opacity-0")}
      />
    </>
  );
}

function EmbedBody({ cell }: { cell: CellConfig }) {
  const src = useMemo(
    () =>
      resolveEmbed(cell.src ?? "", {
        muted: cell.muted !== false,
        loop: cell.loop !== false,
        autoplay: cell.autoplay !== false,
      }) ?? cell.src?.trim() ?? "",
    [cell.src, cell.muted, cell.loop, cell.autoplay],
  );
  if (!src) return <EmptyBody label="No embed URL" />;
  return <PlayerFrame title={cell.label} src={src} />;
}

function PlayerFrame({ title, src }: { title: string; src: string }) {
  const [ready, setReady] = useState(false);
  return (
    <>
      <div className="absolute inset-0 flex items-center justify-center bg-surface">
        <p className="font-mono text-xs tracking-widest text-subtle uppercase">{title}</p>
      </div>
      <iframe
        key={src}
        src={src}
        title={title}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        className={cn("transition-opacity duration-300", ready ? "opacity-100" : "opacity-0")}
        onLoad={() => setReady(true)}
      />
    </>
  );
}

function ImageBody({ cell }: { cell: CellConfig }) {
  const [failed, setFailed] = useState(false);
  if (!cell.src?.trim() || failed) {
    return <EmptyBody label={failed ? "Image failed to load" : "No image source"} />;
  }
  return (
    <img
      src={cell.src}
      alt={cell.label}
      className="outline outline-1 -outline-offset-1 outline-fg/10"
      onError={() => setFailed(true)}
    />
  );
}

function HtmlBody({ cell }: { cell: CellConfig }) {
  const srcDoc = wrapHtmlDocument(cell.html ?? "");
  return (
    <iframe
      title={cell.label}
      srcDoc={srcDoc}
      sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"
      className="bg-surface"
    />
  );
}

function ClockBody() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const time = now
    ? new Intl.DateTimeFormat(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now)
    : "--:--:--";

  const date = now
    ? new Intl.DateTimeFormat(undefined, {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(now)
    : "\u00a0";

  return (
    <div className="absolute inset-0 flex flex-col justify-between bg-surface px-6 pt-12 pb-6">
      <div>
        <p className="text-xs tracking-widest text-muted uppercase">Local time</p>
        <p className="mt-4 font-sans text-6xl leading-none font-medium tracking-tight text-fg tabular-nums">
          {time}
        </p>
        <p className="mt-3 text-sm text-muted">{date}</p>
      </div>
      <div className="flex items-center justify-between border-t border-border pt-4">
        <p className="font-mono text-xs tracking-wide text-subtle uppercase">Stage lock</p>
        <p className="font-mono text-xs text-muted tabular-nums">1920 × 1080</p>
      </div>
    </div>
  );
}

function BoardBody() {
  return (
    <div className="absolute inset-0 flex flex-col justify-between bg-surface px-6 pt-12 pb-6">
      <div>
        <p className="text-xs tracking-widest text-muted uppercase">Director</p>
        <h2 className="mt-3 text-3xl leading-tight font-medium tracking-tight">Sixteen</h2>
        <p className="mt-2 max-w-xs text-sm leading-normal text-muted">
          4×4 grid. Eight cameras, one program, two custom frames.
        </p>
      </div>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-border pt-4">
        <Stat label="Canvas" value="1920×1080" />
        <Stat label="Cells" value="16" />
        <Stat label="Sources" value="9" />
        <Stat label="Sides" value="2" />
      </dl>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs tracking-wide text-subtle uppercase">{label}</dt>
      <dd className="mt-1 font-mono text-sm text-fg tabular-nums">{value}</dd>
    </div>
  );
}

function IdleLabel({ cell }: { cell: CellConfig }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-surface">
      <p className="font-mono text-xs tracking-widest text-subtle uppercase">{cell.label}</p>
    </div>
  );
}

function EmptyBody({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-surface px-4 text-center">
      <p className="text-sm text-muted">{label}</p>
    </div>
  );
}

function FrameChrome({ cell, featured }: { cell: CellConfig; featured?: boolean }) {
  const isVideo = cell.type === "video" || cell.type === "iframe";
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex h-10 items-center justify-between frame-chrome px-2.5">
      <span className="flex items-center gap-2">
        <span className="font-mono text-xs tracking-widest text-fg tabular-nums">
          {padCell(cell.id)}
        </span>
        {isVideo ? (
          <span className="inline-flex items-center gap-1 text-xs tracking-widest text-live uppercase">
            <span className="size-1.5 rounded-full bg-live" />
            Live
          </span>
        ) : null}
      </span>
      <span className={cn("truncate text-xs tracking-wide text-muted uppercase", featured && "text-fg")}>
        {cell.label}
      </span>
    </div>
  );
}
