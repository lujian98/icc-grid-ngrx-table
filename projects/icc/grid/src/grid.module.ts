import { NgModule } from '@angular/core';
import { IccGridComponent } from './grid.component';
import { IccGridDisplayComponent } from './components/grid-display.component';
import { IccGridViewComponent } from './components/grid-view.component';

@NgModule({
  declarations: [
    IccGridComponent,
  ],
  exports: [
    IccGridComponent,
    //IccGridViewComponent,
  ],
  imports: [
    IccGridDisplayComponent,
    IccGridViewComponent,
  ],
})
export class IccGridModule { }
