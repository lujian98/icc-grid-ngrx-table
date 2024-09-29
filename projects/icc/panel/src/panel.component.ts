import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'icc-panel-header',
  template: ` <ng-content></ng-content> `,
  standalone: true,
  imports: [CommonModule],
})
export class IccPanelHeaderComponent {}

@Component({
  selector: 'icc-panel-top-bar',
  template: ` <ng-content></ng-content> `,
  standalone: true,
  imports: [CommonModule],
})
export class IccPanelTopBarComponent {}

@Component({
  selector: 'icc-panel-bottom-bar',
  template: ` <ng-content></ng-content> `,
  standalone: true,
  imports: [CommonModule],
})
export class IccPanelBottomBarComponent {}

@Component({
  selector: 'icc-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IccPanelHeaderComponent, IccPanelTopBarComponent, IccPanelBottomBarComponent],
})
export class IccPanelComponent {}
