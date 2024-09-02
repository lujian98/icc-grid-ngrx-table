import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IccColumnConfig, IccGridConfig, IccGridModule, defaultGridConfig } from '@icc/ui/grid';

@Component({
  selector: 'app-grid-column-hidden',
  template: `<icc-grid [gridConfig]="gridConfig" [columnsConfig]="columnsConfig"></icc-grid>`,
  styles: [':host { width: 100%; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IccGridModule],
})
export class AppGridColumnHiddenComponent {
  gridConfig: IccGridConfig = {
    ...defaultGridConfig,
    gridName: 'DCR7',
    urlKey: 'DCR',
    columnMenu: true,
    columnSort: true,
    columnHidden: true,
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
      //sortField: false,
    },
    {
      name: 'color',
      width: 80,
      align: 'center',
    },
  ];
}
