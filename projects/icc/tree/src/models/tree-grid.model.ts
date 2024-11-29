import { IccGridConfig, IccGridData, defaultGridConfig } from '@icc/ui/grid';

export interface IccTreeConfig extends IccGridConfig {}

export const defaultTreeConfig: IccTreeConfig = {
  ...defaultGridConfig,
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
