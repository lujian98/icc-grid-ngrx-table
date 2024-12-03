import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Tile, getColor, IccDashboardComponent } from '@icc/ui/dashboard';

import { PortalDemoComponent } from '../portal-demo/portal-demo.component';
import { PortalDemo2Component } from '../portal-demo2/portal-demo2.component';

@Component({
  selector: 'app-dashboard-demo',
  templateUrl: './dashboard-demo.component.html',
  styleUrls: ['./dashboard-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
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
        rowStart: 1,
        rowHeight: 1,
        colStart: 1,
        colWidth: 4,
        color: getColor(),
        content: PortalDemo2Component,
        context: this.portalData,
      },
      {
        name: 'Card 2',
        rowStart: 2,
        rowHeight: 2,
        colStart: 1,
        colWidth: 2,
        color: getColor(),
        content: PortalDemoComponent,
        context: this.portalData2,
      },
      { name: 'Card 3', rowStart: 2, rowHeight: 1, colStart: 3, colWidth: 1, color: getColor() },
      { name: 'Card 4', rowStart: 3, rowHeight: 1, colStart: 3, colWidth: 1, color: getColor() },
      {
        name: 'Card 5',
        rowStart: 3,
        rowHeight: 1,
        colStart: 5,
        colWidth: 2,
        color: getColor(),
        content: PortalDemoComponent,
        context: this.portalData,
      },
    ];

    console.log(' this.tiles =', this.tiles);
  }
}
