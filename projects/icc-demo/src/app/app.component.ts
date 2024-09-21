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
  IccLayoutMainComponent,
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
    IccLayoutMainComponent,
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

  gridUrl = `grid`;
  d3Url = `d3`;
  formUrl = `form`;
  selectUrl = `select`;

  items: IccAccordion[] = [
    {
      name: 'Form Page',
      items: [{ name: 'Simple Form', link: 'form/simple-form' }],
    },
  ];

  toggleTheme(): void {
    this.themeService.changeTheme(this.themeService.currentTheme === 'light' ? 'dark' : 'light');
  }

  onCheckboxChange(event: any): void {
    console.log(' 999999 onCheckboxChange=', event);
  }
}
