import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  IccLayoutCenterComponent,
  IccLayoutHorizontalComponent,
  IccLayoutLeftComponent,
  IccLayoutRightComponent,
} from '@icc/ui/layout';

@Component({
  selector: 'app-horizontal-center-right',
  template: `
    <icc-layout-horizontal [resizeable]="true">
      <icc-layout-center> Horizontal Layout With Right</icc-layout-center>
      <icc-layout-right> </icc-layout-right>
    </icc-layout-horizontal>
  `,
  styles: [':host { display: flex; width: 100%; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    IccLayoutRightComponent,
    IccLayoutHorizontalComponent,
    IccLayoutLeftComponent,
    IccLayoutCenterComponent,
  ],
})
export class AppHorizontalCenterRightComponent {}
