import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { createDashboardFeature } from '@icc/ui/dashboard';

export const iccDashboardFeature = createDashboardFeature('iccDashboard2');

@NgModule({
  imports: [StoreModule.forFeature(iccDashboardFeature)],
})
export class IccDashboardDemoModule {}
