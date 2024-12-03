import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IccAccordion, IccAccordionComponent } from '@icc/ui/accordion';
import { IccLayoutCenterComponent, IccLayoutSidebarComponent } from '@icc/ui/layout';
import { IccLayoutPanelContentComponent } from '@icc/ui/layout-panel';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
    IccLayoutPanelContentComponent,
    IccLayoutCenterComponent,
    IccLayoutSidebarComponent,
    IccAccordionComponent,
  ],
})
export class AppDashboardComponent {
  items: IccAccordion[] = [
    {
      name: 'Dashboard Demo',
      items: [{ name: 'Dashboard Demo', link: 'dashboard-demo' }],
    },
  ];
}
