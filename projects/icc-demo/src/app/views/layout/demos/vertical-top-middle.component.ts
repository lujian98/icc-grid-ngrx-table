import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  IccLayoutTopComponent,
  IccLayoutVerticalComponent,
  IccLayoutMiddleComponent,
  IccLayoutBottomComponent,
} from '@icc/ui/layout';

@Component({
  selector: 'app-vertical-top-middle',
  template: `
    <icc-layout-vertical [resizeable]="true">
      <icc-layout-top> </icc-layout-top>
      <icc-layout-middle> Vertical Layout (Top, Middle) </icc-layout-middle>
    </icc-layout-vertical>
  `,
  styles: [':host { display: flex; width: 100%; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    IccLayoutTopComponent,
    IccLayoutVerticalComponent,
    IccLayoutMiddleComponent,
    IccLayoutBottomComponent,
  ],
})
export class AppVerticalTopMiddleComponent {}
