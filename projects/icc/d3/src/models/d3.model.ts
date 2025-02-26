import { IccD3ChartConfig, IccD3Options } from './options.model';

export interface IccD3Config {
  urlKey: string; // Only for remote config // options!: IccD3Options
  chartName: string; // require if remote or use default
  options?: IccD3Options;
  remoteD3Config: boolean;
  remoteChartConfigs: boolean;
  remoteD3Data: boolean;
}

// for internal grid setting
export interface IccD3Setting {
  d3Id: string; // auto generated unique id
}

export const defaultD3Setting: IccD3Setting = {
  d3Id: '191cf2bb6b5', // auto generated unique id
};

export interface D3State {
  [key: string]: IccD3State;
}

export interface IccD3State<T extends object = object> {
  d3Config: IccD3Config;
  d3Setting: IccD3Setting;
  chartConfigs: IccD3ChartConfig[];
  data: T[] | undefined;
}

export const defaultD3Config: IccD3Config = {
  urlKey: 'formfields', // Only for remote config
  chartName: 'chartName',
  options: undefined,
  remoteD3Config: false,
  remoteChartConfigs: false,
  remoteD3Data: false,
};

export const defaultD3State: IccD3State = {
  d3Config: defaultD3Config,
  d3Setting: defaultD3Setting,
  chartConfigs: [],
  data: undefined,
};
