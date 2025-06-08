import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IccGridCellRendererComponent } from '../grid-cell-renderer.component';

@Component({
  selector: 'icc-grid-cell-image',
  templateUrl: './grid-cell-image.component.html',
  styleUrls: ['./grid-cell-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IccGridCellImageComponent extends IccGridCellRendererComponent<string> {
  get rowHeight(): number {
    return this.gridConfig.rowHeight - 10;
  }
}
