import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IccGridConfig, IccGridModule, defaultGridConfig } from '@icc/ui/grid';

@Component({
  selector: 'app-simple-grid',
  template: `<icc-grid [gridConfig]="gridConfig"></icc-grid>`,
  styles: [':host { width: 100%; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    IccGridModule,
  ],
})
export class AppSimpleGridComponent {
  gridConfig: IccGridConfig = {
    ...defaultGridConfig,
    gridName: 'DCR1',
    urlKey: 'DCR',
    //enableSort: false,
    //enableFilter: false,
    remoteColumnsConfig: true,
    remoteGridData: true,
  }
}
