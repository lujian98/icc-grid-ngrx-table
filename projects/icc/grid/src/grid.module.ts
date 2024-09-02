import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IccGridComponent } from './grid.component';
import { IccGridViewComponent } from './components/grid-view.component';
import { IccGridFooterComponent } from './components/grid-footer/grid-footer.component';
import { IccGridStateModule } from './+state/grid-state.module';
import { IccOverlayModule } from '@icc/ui/overlay';

@NgModule({
  imports: [
    CommonModule,
    IccOverlayModule.forRoot(),
    IccGridStateModule,
    IccGridViewComponent,
    IccGridFooterComponent,
  ],
  declarations: [IccGridComponent],
  exports: [IccGridComponent],
})
export class IccGridModule {}
