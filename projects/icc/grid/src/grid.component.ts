import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IccColumnConfig } from './models/grid-column.model';

@Component({
  selector: 'icc-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IccGridComponent {
  @Input() gridName!: string;
  @Input() columnConfig: IccColumnConfig[] = [];

}
