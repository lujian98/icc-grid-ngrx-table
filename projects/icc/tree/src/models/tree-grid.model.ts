import { IccGridConfig, defaultGridConfig, IccGridSetting, defaultGridSetting } from '@icc/ui/grid';

export interface IccTreeConfig extends IccGridConfig {
  remoteLoadAll?: boolean;
  dragDisabled?: boolean;
}

export interface IccTreeSetting extends IccGridSetting {}
export const defaultTreeSetting: IccGridSetting = {
  ...defaultGridSetting,
};

export const defaultTreeConfig: IccTreeConfig = {
  ...defaultGridConfig,
  isTreeGrid: true,
  virtualScroll: true,
  pageSize: 10000,
  remoteLoadAll: false,
  dragDisabled: false,
};

export interface IccTreeData {
  id?: string; // if id not set will use name, must be unique tree node id to support drag and drop
  name: string;
  level?: number;
  leaf?: boolean;
  expanded?: boolean;
  icon?: string;
  children?: IccTreeData[];
  //contextMenu?: IccMenuItem[];
}

export interface IccTreeNode<T> extends IccTreeData {}

export interface TreeState {
  [key: string]: IccTreeState;
}

export interface IccTreeState<T extends object = object> {
  treeConfig: IccTreeConfig;
  treeSetting: IccTreeSetting;
  treeData: IccTreeNode<T>[];
  inMemoryData: IccTreeNode<T>[];
}

export const defaultTreeState: IccTreeState = {
  treeConfig: defaultTreeConfig,
  treeSetting: defaultTreeSetting,
  treeData: [],
  inMemoryData: [],
};

export interface IccTreeDropInfo<T> {
  target: IccTreeNode<T>;
  targetParent?: IccTreeNode<T>;
  targetIndex?: number;
  position?: string;
}
