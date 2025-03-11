import { IccPortalContent } from '@icc/ui/portal';

export interface IccDashboardConfig {
  gridGap: number;
  gridWidth: number;
  gridHeight: number;
  cols: number;
  rows: number;
  remoteConfig: boolean;
  remoteOptions: boolean;
  remoteTiles: boolean;
}

export const defaultDashboardConfig: IccDashboardConfig = {
  gridGap: 2,
  gridWidth: 100,
  gridHeight: 100,
  cols: 10,
  rows: 6,
  remoteConfig: false,
  remoteOptions: false,
  remoteTiles: false,
};

export interface IccDashboardSetting {
  // for internal setting
  dashboardId: string;
  viewportReady: boolean; //not used
  gridTemplateColumns: string;
  gridTemplateRows: string;
  gridMap: number[][]; // NOT working put here???
}

export interface DashboardState {
  [key: string]: IccDashboardState;
}

export interface IccDashboardState {
  dashboardConfig: IccDashboardConfig;
  dashboardSetting: IccDashboardSetting;
  tiles: IccTile<unknown>[];
  //options: IccTabConfig[]; // options are input to tabs mapped using portalName to portal component
}

export const defaultDashboardSetting: IccDashboardSetting = {
  dashboardId: '191cf2bb6b5',
  viewportReady: false,
  gridTemplateColumns: '',
  gridTemplateRows: '',
  gridMap: [],
};

export const defaultDashboardState: IccDashboardState = {
  dashboardConfig: defaultDashboardConfig,
  dashboardSetting: defaultDashboardSetting,
  tiles: [],
  //options: [],
};

export interface IccTile<T> {
  name: string;
  title?: string;
  rowStart?: number;
  colStart?: number;
  rowHeight?: number;
  colWidth?: number;
  portalName?: string; // use for save component mapping key
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

export interface IccTileOption<T> {
  name: string;
  title?: string;
  component: IccPortalContent<T>;
}

export interface IccTileInfo {
  rowStart: number;
  colStart: number;
  rowHeight: number;
  colWidth: number;
}

export interface IccTileResizeMap {
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
