import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'icc-layout-header',
  template: ` <ng-content></ng-content> `,
  standalone: true,
  imports: [CommonModule],
})
export class IccLayoutHeaderComponent {}

@Component({
  selector: 'icc-layout-main',
  template: ` <ng-content></ng-content> `,
  standalone: true,
  imports: [CommonModule],
})
export class IccLayoutMainComponent {}

@Component({
  selector: 'icc-layout-sidebar',
  template: ` <ng-content></ng-content> `,
  standalone: true,
  imports: [CommonModule],
})
export class IccLayoutSidebarComponent {}

@Component({
  selector: 'icc-layout-center',
  template: ` <ng-content></ng-content> `,
  standalone: true,
  imports: [CommonModule],
})
export class IccLayoutCenterComponent {}

@Component({
  selector: 'icc-layout-footer',
  template: ` <ng-content></ng-content> `,
  standalone: true,
  imports: [CommonModule],
})
export class IccLayoutFooterComponent {}

@Component({
  selector: 'icc-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    IccLayoutHeaderComponent,
    IccLayoutMainComponent,
    IccLayoutSidebarComponent,
    IccLayoutCenterComponent,
    IccLayoutFooterComponent,
  ],
})
export class IccLayoutComponent {}
