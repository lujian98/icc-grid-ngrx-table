import { unset } from 'lodash-es';

export interface IccWindowConfig {
  title: string;
  closable: Boolean;
  dragDisabled: boolean;
  maximizable: Boolean;
  resizeable: boolean;
  width: string;
  height: string;
}

export const defaultWindowConfig: IccWindowConfig = {
  title: '',
  closable: true,
  dragDisabled: false,
  maximizable: true,
  resizeable: true,
  width: '800px',
  height: '100%',
};

export interface IccWindowInfo {
  top: number;
  left: number;
  width: number;
  height: number;
}
