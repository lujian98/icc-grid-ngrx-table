import { IccGridConfig, IccGridData, defaultGridConfig } from '@icc/ui/grid';

export interface IccTreeConfig extends IccGridConfig {}

export const defaultTreeConfig: IccTreeConfig = {
  ...defaultGridConfig,
  isTreeGrid: true,
};

//export interface IccTreeData<T> extends IccGridData<T> {}

export interface IccTreeData {
  //id?: string;
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
  treeId: string;
  data: T[];
  inMemoryData: T[];
}

export const defaultTreeState: IccTreeState = {
  treeId: '',
  data: [],
  inMemoryData: [],
};
