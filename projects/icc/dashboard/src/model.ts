import { IccPortalContent } from '@icc/ui/portal';

export interface Tile<T> {
  name: string;
  title?: string;
  rowStart?: number;
  colStart?: number;
  rowHeight?: number;
  colWidth?: number;
  content?: IccPortalContent<T>;
  context?: {};
  dragDisabled?: boolean;
  enableContextMenu?: boolean;
  color?: string; //no need can be removed
  index?: number; // internal use?
  gridColumn?: string; // internal use?
  gridRow?: string; // internal use?
}

export const defaultTileConfig = {
  name: 'tilename',
  dragDisabled: false,
  enableContextMenu: true,
};

export interface TileInfo {
  rowStart: number;
  colStart: number;
  rowHeight: number;
  colWidth: number;
}

export interface ResizeMap {
  startRow: number;
  endRow: number;
  startCol: number;
  endCol: number;
  colChange: number;
  rowChange: number;
}

export interface DxyPosition {
  dx: number;
  dy: number;
}

export enum IccDashboardMenuType {
  CONFIGURE = 'Configure',
  REMOVE = 'Remove',
}

export const defaultTileMenus = [
  {
    title: 'ICC.UI.ACTIONS.CONFIGURE',
    name: IccDashboardMenuType.CONFIGURE,
    icon: 'pen-to-square',
  },
  {
    title: 'ICC.UI.ACTIONS.REMOVE',
    name: IccDashboardMenuType.REMOVE,
    icon: 'trash',
  },
];
