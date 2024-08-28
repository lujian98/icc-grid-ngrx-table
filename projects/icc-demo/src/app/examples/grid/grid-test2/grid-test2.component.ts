import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IccGridConfig, IccGridModule, defaultGridConfig } from '@icc/ui/grid';

@Component({
  selector: 'app-grid-test2',
  templateUrl: './grid-test2.component.html',
  styleUrls: ['./grid-test2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    IccGridModule,
  ],
})
export class AppGridTest2Component {
  gridConfig: IccGridConfig = {
    ...defaultGridConfig,
    gridName: 'DCR2',
    urlKey: 'DCR',
    remoteColumnsConfig: true,
    remoteGridData: true,
    pageSize: 200,
    sortFields: [{
      field: 'ID',
      dir: 'desc',
    }],
    columnFilters: [],
    rowSelection: true,
  }
}
