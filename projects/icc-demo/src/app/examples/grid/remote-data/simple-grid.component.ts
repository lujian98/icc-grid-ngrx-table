import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IccColumnConfig, IccGridConfig, IccGridModule, defaultGridConfig } from '@icc/ui/grid';

@Component({
  selector: 'app-simple-grid',
  template: `<icc-grid [gridConfig]="gridConfig" [columnsConfig]="columnsConfig"></icc-grid>`,
  styles: [':host { width: 100%; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IccGridModule],
})
export class AppSimpleGridComponent {
  gridConfig: IccGridConfig = {
    ...defaultGridConfig,
    gridName: 'DCR1',
    urlKey: 'DCR',
    //columnSort: true,
    //columnFilter: true,
    //columnResize: true,
    //columnReorder: true,
    //columnMenu: true,
    //columnHidden: true,
    //remoteColumnsConfig: false,

    remoteGridData: true,
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
}
