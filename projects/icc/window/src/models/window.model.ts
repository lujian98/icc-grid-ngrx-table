export interface IccWindowConfig {
  title: string;
  closable: Boolean;
  dragDisabled: boolean;
  maximizable: Boolean;
  resizeable: boolean;
}

export const defaultWindowConfig: IccWindowConfig = {
  title: '',
  closable: true,
  dragDisabled: false,
  maximizable: true,
  resizeable: true,
};

export interface IccWindowInfo {
  top: number;
  left: number;
  width: number;
  height: number;
}
