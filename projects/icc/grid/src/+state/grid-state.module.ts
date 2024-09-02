import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { IccGridEffects } from './grid.effects';
import { IccGridFacade } from './grid.facade';
import { iccGridFeature } from './grid.reducer';

@NgModule({
  imports: [StoreModule.forFeature(iccGridFeature), EffectsModule.forFeature([IccGridEffects])],
  providers: [IccGridFacade],
})
export class IccGridStateModule {}
