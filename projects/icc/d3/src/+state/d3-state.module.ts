import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { IccD3Effects } from './d3.effects';
import { IccD3Facade } from './d3.facade';
import { iccD3Feature } from './d3.reducer';

@NgModule({
  imports: [StoreModule.forFeature(iccD3Feature), EffectsModule.forFeature([IccD3Effects])],
  providers: [IccD3Facade],
})
export class IccD3StateModule {}
