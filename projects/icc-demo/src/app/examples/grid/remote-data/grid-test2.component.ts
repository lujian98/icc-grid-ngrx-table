import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IccGridConfig, IccGridModule, defaultGridConfig } from '@icc/ui/grid';

@Component({
  selector: 'app-grid-test2',
  template: `<icc-grid [gridConfig]="gridConfig"></icc-grid>`,
  styles: [':host { width: 100%; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    IccGridModule,
  ],
})
export class AppGridTest2Component {
  gridConfig: IccGridConfig = {
    ...defaultGridConfig,
    gridName: 'DCR2',
    urlKey: 'DCR',
    columnSort: true,
    columnFilter: true,
    columnResize: true,
    columnReorder: true,
    columnMenu: true,
    columnHidden: false,

    remoteColumnsConfig: true,
    remoteGridData: true,
    sortFields: [{
      field: 'ID',
      dir: 'desc',
    }],
    columnFilters: [],
    rowSelection: true,
  }
}
