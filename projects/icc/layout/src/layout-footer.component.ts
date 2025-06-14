import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'icc-layout-footer-start',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IccLayoutFooterStartComponent {}

@Component({
  selector: 'icc-layout-footer-center',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IccLayoutFooterCenterComponent {}

@Component({
  selector: 'icc-layout-footer-end',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IccLayoutFooterEndComponent {}

@Component({
  selector: 'icc-layout-footer',
  templateUrl: './layout-footer.component.html',
  styleUrls: ['./layout-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IccLayoutFooterComponent {}
