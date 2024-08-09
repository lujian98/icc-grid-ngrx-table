import { NgModule } from '@angular/core';
import { IccGridComponent } from './grid.component';
import { IccGridDisplayComponent } from './components/grid-display.component';


@NgModule({
  declarations: [
    IccGridComponent,
  ],
  exports: [
    IccGridComponent,
  ],
  imports: [
    IccGridDisplayComponent,
  ],
})
export class IccGridModule { }
