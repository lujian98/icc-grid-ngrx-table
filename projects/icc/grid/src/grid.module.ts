import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { IccGridComponent } from './grid.component';
import { IccGridViewComponent } from './components/grid-view.component';
import { IccGridStateModule } from './+state/grid-state.module';

@NgModule({
  imports: [
    MatPaginatorModule,
    IccGridStateModule,
    IccGridViewComponent,
  ],
  declarations: [
    IccGridComponent,
  ],
  exports: [
    IccGridComponent,
  ],
})
export class IccGridModule { }
