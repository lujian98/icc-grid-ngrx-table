import { NgModule } from '@angular/core';
import { IccGridComponent } from './grid.component';
import { IccGridViewComponent } from './components/grid-view.component';

@NgModule({
  declarations: [
    IccGridComponent,
  ],
  exports: [
    IccGridComponent,
  ],
  imports: [
    IccGridViewComponent,
  ],
})
export class IccGridModule { }
