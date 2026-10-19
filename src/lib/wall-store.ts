import { create } from "zustand";
import {
  type ActiveCellId,
  type CellConfig,
  cloneDefaults,
  isActiveCellId,
  STORAGE_KEY,
} from "@/lib/wall-config";

type WallState = {
  cells: Record<ActiveCellId, CellConfig>;
  editMode: boolean;
  editingId: ActiveCellId | null;
  helpOpen: boolean;
  hydrated: boolean;
  remoteHash: string | null;
  editToken: string | null;
  publicUrl: string | null;
  hydrate: () => void;
  setEditMode: (value: boolean) => void;
  openEditor: (id: ActiveCellId) => void;
  closeEditor: () => void;
  setHelpOpen: (value: boolean) => void;
  updateCell: (id: ActiveCellId, patch: Partial<CellConfig>) => void;
  replaceCells: (cells: Record<ActiveCellId, CellConfig>) => void;
  attachRemote: (hash: string, cells: Record<ActiveCellId, CellConfig>, editToken: string | null, url: string) => void;
  reset: () => void;
};

export const WALL_FILE_VERSION = 1;

export function serializeWall(cells: Record<ActiveCellId, CellConfig>) {
  return JSON.stringify({ version: WALL_FILE_VERSION, name: "sixteen", cells }, null, 2);
}

export function parseWallFile(text: string): Record<ActiveCellId, CellConfig> {
  let data: unknown;
  try {
    data = payloadFromText(text);
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("This HTML")) throw error;
    throw new Error("That file is not a Sixteen wall. Download the HTML export and import that.");
  }
  const record =
    data && typeof data === "object" && "cells" in data
      ? (data as { cells: unknown }).cells
      : data;
  if (!record || typeof record !== "object" || Array.isArray(record)) {
    throw new Error("No frames found. Download a wall from Sixteen and import that file.");
  }
  const cells = cloneDefaults();
  let found = 0;
  for (const [key, value] of Object.entries(record as Record<string, CellConfig>)) {
    const id = Number(key);
    if (!isActiveCellId(id) || !value || typeof value !== "object") continue;
    cells[id] = { ...cells[id], ...value, id };
    found += 1;
  }
  if (found === 0) {
    throw new Error("No frames found. Download a wall from Sixteen and import that file.");
  }
  return cells;
}

function payloadFromText(text: string): unknown {
  const trimmed = text.replace(/^\uFEFF/, "").trim();
  if (trimmed.startsWith("<")) {
    const match = trimmed.match(
      /<script\b[^>]*\bid=["']sixteen-wall["'][^>]*>([\s\S]*?)<\/script>/i,
    );
    if (!match?.[1]) throw new Error("This HTML file does not contain a Sixteen wall.");
    return JSON.parse(match[1]);
  }
  return JSON.parse(trimmed);
}

function persist(cells: Record<ActiveCellId, CellConfig>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cells));
  } catch {
    // private mode / quota — keep working in memory
  }
}

export const useWallStore = create<WallState>((set, get) => ({
  cells: cloneDefaults(),
  editMode: false,
  editingId: null,
  helpOpen: false,
  hydrated: false,
  remoteHash: null,
  editToken: null,
  publicUrl: null,
  hydrate: () => {
    if (get().remoteHash) {
      set({ hydrated: true });
      return;
    }
    let helpOpen = false;
    let cells = cloneDefaults();
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Record<string, CellConfig>;
        for (const [key, value] of Object.entries(parsed)) {
          const id = Number(key);
          if (isActiveCellId(id) && value && typeof value === "object") {
            cells[id] = { ...cells[id], ...value, id };
          }
        }
      }
    } catch {
      /* keep defaults */
    }
    set({ cells, hydrated: true, helpOpen });
  },
  setEditMode: (value) => set({ editMode: value, editingId: value ? get().editingId : null }),
  openEditor: (id) => set({ editMode: true, editingId: id }),
  closeEditor: () => set({ editingId: null }),
  setHelpOpen: (value) => {
    set({ helpOpen: value });
    if (!value) {
      try {
        localStorage.setItem("sixteen-seen-help", "1");
      } catch {
        /* ignore */
      }
    }
  },
  updateCell: (id, patch) => {
    const cells = {
      ...get().cells,
      [id]: { ...get().cells[id], ...patch, id },
    };
    if (!get().remoteHash) persist(cells);
    set({ cells });
  },
  replaceCells: (cells) => {
    if (!get().remoteHash) persist(cells);
    set({ cells, editingId: null });
  },
  attachRemote: (hash, cells, editToken, url) => {
    set({
      cells,
      remoteHash: hash,
      editToken,
      publicUrl: url,
      hydrated: true,
      editingId: null,
      editMode: false,
    });
  },
  reset: () => {
    const cells = cloneDefaults();
    if (!get().remoteHash) persist(cells);
    set({ cells, editingId: null });
  },
}));
