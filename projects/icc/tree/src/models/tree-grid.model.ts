import { IccGridConfig, defaultGridConfig } from '@icc/ui/grid';

export interface IccTreeConfig extends IccGridConfig {
  //id?: string;
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
  //id: 'name', // TODO not used
  remoteLoadAll: false,
  dragDisabled: false,
};

export interface IccTreeData {
  id?: string; // if node set will use name unique tree node id
  name: string;
  level?: number;
  leaf?: boolean;
  expanded?: boolean;
  icon?: string;
  //readonly?: boolean;
  //
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
  //remoteData: IccTreeNode<T>[];
  inMemoryData: IccTreeNode<T>[];
}

export const defaultTreeState: IccTreeState = {
  treeConfig: defaultTreeConfig,
  treeData: [],
  //remoteData: [],
  inMemoryData: [],
};

export interface IccTreeDropInfo<T> {
  target: IccTreeNode<T>;
  //targetId: string;
  position?: string;
}
