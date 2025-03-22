import { createFeature } from '@ngrx/store';
import { iccDashboardReducer } from './dashboard.reducer';

export function createDashboardFeature(featureName: string) {
  return createFeature({
    name: featureName,
    reducer: iccDashboardReducer,
  });
}
