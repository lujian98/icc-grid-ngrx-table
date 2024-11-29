import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { IccTreeEffects } from './tree.effects';
import { IccTreeFacade } from './tree.facade';
import { iccTreeFeature } from './tree.reducer';

@NgModule({
  imports: [StoreModule.forFeature(iccTreeFeature), EffectsModule.forFeature([IccTreeEffects])],
  providers: [IccTreeFacade],
})
export class IccTreeStateModule {}
