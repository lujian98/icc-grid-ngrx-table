import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IccGridConfig, IccGridComponent, defaultGridConfig } from '@icc/ui/grid';

@Component({
  selector: 'app-grid-test2',
  template: `<icc-grid [gridConfig]="gridConfig"></icc-grid>`,
  styles: [':host { width: 100%; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IccGridComponent],
})
export class AppGridTest2Component {
  gridConfig: IccGridConfig = {
    ...defaultGridConfig,
    urlKey: 'DCR',
    remoteGridConfig: true,
  };
}
