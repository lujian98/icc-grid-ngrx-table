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
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
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
export class AppTabsComponent {
  items: IccAccordion[] = [
    {
      name: 'Tabs Demos',
      items: [
        { name: 'Simple Tabs', link: 'simple-tabs' },
        { name: 'Tab Group', link: 'tab-group' },
        { name: 'Tab Form', link: 'tab-form' },
        { name: 'Double Tab Panels', link: 'double-tabs' },
      ],
    },
  ];
}
