import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'icc-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class IccLayoutHeaderComponent {}
