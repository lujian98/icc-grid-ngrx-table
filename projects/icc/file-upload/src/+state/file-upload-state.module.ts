import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { IccFileUploadEffects } from './file-upload.effects';
import { IccFileUploadFacade } from './file-upload.facade';
import { iccFileUploadFeature } from './file-upload.reducer';

@NgModule({
  imports: [StoreModule.forFeature(iccFileUploadFeature), EffectsModule.forFeature([IccFileUploadEffects])],
  providers: [IccFileUploadFacade],
})
export class IccFileUploadStateModule {}
