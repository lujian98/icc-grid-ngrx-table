import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'icc-grid-header-item',
  template: '<ng-content></ng-content>',
  styleUrls: ['./grid-header-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IccGridHeaderItemComponent {}
