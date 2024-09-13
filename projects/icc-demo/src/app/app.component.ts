import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IccAccordion, IccAccordionComponent } from '@icc/ui/accordion';
import { IccCheckboxComponent } from '@icc/ui/checkbox';
import { IccSelectFieldConfig, SelectFieldComponent, defaultSelectFieldConfig } from '@icc/ui/form-field';
import { STATES } from '@icc/ui/form-field/src/fields/select-field/spec-helpers/states';
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
      name: 'Grid Remote Data',
      items: [
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
      name: 'Select Demos',
      items: [{ name: 'Simple Select', link: 'select/simple-select' }],
    },
  ];

  toggleTheme(): void {
    this.themeService.changeTheme(this.themeService.currentTheme === 'light' ? 'dark' : 'light');
  }

  onCheckboxChange(event: any): void {
    console.log(' 999999 onCheckboxChange=', event);
  }
}
