import { IccColumnConfig, IccGridConfig } from '../models/grid-column.model';
import { MIN_GRID_COLUMN_WIDTH, ROW_SELECTION_CELL_WIDTH } from '../models/constants';

export function viewportWidthRatio(gridConfig: IccGridConfig, columns: IccColumnConfig[]): number {
  const totalWidth: number = columns
    .filter((column) => !column.hidden)
    .map((column) => (column.width || MIN_GRID_COLUMN_WIDTH))
    .reduce((prev, curr) => prev + curr, 0);

  const viewportWidth = gridConfig.viewportWidth - (gridConfig.rowSelection ? ROW_SELECTION_CELL_WIDTH : 0);

  if (gridConfig.horizontalScroll) {
    return 1.0;
  }
  return viewportWidth / totalWidth;
}
