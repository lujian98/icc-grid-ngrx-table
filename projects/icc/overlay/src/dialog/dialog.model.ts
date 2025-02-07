import { InjectionToken, Injector } from '@angular/core';

export const ICC_DIALOG_CONFIG = new InjectionToken<IccDialogConfig>('Default dialog options');

export class IccDialogConfig<D = {}> {
  hasBackdrop = true;
  backdropClass = 'cdk-overlay-dark-backdrop';
  closeOnBackdropClick = true;
  closeOnEsc = true;
  injector!: Injector;
  context!: D;

  constructor(config: Partial<IccDialogConfig>) {
    Object.assign(this, config);
  }
}
