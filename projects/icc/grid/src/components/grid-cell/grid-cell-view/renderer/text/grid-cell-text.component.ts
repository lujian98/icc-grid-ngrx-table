import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IccGridCellRendererComponent } from '../grid-cell-renderer.component';

@Component({
  selector: 'icc-grid-cell-text',
  templateUrl: './grid-cell-text.component.html',
  styleUrls: ['./grid-cell-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IccGridCellTextComponent extends IccGridCellRendererComponent<string> {}
