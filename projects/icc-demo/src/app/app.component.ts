import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  IccLayoutComponent,
  IccLayoutFooterComponent,
  IccLayoutHeaderComponent,
  IccLayoutMainComponent,
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
    IccLayoutComponent,
    IccLayoutMainComponent,
    IccLayoutHeaderComponent,
    IccLayoutFooterComponent,
  ],
})
export class AppComponent {
  themeService = inject(IccThemeService);
  title = 'icc-demo';

  gridUrl = `grid`;
  d3Url = `d3`;
  formUrl = `form`;
  selectUrl = `select`;

  rangeValue = this.themeService.rangeMax;
  toggleTheme(): void {
    this.themeService.changeTheme(this.themeService.currentTheme === 'light' ? 'dark' : 'light');
    this.rangeValue = this.themeService.rangeMax;
    console.log(' this.rangeValue=', this.rangeValue);
  }

  onChange(event: any): void {
    const value: number = event.target.value;
    this.themeService.setBackgroundColor(value);
  }
}
