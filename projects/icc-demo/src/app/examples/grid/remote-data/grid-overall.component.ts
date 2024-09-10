import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IccGridConfig, IccGridComponent, defaultGridConfig, IccColumnConfig } from '@icc/ui/grid';

@Component({
  selector: 'app-grid-overall',
  template: `<icc-grid [gridConfig]="gridConfig"></icc-grid>`,
  styles: [':host { width: 100%; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IccGridComponent],
})
export class AppGridOverallComponent {
  gridConfig: IccGridConfig = {
    ...defaultGridConfig,
    urlKey: 'DCR',
    columnSort: true,
    columnFilter: true,
    columnResize: true,
    columnReorder: true,
    columnMenu: true,
    columnHidden: true,
    remoteColumnsConfig: true,
    remoteGridData: true,

    sortFields: [
      {
        field: 'ID',
        dir: 'desc',
      },
    ],
    columnFilters: [{ name: 'vin', value: '9' }], // TODO remoteColumnsConfig true load first, then load data
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
      hidden: false,
      filterField: false,
    },
    {
      name: 'year',
      sortField: false,
    },
    {
      name: 'color',
    },
  ];
}
