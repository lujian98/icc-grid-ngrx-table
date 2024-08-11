import { NgModule } from '@angular/core';
import { IccGridComponent } from './grid.component';
import { IccGridDisplayComponent } from './components/grid-display.component';
import { IccTableComponent } from './components/table/table.component';

@NgModule({
  declarations: [
    IccGridComponent,
    //IccTableComponent,
  ],
  exports: [
    IccGridComponent,
    IccTableComponent,
  ],
  imports: [
    IccGridDisplayComponent,
    IccTableComponent,
  ],
})
export class IccGridModule { }
