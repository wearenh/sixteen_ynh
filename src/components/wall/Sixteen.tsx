import { useEffect, useRef, useState } from "react";
import { EditDialog } from "@/components/wall/EditDialog";
import { EditBanner, HelpDialog, Toolbar } from "@/components/wall/chrome";
import { WallStack } from "@/components/wall/WallStack";
import { WallTable } from "@/components/wall/WallTable";
import { WALL_HEIGHT, WALL_WIDTH, type ActiveCellId } from "@/lib/wall-config";
import { useWallStore } from "@/lib/wall-store";

const STACK_BREAKPOINT = 900;

function fitStage(w: number, h: number) {
  let width = w;
  let height = (w * WALL_HEIGHT) / WALL_WIDTH;
  if (height > h) {
    height = h;
    width = (h * WALL_WIDTH) / WALL_HEIGHT;
  }
  if (w - width < 2) width = w;
  if (h - height < 2) height = h;
  return { width: Math.max(0, width), height: Math.max(0, height) };
}

export function Sixteen() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ width: WALL_WIDTH, height: WALL_HEIGHT });
  const [stacked, setStacked] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [portal, setPortal] = useState<HTMLElement | null>(null);

  const cells = useWallStore((s) => s.cells);
  const editMode = useWallStore((s) => s.editMode);
  const setEditMode = useWallStore((s) => s.setEditMode);
  const openEditor = useWallStore((s) => s.openEditor);
  const closeEditor = useWallStore((s) => s.closeEditor);
  const hydrate = useWallStore((s) => s.hydrate);
  const setHelpOpen = useWallStore((s) => s.setHelpOpen);

  useEffect(() => {
    hydrate();
    setPortal(wrapRef.current);
  }, [hydrate]);

  useEffect(() => {
    const onChange = () => {
      setFullscreen(document.fullscreenElement === wrapRef.current);
    };
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;

    const fit = () => {
      const w = view.clientWidth;
      const h = view.clientHeight;
      const fs = document.fullscreenElement === wrapRef.current;
      setStacked(!fs && w < STACK_BREAKPOINT);
      if ((fs || w >= STACK_BREAKPOINT) && w > 0 && h > 0) {
        setBox(fitStage(w, h));
      }
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(view);
    window.addEventListener("resize", fit);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, [fullscreen]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const typing =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable);
      if (typing) return;

      if (event.key === "e" || event.key === "E") {
        event.preventDefault();
        setEditMode(!useWallStore.getState().editMode);
      } else if (event.key === "f" || event.key === "F") {
        event.preventDefault();
        toggleFullscreen();
      } else if (event.key === "?" || event.key === "h" || event.key === "H") {
        event.preventDefault();
        setHelpOpen(true);
      } else if (event.key === "Escape" && !document.fullscreenElement) {
        if (useWallStore.getState().editingId) closeEditor();
        else setEditMode(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeEditor, setEditMode, setHelpOpen]);

  function toggleFullscreen() {
    const node = wrapRef.current;
    if (!node) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
      return;
    }
    void node.requestFullscreen().catch(() => {
      /* fullscreen may be blocked in embedded preview */
    });
  }

  function onEdit(id: ActiveCellId) {
    openEditor(id);
  }

  return (
    <div
      ref={wrapRef}
      className="sixteen-root flex h-dvh w-dvw flex-col overflow-hidden bg-bg text-fg"
    >
      <Toolbar onFullscreen={toggleFullscreen} hidden={fullscreen} />

      <div ref={viewRef} className="relative min-h-0 flex-1">
        {stacked ? (
          <div className="h-full overflow-y-auto overflow-x-hidden">
            <WallStack cells={cells} editMode={editMode} onEdit={onEdit} />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center overflow-hidden">
            <div className="bg-bg" style={{ width: box.width, height: box.height }}>
              <WallTable cells={cells} editMode={editMode} onEdit={onEdit} />
            </div>
          </div>
        )}
        <EditBanner />
      </div>

      <EditDialog container={portal} />
      <HelpDialog container={portal} />
    </div>
  );
}
