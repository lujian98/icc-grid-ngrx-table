import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IccGridConfig, IccGridModule, defaultGridConfig } from '@icc/ui/grid';

@Component({
  selector: 'app-grid-test',
  templateUrl: './grid-test.component.html',
  styleUrls: ['./grid-test.component.scss'],
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
    pageSize: 200,
    sortFields: [{
      field: 'ID',
      dir: 'desc',
    }],
    columnFilters: [{ name: 'vin', value: '9' }],
    rowSelection: true,
  }
}
