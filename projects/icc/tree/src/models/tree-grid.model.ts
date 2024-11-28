import { IccGridConfig, IccGridData, defaultGridConfig } from '@icc/ui/grid';

export interface IccTreeConfig extends IccGridConfig {}

export const defaultTreeConfig: IccTreeConfig = {
  ...defaultGridConfig,
};

export interface IccTreeData<T> extends IccGridData<T> {}
