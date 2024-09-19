import { IccD3ChartConfig, IccD3Options } from './options.model';

export interface IccD3Config {
  d3Id: string; // auto generated unique id
  urlKey: string; // Only for remote config // options!: IccD3Options
  options?: IccD3Options;
  remoteD3Config: boolean;
  remoteChartConfigs: boolean;
  remoteD3Data: boolean;
}

export interface D3State {
  [key: string]: IccD3State;
}

export interface IccD3State<T extends object = object> {
  d3Config: IccD3Config;
  chartConfigs: IccD3ChartConfig[];
  data: T[] | undefined;
}

export const defaultD3Config: IccD3Config = {
  d3Id: '191cf2bb6b5', // auto generated unique id
  urlKey: 'formfields', // Only for remote config
  options: undefined,
  remoteD3Config: false,
  remoteChartConfigs: false,
  remoteD3Data: false,
};

export const defaultD3State: IccD3State = {
  d3Config: defaultD3Config,
  chartConfigs: [],
  data: undefined,
};
