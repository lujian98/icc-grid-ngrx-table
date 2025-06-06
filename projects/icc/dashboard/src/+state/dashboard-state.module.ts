import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { IccDashboardEffects } from './dashboard.effects';
import { IccDashboardFacade } from './dashboard.facade';
import { iccDashboardFeature } from './dashboard.reducer';

@NgModule({
  imports: [StoreModule.forFeature(iccDashboardFeature), EffectsModule.forFeature([IccDashboardEffects])],
  providers: [IccDashboardFacade],
})
export class IccDashboardStateModule {}
