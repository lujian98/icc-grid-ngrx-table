import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { IccDashboardEffects } from './dashboard.effects';
import { IccDashboardFacade } from './dashboard.facade';

@NgModule({
  imports: [EffectsModule.forFeature([IccDashboardEffects])],
  providers: [IccDashboardFacade],
})
export class IccDashboardStateModule {}
