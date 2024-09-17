import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { IccFormPanelEffects } from './form-panel.effects';
import { IccFormPanelFacade } from './form-panel.facade';
import { iccFormPanelFeature } from './form-panel.reducer';

@NgModule({
  imports: [StoreModule.forFeature(iccFormPanelFeature), EffectsModule.forFeature([IccFormPanelEffects])],
  providers: [IccFormPanelFacade],
})
export class IccFormPanelStateModule {}
