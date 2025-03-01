import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ICC_DIALOG_CONFIG, IccDialogConfig } from './dialog/dialog.model';
import { IccDialogService } from './dialog/dialog.service';
import { IccPositionBuilderService } from './overlay/overlay-position-builder.service';
import { IccTriggerStrategyBuilderService } from './overlay/overlay-trigger';
import { IccOverlay } from './overlay/overlay.models';
import { IccOverlayService } from './overlay/overlay.service';

@NgModule({
  imports: [PortalModule, CommonModule],
  exports: [OverlayModule, PortalModule],
})
export class IccOverlayModule {
  static forRoot(dialogConfig: Partial<IccDialogConfig> = {}): ModuleWithProviders<IccOverlayModule> {
    return {
      ngModule: IccOverlayModule,
      providers: [
        IccOverlayService,
        IccOverlay,
        IccPositionBuilderService,
        IccTriggerStrategyBuilderService,
        IccDialogService,
        { provide: ICC_DIALOG_CONFIG, useValue: dialogConfig },
      ],
    };
  }
}
