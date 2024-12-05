import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IccAccordion, IccAccordionComponent } from '@icc/ui/accordion';
import {
  IccLayoutRightComponent,
  IccLayoutHorizontalComponent,
  IccLayoutLeftComponent,
  IccLayoutCenterComponent,
} from '@icc/ui/layout';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
    IccLayoutHorizontalComponent,
    IccLayoutLeftComponent,
    IccLayoutCenterComponent,
    IccLayoutRightComponent,
    IccAccordionComponent,
  ],
})
export class AppLayoutComponent {
  items: IccAccordion[] = [
    {
      name: 'Layout Demo', // layout-horizontal-all
      items: [
        { name: 'Horizontal Layout (Left, Center, Right)', link: 'horizontal-layout' },
        { name: 'Horizontal Layout (Left, Center)', link: 'horizontal-left-center' },
        { name: 'Horizontal Layout (Center, Right)', link: 'horizontal-center-right' },
        { name: 'Horizontal Layout (Left, Right)', link: 'horizontal-left-right' },
        { name: 'Horizontal Layout (header and footer)', link: 'layout-horizontal-all' },

        { name: 'Vertical Layout (Top, Middle, Bottom)', link: 'layout-vertical' },
      ],
    },
  ];
}
