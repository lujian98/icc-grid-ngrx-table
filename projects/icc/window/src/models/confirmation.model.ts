import { defaultWindowConfig, IccWindowConfig } from './window.model';

export interface IccConfirmationConfig extends IccWindowConfig {
  showFooter: boolean;
  showOkButton: boolean;
  ok: string;
  showCancelButton: boolean;
  cancel: string;
  showCloseButton: boolean;
  close: string;
  message: string;
}

export const defaultConfirmationConfig: IccConfirmationConfig = {
  ...defaultWindowConfig,
  showFooter: true,
  title: 'Confirmation',
  showOkButton: false,
  ok: 'ICC.UI.ACTIONS.OK',
  showCancelButton: false,
  cancel: 'ICC.UI.ACTIONS.CANCEL',
  showCloseButton: false,
  close: 'ICC.UI.ACTIONS.CLOSE',
  message: '',
  width: '400px',
};
