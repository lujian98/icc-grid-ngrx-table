import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IccGridCellRendererComponent } from '../grid-cell-renderer.component';

@Component({
  selector: 'icc-grid-cell-image',
  templateUrl: './grid-cell-image.component.html',
  styleUrls: ['./grid-cell-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IccGridCellRendererComponent],
})
export class IccGridCellImageComponent<T> extends IccGridCellRendererComponent<T> {
  get rowHeight(): number {
    return this.gridConfig.rowHeight - 10;
  }
}
