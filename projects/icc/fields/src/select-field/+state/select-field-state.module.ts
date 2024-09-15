import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { IccSelectFieldEffects } from './select-field.effects';
import { IccSelectFieldFacade } from './select-field.facade';
import { iccSelectFieldFeature } from './select-field.reducer';

@NgModule({
  imports: [StoreModule.forFeature(iccSelectFieldFeature), EffectsModule.forFeature([IccSelectFieldEffects])],
  providers: [IccSelectFieldFacade],
})
export class IccSelectFieldStateModule {}
