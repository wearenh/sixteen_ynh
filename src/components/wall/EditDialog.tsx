import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  type CellConfig,
  type CellType,
  DEFAULT_CELLS,
  STARTER_HTML,
  TYPE_HELP,
} from "@/lib/wall-config";
import { cn, padCell } from "@/lib/utils";
import { useWallStore } from "@/lib/wall-store";

const TYPES: CellType[] = ["video", "iframe", "image", "html", "clock", "board", "prices"];

export function EditDialog({ container }: { container?: HTMLElement | null }) {
  const editingId = useWallStore((s) => s.editingId);
  const cells = useWallStore((s) => s.cells);
  const closeEditor = useWallStore((s) => s.closeEditor);
  const updateCell = useWallStore((s) => s.updateCell);

  const live = editingId ? cells[editingId] : null;
  const [draft, setDraft] = useState<CellConfig | null>(null);

  useEffect(() => {
    setDraft(live ? { ...live } : null);
  }, [live]);

  const open = Boolean(editingId && draft);

  function save() {
    if (!editingId || !draft) return;
    updateCell(editingId, draft);
    closeEditor();
  }

  function revert() {
    if (!editingId) return;
    const original = DEFAULT_CELLS[editingId];
    setDraft({ ...original });
  }

  return (
    <Dialog open={open} onOpenChange={(next) => !next && closeEditor()}>
      <DialogContent
        container={container}
        className={cn((draft?.type === "html" || draft?.type === "iframe") && "max-w-2xl")}
      >
        {draft ? (
          <>
            <DialogHeader>
              <DialogTitle>
                Cell {padCell(draft.id)}
                <span className="ml-2 font-sans text-sm font-normal text-muted"> {draft.label}</span>
              </DialogTitle>
              <DialogDescription>
                Each frame is independent. Paste a video URL or drop HTML into a side cell.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-4">
              <fieldset className="flex flex-col gap-2">
                <Label>Type</Label>
                <div className="grid grid-cols-4 gap-1">
                  {TYPES.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() =>
                        setDraft((d) =>
                          d
                            ? {
                                ...d,
                                type,
                                html: d.html || STARTER_HTML,
                              }
                            : d,
                        )
                      }
                      className={cn(
                        "h-10 rounded-sm text-xs tracking-wide uppercase transition-colors duration-150",
                        draft.type === type
                          ? "bg-accent text-accent-fg"
                          : "bg-surface-2 text-muted hover:text-fg",
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                <p className="text-xs leading-normal text-subtle">{TYPE_HELP[draft.type]}</p>
              </fieldset>

              <div className="flex flex-col gap-2">
                <Label htmlFor="cell-label">Label</Label>
                <Input
                  id="cell-label"
                  value={draft.label}
                  onChange={(e) => setDraft({ ...draft, label: e.target.value })}
                  maxLength={24}
                />
              </div>

              {draft.type === "video" || draft.type === "image" || draft.type === "iframe" ? (
                <div className="flex flex-col gap-2">
                  <Label htmlFor="cell-src">{draft.type === "iframe" ? "Embed URL" : "Source"}</Label>
                  <Input
                    id="cell-src"
                    value={draft.src ?? ""}
                    onChange={(e) => setDraft({ ...draft, src: e.target.value })}
                    placeholder={
                      draft.type === "image"
                        ? "https://…jpg"
                        : draft.type === "iframe"
                          ? "https://…/embed/…  or a playlist URL"
                          : "mp4, YouTube, playlist, or PeerTube"
                    }
                  />
                </div>
              ) : null}

              {draft.type === "prices" ? (
                <div className="flex flex-col gap-2">
                  <Label htmlFor="cell-symbols">Tickers</Label>
                  <Input
                    id="cell-symbols"
                    value={draft.symbols ?? ""}
                    onChange={(e) => setDraft({ ...draft, symbols: e.target.value })}
                    placeholder="AAPL, MSFT, BTC, ETH"
                  />
                </div>
              ) : null}

              {draft.type === "html" ? (
                <div className="flex flex-col gap-2">
                  <Label htmlFor="cell-html">HTML</Label>
                  <Textarea
                    id="cell-html"
                    value={draft.html ?? ""}
                    onChange={(e) => setDraft({ ...draft, html: e.target.value })}
                    rows={12}
                    spellCheck={false}
                  />
                </div>
              ) : null}

              {draft.type === "video" || draft.type === "iframe" ? (
                <div className="flex flex-wrap gap-6">
                  <Toggle
                    id="muted"
                    label="Muted"
                    checked={draft.muted !== false}
                    onCheckedChange={(muted) => setDraft({ ...draft, muted })}
                  />
                  <Toggle
                    id="loop"
                    label="Loop"
                    checked={draft.loop !== false}
                    onCheckedChange={(loop) => setDraft({ ...draft, loop })}
                  />
                  <Toggle
                    id="autoplay"
                    label="Autoplay"
                    checked={draft.autoplay !== false}
                    onCheckedChange={(autoplay) => setDraft({ ...draft, autoplay })}
                  />
                </div>
              ) : null}
            </div>

            <DialogFooter>
              <Button type="button" variant="ghost" onClick={revert}>
                Revert cell
              </Button>
              <Button type="button" variant="secondary" onClick={closeEditor}>
                Cancel
              </Button>
              <Button type="button" onClick={save}>
                Save frame
              </Button>
            </DialogFooter>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function Toggle({
  id,
  label,
  checked,
  onCheckedChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
      <Label htmlFor={id} className="text-sm text-fg">
        {label}
      </Label>
    </div>
  );
}
