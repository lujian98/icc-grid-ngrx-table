import { InjectionToken, ViewContainerRef } from '@angular/core';

export const ICC_DIALOG_CONFIG = new InjectionToken<IccDialogConfig>('Default dialog options');

export class IccDialogConfig<D = any> {
  hasBackdrop = true;
  backdropClass = 'cdk-overlay-dark-backdrop';
  closeOnBackdropClick = true;
  closeOnEsc = true;
  viewContainerRef!: ViewContainerRef;
  context!: D;

  constructor(config: Partial<IccDialogConfig>) {
    Object.assign(this, config);
  }
}
