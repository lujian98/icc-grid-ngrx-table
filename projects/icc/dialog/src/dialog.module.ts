import { NgModule, ModuleWithProviders } from '@angular/core';
import { PortalModule } from '@angular/cdk/portal';
// import { IccSharedModule } from '../shared/shared.module';
import { IccOverlayModule } from '@icc/ui/overlay';
import { IccDialogService } from './dialog.service';
import { ICC_DIALOG_CONFIG, IccDialogConfig } from './dialog-config';
import { IccDialogContainerComponent } from './dialog-container/dialog-container.component';

@NgModule({
  imports: [PortalModule, IccOverlayModule],
  declarations: [IccDialogContainerComponent],
})
export class IccDialogModule {
  static forRoot(
    dialogConfig: Partial<IccDialogConfig> = {},
  ): ModuleWithProviders<IccDialogModule> {
    return {
      ngModule: IccDialogModule,
      providers: [
        IccDialogService,
        { provide: ICC_DIALOG_CONFIG, useValue: dialogConfig },
      ],
    };
  }

  static forChild(
    dialogConfig: Partial<IccDialogConfig> = {},
  ): ModuleWithProviders<IccDialogModule> {
    return {
      ngModule: IccDialogModule,
      providers: [
        IccDialogService,
        { provide: ICC_DIALOG_CONFIG, useValue: dialogConfig },
      ],
    };
  }
}
