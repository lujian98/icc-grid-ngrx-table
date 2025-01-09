import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Tile, getColor, IccDashboardComponent } from '@icc/ui/dashboard';

import { PortalDemoComponent } from '../portal-demo/portal-demo.component';
import { PortalDemo2Component } from '../portal-demo2/portal-demo2.component';
import { AppStockChartComponent } from '../../../d3/demos/stock-charts/stock-chart.component';
//import { AppDefaultGridComponent } from '../../../grid/in-memory-data/default-grid.component';
import { AppGridRemoteVirtualScrollComponent } from '../../../grid/remote-data/grid-virtual-scroll.component';

@Component({
  selector: 'app-dashboard-demo',
  templateUrl: './dashboard-demo.component.html',
  styleUrls: ['./dashboard-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IccDashboardComponent],
})
export class AppDashboardDemoComponent {
  tiles: Tile<any>[] = [];

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
        //color: '#e8eaed',
        //color: getColor(),
        content: AppStockChartComponent,
        context: this.portalData,
        dblClickDrag: true,
      },
      {
        name: 'Card 2',
        rowStart: 1,
        rowHeight: 2,
        colStart: 1,
        colWidth: 2,
        //color: getColor(),
        content: PortalDemoComponent,
        context: this.portalData,
      },
      {
        name: 'Card 3',
        rowStart: 1,
        rowHeight: 1,
        colStart: 3,
        colWidth: 1,
        //color: getColor(),
        content: PortalDemo2Component,
      },
      {
        name: 'Card 4',
        rowStart: 2,
        rowHeight: 1,
        colStart: 3,
        colWidth: 1,
        //color: getColor(),
        content: PortalDemoComponent,
        context: this.portalData2,
      },
      {
        name: 'Card 5',
        rowStart: 1,
        rowHeight: 3,
        colStart: 4,
        colWidth: 7,
        content: AppGridRemoteVirtualScrollComponent,
        //color: getColor(),
      },
    ];

    console.log(' this.tiles =', this.tiles);
  }
}
