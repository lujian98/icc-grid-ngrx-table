import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { IccFileDropEffects } from './file-drop.effects';
import { IccFileDropFacade } from './file-drop.facade';
import { iccFileDropFeature } from './file-drop.reducer';

@NgModule({
  imports: [StoreModule.forFeature(iccFileDropFeature), EffectsModule.forFeature([IccFileDropEffects])],
  providers: [IccFileDropFacade],
})
export class IccFileDropStateModule {}
