import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IccGridCellRendererComponent } from '../grid-cell-renderer.component';

@Component({
  selector: 'icc-grid-cell-select',
  templateUrl: './grid-cell-select.component.html',
  styleUrls: ['./grid-cell-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class IccGridCellSelectComponent<T> extends IccGridCellRendererComponent<T> {}
