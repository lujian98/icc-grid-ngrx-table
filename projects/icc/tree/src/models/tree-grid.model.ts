import { IccGridConfig, defaultGridConfig } from '@icc/ui/grid';

export interface IccTreeConfig extends IccGridConfig {}

export const defaultTreeConfig: IccTreeConfig = {
  ...defaultGridConfig,
  isTreeGrid: true,
};

export interface IccTreeData {
  //id?: string;
  level?: number;
  name: string;
  //icon?: string | SunIconConfig;
  //readonly?: boolean;
  //leaf?: boolean;
  children?: IccTreeData[];
  //contextMenu?: SunMenuItem[];
}

export interface IccTreeNode<T> extends IccTreeData {}

export interface TreeState {
  [key: string]: IccTreeState;
}

export interface IccTreeState<T extends object = object> {
  //treeId: string;
  treeConfig: IccTreeConfig;
  data: IccTreeNode<T>[];
  inMemoryData: IccTreeNode<T>[];
}

export const defaultTreeState: IccTreeState = {
  //treeId: '',
  treeConfig: defaultTreeConfig,
  data: [],
  inMemoryData: [],
};
