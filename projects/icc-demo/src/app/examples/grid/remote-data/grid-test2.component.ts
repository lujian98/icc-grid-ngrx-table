import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IccGridConfig, IccGridComponent, defaultGridConfig } from '@icc/ui/grid';

@Component({
  selector: 'app-grid-test2',
  template: `<icc-grid [gridConfig]="gridConfig"></icc-grid>`,
  styles: [':host { width: 100%; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IccGridComponent],
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
    columnHidden: true,
    page: 5,

    remoteColumnsConfig: true,
    remoteGridData: true,
    sortFields: [
      {
        field: 'ID',
        dir: 'asc',
      },
    ],
    columnFilters: [],
    rowSelection: true,
  };
}
