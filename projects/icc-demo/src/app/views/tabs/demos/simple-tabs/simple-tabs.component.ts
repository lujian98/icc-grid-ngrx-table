import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IccTabComponent, IccTabGroupComponent, IccTabsComponent } from '@icc/ui/tabs';
import { AppStockChartComponent } from '../../../d3/demos/stock-charts/stock-chart.component';
import { AppGridRemoteVirtualScrollComponent } from '../../../grid/remote-data/grid-virtual-scroll.component';
import { AppGridMultiRowSelectionComponent } from '../../../grid/remote-data/grid-multi-row-selection.component';
import { PortalDemoComponent } from '../../../dashboard/demos/portal-demo/portal-demo.component';
import { PortalDemo2Component } from '../../../dashboard/demos/portal-demo2/portal-demo2.component';
import { AppGridGroupHeaderComponent } from '../../../grid/remote-data/grid-group-header.component';

@Component({
  selector: 'app-simple-tabs',
  templateUrl: './simple-tabs.component.html',
  styleUrls: ['./simple-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IccTabComponent, IccTabGroupComponent, IccTabsComponent],
})
export class AppSimpleTabsComponent {
  portalData = {
    skills: [1, 2, 3, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  };

  portalData2 = {
    skills: [12, 13, 14, 15, 16],
  };

  tabs = [
    {
      name: 'one',
      content: AppGridMultiRowSelectionComponent,
    },
    {
      name: 'two',
      title: 'Two',
      content: AppStockChartComponent,
    },
    {
      name: 'three',
      content: AppGridRemoteVirtualScrollComponent,
    },
    {
      name: 'four',
      content: PortalDemoComponent,
      context: this.portalData,
    },
    {
      name: 'five',
      content: PortalDemo2Component,
      context: this.portalData2,
    },
    {
      name: 'six',
      content: 'test6',
    },
    {
      name: 'seven',
    },
  ];

  tabs2 = [
    {
      name: 'one',
      content: AppGridGroupHeaderComponent,
    },
    {
      name: 'two',
      title: 'Two',
      //content: AppStockChartComponent,
    },
    {
      name: 'three',
      content: AppStockChartComponent,
    },
    {
      name: 'four',
      content: PortalDemoComponent,
      context: this.portalData,
    },
    {
      name: 'five',
      content: PortalDemo2Component,
      context: this.portalData2,
    },
    {
      name: 'six',
      content: 'test6',
    },
    {
      name: 'seven',
    },
  ];
}
