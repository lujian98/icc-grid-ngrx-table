import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { IccTabsEffects } from './tabs.effects';
import { IccTabsFacade } from './tabs.facade';
import { iccTabsFeature } from './tabs.reducer';

@NgModule({
  imports: [StoreModule.forFeature(iccTabsFeature), EffectsModule.forFeature([IccTabsEffects])],
  providers: [IccTabsFacade],
})
export class IccTabsStateModule {}
