import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IccGridConfig, IccGridModule, defaultGridConfig } from '@icc/ui/grid';

@Component({
  selector: 'app-grid-remote-vertical-scroll',
  template: `<icc-grid [gridConfig]="gridConfig"></icc-grid>`,
  styles: [':host { width: 100%; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IccGridModule],
})
export class AppGridRemoteVerticalScrollComponent {
  gridConfig: IccGridConfig = {
    ...defaultGridConfig,
    gridName: 'INM12',
    urlKey: 'DCR',
    columnSort: true,
    columnFilter: true,
    columnResize: true,
    columnReorder: true,
    columnMenu: true,
    columnHidden: true,
    rowSelection: true,
    virtualScroll: true,
    remoteColumnsConfig: true,
    remoteGridData: true,
  };
}
