import { useRef, useState } from "react";
import { useLoaderData, useNavigate } from "@tanstack/react-router";
import { Download, Fullscreen, HelpCircle, Link2, Palette, Pencil, RotateCcw, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { parseWallFile, useWallStore } from "@/lib/wall-store";
import { renderWallHtml } from "@/lib/wall-html";
import { publishWall } from "@/lib/wall-api";

type ToolbarProps = {
  onFullscreen: () => void;
  hidden?: boolean;
};

export function Toolbar({ onFullscreen, hidden }: ToolbarProps) {
  const editMode = useWallStore((s) => s.editMode);
  const setEditMode = useWallStore((s) => s.setEditMode);
  const setHelpOpen = useWallStore((s) => s.setHelpOpen);
  const reset = useWallStore((s) => s.reset);
  const cells = useWallStore((s) => s.cells);
  const replaceCells = useWallStore((s) => s.replaceCells);
  const remoteHash = useWallStore((s) => s.remoteHash);
  const editToken = useWallStore((s) => s.editToken);
  const publicUrl = useWallStore((s) => s.publicUrl);
  const attachRemote = useWallStore((s) => s.attachRemote);
  const fileRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const brand = useLoaderData({ from: "__root__" });
  const [saving, setSaving] = useState(false);
  const canEdit = !remoteHash || Boolean(editToken);

  function exportWall() {
    const blob = new Blob([renderWallHtml(cells)], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "sixteen-wall.html";
    link.click();
    URL.revokeObjectURL(url);
  }

  function importWall(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        replaceCells(parseWallFile(String(reader.result ?? "")));
      } catch (error) {
        window.alert(error instanceof Error ? error.message : "Could not import that file.");
      }
    };
    reader.readAsText(file);
  }

  async function saveLink() {
    if (!canEdit) {
      window.alert("Only the creator of this wall can change it.");
      return;
    }
    setSaving(true);
    try {
      const saved = await publishWall({
        data: { cells, hash: remoteHash ?? undefined, editToken: editToken ?? undefined },
      });
      localStorage.setItem(`sixteen-edit:${saved.hash}`, saved.editToken);
      attachRemote(saved.hash, cells, saved.editToken, saved.url);
      if (saved.created) {
        window.alert(`Saved.\n\n${saved.url}\n\nEdit key, keep this. Anyone with it can change the wall:\n${saved.editToken}`);
      }
      if (window.location.pathname !== saved.path) {
        void navigate({ to: "/tv/$hash", params: { hash: saved.hash } });
      }
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "Could not save this wall.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <header
      className={
        hidden
          ? "hidden"
          : "z-30 flex shrink-0 items-center justify-between gap-3 border-b border-border bg-bg px-3 py-2"
      }
    >
      <div className="flex items-baseline gap-3">
        <p className="text-sm font-medium tracking-widest text-fg uppercase">Sixteen</p>
        <p className="hidden max-w-xs truncate font-mono text-xs tracking-wide text-subtle sm:block">
          {publicUrl ? publicUrl.replace(/^https?:\/\/[^/]+/, "") : "1920 × 1080"}
        </p>
      </div>
      <div className="flex items-center gap-1">
        <Button
          type="button"
          size="icon-sm"
          variant={editMode ? "default" : "ghost"}
          onClick={() => canEdit && setEditMode(!editMode)}
          aria-pressed={editMode}
          aria-label={editMode ? "Exit edit mode" : "Enter edit mode"}
          title={canEdit ? "Edit frames (E)" : "Only the creator can edit this wall"}
          disabled={!canEdit}
        >
          <Pencil />
        </Button>
        {canEdit ? (
          <Button
            type="button"
            size="icon-sm"
            variant="ghost"
            onClick={() => void saveLink()}
            disabled={saving}
            aria-label="Save a public link"
            title="Save a public link"
          >
            <Link2 />
          </Button>
        ) : null}
        {brand.yunohost ? null : (
          <Button
            type="button"
            size="icon-sm"
            variant="ghost"
            onClick={() => void navigate({ to: "/admin" })}
            aria-label="Site style"
            title="Site style"
          >
            <Palette />
          </Button>
        )}
        <Button
          type="button"
          size="icon-sm"
          variant="ghost"
          onClick={onFullscreen}
          aria-label="Fullscreen"
          title="Fullscreen (F)"
        >
          <Fullscreen />
        </Button>
        <Button
          type="button"
          size="icon-sm"
          variant="ghost"
          onClick={exportWall}
          aria-label="Download HTML"
          title="Download HTML"
        >
          <Download />
        </Button>
        <Button
          type="button"
          size="icon-sm"
          variant="ghost"
          onClick={() => fileRef.current?.click()}
          aria-label="Import wall"
          title="Import wall"
        >
          <Upload />
        </Button>
        <input
          ref={fileRef}
          type="file"
          accept=".html,.json,text/html,application/json"
          className="sr-only"
          onChange={(event) => {
            const file = event.target.files?.[0];
            event.target.value = "";
            if (file) importWall(file);
          }}
        />
        <Button
          type="button"
          size="icon-sm"
          variant="ghost"
          onClick={() => {
            if (window.confirm("Reset every frame to the default wall?")) reset();
          }}
          aria-label="Reset wall"
          title="Reset wall"
        >
          <RotateCcw />
        </Button>
        <Button
          type="button"
          size="icon-sm"
          variant="ghost"
          onClick={() => setHelpOpen(true)}
          aria-label="Help"
          title="Help"
        >
          <HelpCircle />
        </Button>
      </div>
    </header>
  );
}

export function HelpDialog({ container }: { container?: HTMLElement | null }) {
  const helpOpen = useWallStore((s) => s.helpOpen);
  const setHelpOpen = useWallStore((s) => s.setHelpOpen);

  return (
    <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
      <DialogContent container={container}>
        <DialogHeader>
          <DialogTitle>Sixteen</DialogTitle>
          <DialogDescription>
            A 16-cell wall locked to 1920×1080 fullscreen. Four cameras on top, four on the
            bottom, a program window the size of four cells in the center, and two custom frames
            on the sides.
          </DialogDescription>
        </DialogHeader>
        <ul className="flex flex-col gap-3 text-sm leading-normal text-muted">
          <li>
            <span className="font-medium text-fg">E</span> — toggle edit mode, then click any
            frame to change its source, label, or HTML.
          </li>
          <li>
            <span className="font-medium text-fg">F</span> — fullscreen. The wall fills the
            screen and the bar hides. Press F again or Escape to leave.
          </li>
          <li>
            <span className="font-medium text-fg">Save link</span> — stores this wall and opens{" "}
            <span className="font-mono text-fg">/tv/…</span>. Keep the edit key. Without
            it, the page is view only.
          </li>
          <li>
            Video cells take an MP4, a YouTube video or playlist, Vimeo, or a PeerTube video or
            playlist. Iframe cells take any embed URL. Prices cells take tickers such as{" "}
            <span className="font-mono text-fg">AAPL, BTC, ETH</span>.
          </li>
          <li>
            Site style — title, feature image, favicon, HTML, and CSS — is the YunoHost
            application config panel: webadmin, Applications, Sixteen, Site style. It is not a
            page in this app. Shared links use that title and image on X, Telegram, Signal, and
            Nextcloud Collectives.
          </li>
          <li>
            Download saves an HTML file that opens the wall in any browser. Upload reads that file
            back. Reset restores the sample wall.
          </li>
        </ul>
      </DialogContent>
    </Dialog>
  );
}

export function EditBanner() {
  const editMode = useWallStore((s) => s.editMode);
  if (!editMode) return null;
  return (
    <p className="pointer-events-none absolute inset-x-0 bottom-3 z-30 text-center font-mono text-xs tracking-widest text-muted uppercase">
      Edit mode — click a frame
    </p>
  );
}
