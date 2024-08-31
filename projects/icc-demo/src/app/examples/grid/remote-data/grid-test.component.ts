import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IccGridConfig, IccGridModule, defaultGridConfig } from '@icc/ui/grid';

@Component({
  selector: 'app-grid-test',
  template: `<icc-grid [gridConfig]="gridConfig"></icc-grid>`,
  styles: [':host { width: 100%; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    IccGridModule,
  ],
})
export class AppGridTestComponent {
  gridConfig: IccGridConfig = {
    ...defaultGridConfig,
    gridName: 'DCR',
    remoteColumnsConfig: true,
    remoteGridData: true,
    sortFields: [{
      field: 'ID',
      dir: 'desc',
    }],
    columnFilters: [{ name: 'vin', value: '9' }],
    rowSelection: true,
  }
}
