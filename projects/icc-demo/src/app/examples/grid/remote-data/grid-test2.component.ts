import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IccGridConfig, IccGridComponent, defaultGridConfig, IccColumnConfig } from '@icc/ui/grid';

@Component({
  selector: 'app-grid-test2',
  template: `<icc-grid [gridConfig]="gridConfig" [columnsConfig]="columnsConfig"></icc-grid>`,
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
    //page: 5,

    remoteColumnsConfig: false,
    remoteGridData: true,
    sortFields: [
      {
        field: 'ID',
        dir: 'asc',
      },
    ], // { title: 'BMW', name: 'BMW' }
    columnFilters: [
      { name: 'vin', value: '9' },
      { name: 'brand', value: [{ title: 'BMW', name: 'BMW' }] },
    ],
    rowSelection: true,
  };

  columnsConfig: IccColumnConfig[] = [
    {
      name: 'ID',
      width: 50,
      align: 'center',
    },
    {
      name: 'vin',
    },
    {
      name: 'brand',
      filterField: 'select',
    },
    {
      name: 'year',
      width: 50,
      align: 'right',
    },
    {
      name: 'color',
      width: 80,
      align: 'center',
    },
  ];
}
