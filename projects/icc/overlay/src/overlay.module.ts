import { NgModule, ModuleWithProviders } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

// import { IccSharedModule } from '../../shared/shared.module';
import { IccOverlayService } from './overlay.service';
import { IccOverlay } from './mapping';
import { IccOverlayContainerComponent } from './overlay-container.component';
import { IccPositionBuilderService } from './overlay-position-builder.service';
import { IccTriggerStrategyBuilderService } from './overlay-trigger';

@NgModule({
  imports: [PortalModule],
  declarations: [IccOverlayContainerComponent],
  exports: [OverlayModule, PortalModule, IccOverlayContainerComponent],
})
export class IccOverlayModule {
  static forRoot(): ModuleWithProviders<IccOverlayModule> {
    return {
      ngModule: IccOverlayModule,
      providers: [IccOverlayService, IccOverlay, IccPositionBuilderService, IccTriggerStrategyBuilderService],
    };
  }
}
