export interface IccWindowConfig {
  title: string;
  showHeader: boolean;
  closable: Boolean;
  dragDisabled: boolean;
  maximizable: Boolean;
  resizeable: boolean;
  width: string;
  height?: string;
}

export const defaultWindowConfig: IccWindowConfig = {
  title: '',
  showHeader: true,
  closable: true,
  dragDisabled: false,
  maximizable: true,
  resizeable: true,
  width: '800px',
};

export interface IccWindowInfo {
  top: number;
  left: number;
  width: number;
  height: number;
}
