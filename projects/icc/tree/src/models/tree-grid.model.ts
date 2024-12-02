import { IccGridConfig, defaultGridConfig } from '@icc/ui/grid';

export interface IccTreeConfig extends IccGridConfig {
  remoteLoadAll?: boolean;
  dragDisabled?: boolean;
}

export const defaultTreeConfig: IccTreeConfig = {
  ...defaultGridConfig,
  isTreeGrid: true,
  //remoteGridConfig: false,
  //remoteColumnsConfig: false,
  //remoteGridData: false,
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
  //readonly?: boolean;
  children?: IccTreeData[];
  //contextMenu?: SunMenuItem[];
}

export interface IccTreeNode<T> extends IccTreeData {}

export interface TreeState {
  [key: string]: IccTreeState;
}

export interface IccTreeState<T extends object = object> {
  treeConfig: IccTreeConfig;
  treeData: IccTreeNode<T>[];
  inMemoryData: IccTreeNode<T>[];
}

export const defaultTreeState: IccTreeState = {
  treeConfig: defaultTreeConfig,
  treeData: [],
  inMemoryData: [],
};

export interface IccTreeDropInfo<T> {
  target: IccTreeNode<T>;
  targetParent?: IccTreeNode<T>;
  targetIndex?: number;
  position?: string;
}
