import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IccGridCellRendererComponent } from '../grid-cell-renderer.component';

@Component({
  selector: 'icc-grid-cell-function',
  templateUrl: './grid-cell-function.component.html',
  styleUrls: ['./grid-cell-function.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class IccGridCellFunctionComponent extends IccGridCellRendererComponent<string> {
  get display(): string {
    return this.column.renderer!(this.data, this.column.name, this.column, this.record, this.rowIndex);
  }
}
