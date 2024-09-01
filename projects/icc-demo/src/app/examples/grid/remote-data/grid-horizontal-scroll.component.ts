import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IccColumnConfig, IccGridConfig, IccGridModule, defaultGridConfig } from '@icc/ui/grid';

@Component({
  selector: 'app-grid-horizontal-scroll',
  template: `<icc-grid [gridConfig]="gridConfig" [columnsConfig]="columnsConfig"></icc-grid>`,
  styles: [':host { width: 100%; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    IccGridModule,
  ],
})
export class AppGridHorizontalScrollComponent {
  gridConfig: IccGridConfig = {
    ...defaultGridConfig,
    gridName: 'DCR11',
    urlKey: 'DCR',
    horizontalScroll: true,
    columnResize: true,
    remoteGridData: true,
  }

  columnsConfig: IccColumnConfig[] = [{
    name: 'ID',
    width: 50,
    align: 'center',
  }, {
    name: 'vin',
    width: 450,
  }, {
    name: 'brand',
  }, {
    name: 'year',
    width: 350,
    align: 'right',
  }, {
    name: 'color',
    width: 750,
    align: 'center',
  }];
}
