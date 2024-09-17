import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { IccFormEffects } from './form.effects';
import { IccFormFacade } from './form.facade';
import { iccFormFeature } from './form.reducer';

@NgModule({
  imports: [StoreModule.forFeature(iccFormFeature), EffectsModule.forFeature([IccFormEffects])],
  providers: [IccFormFacade],
})
export class IccFormStateModule {}
