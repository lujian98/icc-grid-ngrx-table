import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IccGridCellRendererComponent } from '../grid-cell-renderer.component';

@Component({
  selector: 'icc-grid-cell-text',
  templateUrl: './grid-cell-text.component.html',
  styleUrls: ['./grid-cell-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class IccGridCellTextComponent<T> extends IccGridCellRendererComponent<T> {}
