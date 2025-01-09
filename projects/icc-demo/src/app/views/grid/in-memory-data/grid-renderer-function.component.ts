import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  IccColumnConfig,
  IccGridConfig,
  IccGridComponent,
  defaultGridConfig,
  IccGridData,
  IccRendererType,
} from '@icc/ui/grid';
import { CARSDATA3 } from '../../../data/cars-large';

@Component({
  selector: 'app-grid-renderer-function',
  template: `<icc-grid [gridConfig]="gridConfig" [columnsConfig]="columnsConfig" [gridData]="gridData"></icc-grid>`,
  styles: [':host { width: 100%; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IccGridComponent],
})
export class AppGridRendererFunctionComponent {
  gridConfig: Partial<IccGridConfig> = {
    ...defaultGridConfig,
    urlKey: 'DCR',
    rowHeight: 60,
    columnSort: true,
    columnFilter: true,
    columnResize: true,
    columnReorder: true,
    columnMenu: true,
    columnHidden: true,
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
      title: 'Make and Year',
      filterField: false,
      renderer: this.rendererDisplay.bind(this),
    },
    {
      name: 'color',
      width: 80,
      align: 'center',
    },
    {
      name: 'image',
      width: 80,
      align: 'center',
      rendererType: IccRendererType.Image,
    },
  ];
  gridData: IccGridData<any> = CARSDATA3;

  private rendererDisplay(
    value: string,
    field: string,
    column: IccColumnConfig,
    record: any,
    rowIndex: number,
  ): string {
    const brand = record['brand'];
    const year = record['year'];
    return `${brand}: ${year}`;
  }
}
