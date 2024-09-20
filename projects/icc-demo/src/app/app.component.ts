import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IccAccordion, IccAccordionComponent } from '@icc/ui/accordion';
import { IccCheckboxComponent } from '@icc/ui/checkbox';
import { IccSelectFieldConfig, SelectFieldComponent, defaultSelectFieldConfig } from '@icc/ui/fields';
import { STATES } from './data/states';
import { IccIconModule } from '@icc/ui/icon';
import {
  IccLayoutCenterComponent,
  IccLayoutComponent,
  IccLayoutFooterComponent,
  IccLayoutHeaderComponent,
  IccLayoutSidebarComponent,
} from '@icc/ui/layout';
import { IccThemeService } from '@icc/ui/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
    IccCheckboxComponent,
    IccLayoutComponent,
    IccLayoutHeaderComponent,
    IccLayoutSidebarComponent,
    IccLayoutCenterComponent,
    IccLayoutFooterComponent,
    IccIconModule,
    IccAccordionComponent,
    SelectFieldComponent,
  ],
})
export class AppComponent {
  private themeService = inject(IccThemeService);
  title = 'icc-demo';
  states = STATES;
  fieldConfig: IccSelectFieldConfig = {
    ...defaultSelectFieldConfig,
    optionLabel: 'state',
    optionKey: 'abbr',
  };

  multiListStates = ['Louisiana', 'Nevada'];

  multiAllRemoteList: IccSelectFieldConfig = {
    ...defaultSelectFieldConfig,
    remoteConfig: true,
    urlKey: 'usa',
    fieldName: 'MultiAllRemoteList',
  };

  items: IccAccordion[] = [
    {
      name: 'Grid Demo',
      items: [
        { name: 'Default Grid', link: 'grid/app-default-grid' },
        { name: '1: Simple Grid', link: 'grid/remote-simple-grid' },
        { name: '2: Grid Sort', link: 'grid/remote-grid-sort' },
        { name: '3: Grid Filter', link: 'grid/remote-grid-filter' },
        {
          name: '4: Grid Column Resize',
          link: 'grid/remote-grid-column-resize',
        },
        {
          name: '5: Grid Column Reorder',
          link: 'grid/remote-grid-column-reorder',
        },
        { name: '6: Grid Column Menu', link: 'grid/remote-grid-column-menu' },
        {
          name: '7: Grid Column Hidden',
          link: 'grid/remote-grid-column-hidden',
        },
        {
          name: '8: Grid Remote Column Config',
          link: 'grid/remote-grid-remote-column-config',
        },
        {
          name: '9: Grid Row Seletion',
          link: 'grid/remote-grid-row-selection',
        },
        { name: '10: Grid Page', link: 'grid/remote-grid-page' },
        { name: '11: Grid Vertical Scroll', link: 'grid/remote-grid-vertical-scroll' },
        {
          name: '12: Grid Horizontal Scroll',
          link: 'grid/remote-grid-horizontal-scroll',
        },
        {
          name: '13: Grid Remote Virtual Scroll',
          link: 'grid/remote-grid-virtual-scroll',
        },
        { name: '14: Grid Overall', link: 'grid/remote-grid-overall' },
        { name: '15: Grid Remote Config All', link: 'grid/remote-grid-remote-config' },
        { name: '16: Grid Test 2', link: 'grid/grid-test2' },
        { name: '17: Grid In-Memory Virtual Scroll', link: 'grid/in-memory-grid-virtual-scroll' },
        {
          name: '18: Grid In-Memory Test',
          link: 'grid/in-memory-grid-test',
        },
      ],
    },
    {
      name: 'Select Demo',
      items: [{ name: 'Simple Select', link: 'select/simple-select' }],
    },
    {
      name: 'Form Page',
      items: [{ name: 'Simple Form', link: 'form/simple-form' }],
    },
    {
      name: 'D3 Demo',
      items: [
        { name: 'Line Chart', link: 'd3/line-chart' },
        { name: 'Line Chart Remote', link: 'd3/line-chart-remote' },
        { name: 'Multi Series Chart', link: 'd3/multi-series-chart' },
        { name: 'Area Chart', link: 'd3/area-chart' },
        { name: 'Stacked Area Chart', link: 'd3/stacked-area-chart' },
        { name: 'Stream Area Chart', link: 'd3/stream-area-chart' },

        { name: 'Bar Chart', link: 'd3/bar-chart' },
        { name: 'Historical Bar Chart', link: 'd3/historical-bar-chart' },
        { name: 'Grouped Bar Chart', link: 'd3/grouped-bar-chart' },
        { name: 'Stacked Bar Chart', link: 'd3/stacked-bar-chart' },
        { name: 'Linear Stacked Bar Chart', link: 'd3/linear-stacked-bar-chart' },

        { name: 'Horizontal Bar Chart', link: 'd3/horizontal-bar-chart' },
        { name: 'Grouped Horizontal Bar Chart', link: 'd3/grouped-horizontal-bar-chart' },
        { name: 'Stacked Horizontal Bar Chart', link: 'd3/stacked-horizontal-bar-chart' },
        { name: 'Stacked Normalized Horizontal Bar', link: 'd3/stacked-normalized-horizontal-bar-chart' },

        { name: 'Bullet Chart Demo', link: 'd3/bullet-chart-demo' },
        { name: 'Vertical Bullet Chart Demo', link: 'd3/vertical-bullet-chart-demo' },
      ],
    },
    {
      name: 'D3 Demos2',
      items: [
        { name: 'Pie Chart', link: 'd3/pie-chart-demo' },
        { name: 'Donut Chart', link: 'd3/donut-chart-demo' },
        { name: 'Radial Gauge Demo', link: 'd3/radial-gauge-demo' },
        { name: 'Radial Gauge Demo2', link: 'd3/radial-gauge-demo2' },
        { name: 'Candle Stick Bar Chart', link: 'd3/candle-stick-chart' },
        { name: 'CPI Inflation', link: 'd3/cpi-chart' },
        { name: 'SPY Stock', link: 'd3/stock-chart' },
        { name: 'Stock History Bar Chart', link: 'd3/stock-history-demo' },
      ],
    },
  ];

  toggleTheme(): void {
    this.themeService.changeTheme(this.themeService.currentTheme === 'light' ? 'dark' : 'light');
  }

  onCheckboxChange(event: any): void {
    console.log(' 999999 onCheckboxChange=', event);
  }
}
