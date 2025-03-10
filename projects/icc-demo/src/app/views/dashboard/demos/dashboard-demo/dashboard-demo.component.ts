import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IccDashboardComponent, IccTile, IccTileOption } from '@icc/ui/dashboard';
import { AppStockChartComponent } from '../../../d3/demos/stock-charts/stock-chart.component';
import { AppGridRemoteVirtualScrollComponent } from '../../../grid/remote-data/grid-virtual-scroll.component';
import { AppGridMultiRowSelectionComponent } from '../../../grid/remote-data/grid-multi-row-selection.component';
import { PortalDemoComponent } from '../portal-demo/portal-demo.component';
import { PortalDemo2Component } from '../portal-demo2/portal-demo2.component';

@Component({
  selector: 'app-dashboard-demo',
  templateUrl: './dashboard-demo.component.html',
  styleUrls: ['./dashboard-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IccDashboardComponent],
})
export class AppDashboardDemoComponent {
  tiles: IccTile<any>[] = [];
  tileOptions: IccTileOption<any>[] = [
    {
      name: 'stock-chart',
      component: AppStockChartComponent,
    },
    {
      name: 'grid-multi-row-selection',
      component: AppGridMultiRowSelectionComponent,
    },
    {
      name: 'grid-virtual-scroll',
      component: AppGridRemoteVirtualScrollComponent,
    },
    {
      name: 'portal-demo',
      component: PortalDemoComponent,
    },
    {
      name: 'portal-demo2',
      component: PortalDemo2Component,
    },
  ];

  portalData = {
    skills: [1, 2, 3, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  };

  portalData2 = {
    skills: [12, 13, 14, 15, 16],
  };

  constructor() {
    this.tiles = [
      {
        name: 'Card 1',
        title: 'test 987',
        rowStart: 4,
        rowHeight: 3,
        colStart: 1,
        colWidth: 10,
        //titeType: 'stock-chart',
        content: AppStockChartComponent,
      },
      {
        name: 'Card 2',
        rowStart: 1,
        rowHeight: 2,
        colStart: 1,
        colWidth: 2,
        portalName: 'portal-demo',
        context: this.portalData,
      },
      {
        name: 'Card 3',
        rowStart: 1,
        rowHeight: 1,
        colStart: 3,
        colWidth: 1,
        portalName: 'portal-demo2',
        context: this.portalData,
      },
      {
        name: 'Card 4',
        rowStart: 2,
        rowHeight: 1,
        colStart: 3,
        colWidth: 1,
        portalName: 'portal-demo',
        context: this.portalData2,
      },
      {
        name: 'Card 5',
        rowStart: 1,
        rowHeight: 3,
        colStart: 4,
        colWidth: 7,
        portalName: 'grid-multi-row-selection',
      },
    ];
  }
}
