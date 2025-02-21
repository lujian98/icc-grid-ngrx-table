import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IccGridCellRendererComponent } from '../grid-cell-renderer.component';

@Component({
  selector: 'icc-grid-cell-number',
  templateUrl: './grid-cell-number.component.html',
  styleUrls: ['./grid-cell-number.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class IccGridCellNumberComponent extends IccGridCellRendererComponent<number> {}
