import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  IccColumnConfig,
  IccGridConfig,
  IccGridComponent,
  defaultGridConfig,
  IccGridData,
  IccRendererType,
  IccGridCellRendererComponent,
} from '@icc/ui/grid';
import { CARSDATA3 } from '../../../data/cars-large';

@Component({
  selector: 'app-grid-cell-text',
  template: `
    <div class="grid-cell">
      {{ cellValue }}
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class AppGridCellTextComponent extends IccGridCellRendererComponent<string> {
  get cellValue(): string {
    const brand = (this.record as any)['brand'];
    const year = (this.record as any)['year'];
    return `${brand} ${year}`;
  }
}

@Component({
  selector: 'app-grid-renderer-component',
  template: `<icc-grid [gridConfig]="gridConfig" [columnsConfig]="columnsConfig" [gridData]="gridData"></icc-grid>`,
  styles: [':host { width: 100%; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IccGridComponent],
})
export class AppGridRendererComponent {
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
      component: AppGridCellTextComponent,
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
}
