import type { ActiveCellId, CellConfig } from "@/lib/wall-config";
import { Frame } from "@/components/wall/frames";

type WallTableProps = {
  cells: Record<ActiveCellId, CellConfig>;
  editMode: boolean;
  onEdit: (id: ActiveCellId) => void;
};

export function WallTable({ cells, editMode, onEdit }: WallTableProps) {
  return (
    <table className="wall">
      <caption className="sr-only">
        Sixteen-cell video wall. Four videos along the top, four along the bottom, a 2 by 2
        program in the center, and two custom frames on the sides.
      </caption>
      <colgroup>
        <col className="col" />
        <col className="col" />
        <col className="col" />
        <col className="col" />
      </colgroup>
      <tbody>
        <tr className="row-top">
          <td className="cell-1x1">
            <Frame cell={cells[1]} editMode={editMode} onEdit={() => onEdit(1)} />
          </td>
          <td className="cell-1x1">
            <Frame cell={cells[2]} editMode={editMode} onEdit={() => onEdit(2)} />
          </td>
          <td className="cell-1x1">
            <Frame cell={cells[3]} editMode={editMode} onEdit={() => onEdit(3)} />
          </td>
          <td className="cell-1x1">
            <Frame cell={cells[4]} editMode={editMode} onEdit={() => onEdit(4)} />
          </td>
        </tr>
        <tr className="row-mid">
          <td className="cell-side">
            <Frame cell={cells[5]} editMode={editMode} onEdit={() => onEdit(5)} />
          </td>
          <td className="cell-center" colSpan={2}>
            <Frame cell={cells[6]} editMode={editMode} onEdit={() => onEdit(6)} featured />
          </td>
          <td className="cell-side">
            <Frame cell={cells[8]} editMode={editMode} onEdit={() => onEdit(8)} />
          </td>
        </tr>
        <tr className="row-bottom">
          <td className="cell-1x1">
            <Frame cell={cells[13]} editMode={editMode} onEdit={() => onEdit(13)} />
          </td>
          <td className="cell-1x1">
            <Frame cell={cells[14]} editMode={editMode} onEdit={() => onEdit(14)} />
          </td>
          <td className="cell-1x1">
            <Frame cell={cells[15]} editMode={editMode} onEdit={() => onEdit(15)} />
          </td>
          <td className="cell-1x1">
            <Frame cell={cells[16]} editMode={editMode} onEdit={() => onEdit(16)} />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
