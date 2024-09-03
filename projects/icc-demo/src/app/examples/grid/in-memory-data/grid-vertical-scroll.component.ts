import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IccGridConfig, IccGridModule, IccColumnConfig, defaultGridConfig, IccGridData } from '@icc/ui/grid';
import { CARSDATA3 } from '@icc/ui/grid/src/spec-helpers/cars-large';

@Component({
  selector: 'app-grid-vertical-scroll',
  template: `<icc-grid [gridConfig]="gridConfig" [columnsConfig]="columnsConfig" [gridData]="gridData"></icc-grid>`,
  styles: [':host { width: 100%; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IccGridModule],
})
export class AppGridVerticalScrollComponent {
  gridConfig: IccGridConfig = {
    ...defaultGridConfig,
    gridName: 'INM12',
    columnSort: true,
    columnFilter: true,
    columnResize: true,
    columnReorder: true,
    columnMenu: true,
    columnHidden: true,
    rowSelection: true,
    fitVertical: false,
    pageSize: 200,
    //sortFields: [],
    //columnFilters: [{ name: 'vin', value: '9' }],
    remoteColumnsConfig: false,
    remoteGridData: false,
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
  gridData: IccGridData<any> = CARSDATA3;
}
