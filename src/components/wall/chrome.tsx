import { useRef } from "react";
import { Download, Fullscreen, HelpCircle, Pencil, RotateCcw, Upload } from "lucide-react";
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
  const fileRef = useRef<HTMLInputElement>(null);

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
        <p className="hidden font-mono text-xs tracking-wide text-subtle uppercase sm:block">
          1920 × 1080
        </p>
      </div>
      <div className="flex items-center gap-1">
        <Button
          type="button"
          size="icon-sm"
          variant={editMode ? "default" : "ghost"}
          onClick={() => setEditMode(!editMode)}
          aria-pressed={editMode}
          aria-label={editMode ? "Exit edit mode" : "Enter edit mode"}
          title="Edit frames (E)"
        >
          <Pencil />
        </Button>
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
            Video cells take an MP4, a YouTube video or playlist, Vimeo, or a PeerTube video or
            playlist. Iframe cells take any embed URL.
          </li>
          <li>
            Edits stay in this browser. Download saves an HTML file that opens the wall in any
            browser. Upload reads that file back. Reset restores the sample wall.
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
