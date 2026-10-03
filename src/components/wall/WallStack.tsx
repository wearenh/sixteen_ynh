import type { ActiveCellId, CellConfig } from "@/lib/wall-config";
import { Frame } from "@/components/wall/frames";

type WallStackProps = {
  cells: Record<ActiveCellId, CellConfig>;
  editMode: boolean;
  onEdit: (id: ActiveCellId) => void;
};

const SMALL: ActiveCellId[] = [1, 2, 3, 4, 13, 14, 15, 16];

export function WallStack({ cells, editMode, onEdit }: WallStackProps) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-2 px-3 py-3 pb-24">
      <div className="relative aspect-video overflow-hidden">
        <Frame cell={cells[6]} editMode={editMode} onEdit={() => onEdit(6)} featured autoPlay />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {SMALL.map((id) => (
          <div key={id} className="relative aspect-video overflow-hidden">
            <Frame cell={cells[id]} editMode={editMode} onEdit={() => onEdit(id)} autoPlay={false} />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <div className="relative min-h-80 overflow-hidden">
          <Frame cell={cells[5]} editMode={editMode} onEdit={() => onEdit(5)} />
        </div>
        <div className="relative min-h-80 overflow-hidden">
          <Frame cell={cells[8]} editMode={editMode} onEdit={() => onEdit(8)} />
        </div>
      </div>
    </div>
  );
}
