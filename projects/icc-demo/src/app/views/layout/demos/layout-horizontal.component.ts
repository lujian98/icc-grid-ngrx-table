import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  IccLayoutCenterComponent,
  IccLayoutHorizontalComponent,
  IccLayoutLeftComponent,
  IccLayoutRightComponent,
} from '@icc/ui/layout';

@Component({
  selector: 'app-layout-horizontal',
  template: `
    <icc-layout-horizontal [resizeable]="true">
      <icc-layout-left>
        <div>Left</div>
      </icc-layout-left>

      <icc-layout-center>
        <div>Center</div>
      </icc-layout-center>

      <icc-layout-right>
        <div>Right Container</div>
      </icc-layout-right>
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
export class AppLayoutHorizontalComponent {}
