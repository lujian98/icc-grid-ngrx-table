import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IccAccordion, IccAccordionComponent } from '@icc/ui/accordion';
import { IccMenuConfig, IccMenusComponent } from '@icc/ui/menu';
import {
  IccLayoutRightComponent,
  IccLayoutHorizontalComponent,
  IccLayoutLeftComponent,
  IccLayoutCenterComponent,
} from '@icc/ui/layout';
import { IccTabsComponent, IccTabsConfig, IccTabConfig } from '@icc/ui/tabs';
import { AppStockChartComponent } from '../d3/demos/stock-charts/stock-chart.component';
import { AppGridRemoteVirtualScrollComponent } from '../grid/remote-data/grid-virtual-scroll.component';
import { AppGridMultiRowSelectionComponent } from '../grid/remote-data/grid-multi-row-selection.component';
import { PortalDemoComponent } from '../dashboard/demos/portal-demo/portal-demo.component';
import { PortalDemo2Component } from '../dashboard/demos/portal-demo2/portal-demo2.component';

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
    IccTabsComponent,
  ],
})
export class AppTabsComponent {
  useRouterLink: boolean = true;

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
    {
      name: 'Tabs Panel Demo',
      items: [
        { name: 'grid-multi-row-selection', title: 'Grid Multi Row Selection' },
        { name: 'stock-chart', title: 'Stock Chart' },
        { name: 'grid-virtual-scroll', title: 'Grid Virtual Scroll' },
        { name: 'portal-demo', title: 'Portal Demo' },
        { name: 'portal-demo2', title: 'Portal Demo 2' },
        { name: 'six' },
        { name: 'seven' },
      ],
    },
  ];

  tabsConfig: Partial<IccTabsConfig> = {
    enableContextMenu: true,
  };
  tabs: IccTabConfig[] = [];
  selectedTabIndex: number = 0;

  portalData = {
    skills: [1, 2, 3, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  };

  portalData2 = {
    skills: [12, 13, 14, 15, 16],
  };

  private mappedOptionTabs = [
    {
      name: 'grid-multi-row-selection',
      title: 'Grid Multi Row Selection',
      content: AppGridMultiRowSelectionComponent,
      closeable: true,
    },
    {
      name: 'stock-chart',
      title: 'Stock Chart',
      content: AppStockChartComponent,
      closeable: true,
    },
    {
      name: 'grid-virtual-scroll',
      title: 'Grid Virtual Scroll',
      content: AppGridRemoteVirtualScrollComponent,
      closeable: true,
    },
    {
      name: 'portal-demo',
      title: 'Portal Demo',
      content: PortalDemoComponent,
      context: this.portalData,
      closeable: true,
    },
    {
      name: 'portal-demo2',
      title: 'Portal Demo2',
      content: PortalDemo2Component,
      context: this.portalData2,
      closeable: false,
    },
    {
      name: 'six',
      content: 'test6',
      closeable: true,
    },
    {
      name: 'seven',
      closeable: true,
    },
  ];

  onMenuItemClick(item: IccMenuConfig): void {
    if (item.link) {
      this.useRouterLink = true;
    } else {
      this.useRouterLink = false;
      const find = this.tabs.findIndex((tab) => tab.name === item.name);
      console.log(' find=', find);
      if (find === -1) {
        const tab = this.mappedOptionTabs.find((option) => option.name === item.name);
        console.log(' tab=', tab);
        if (tab) {
          const tabs = [...this.tabs];
          tabs.push(tab);
          this.tabs = [...tabs];
          this.selectedTabIndex = this.tabs.length - 1;
        }
      } else {
        this.selectedTabIndex = find;
      }
    }
  }
}
