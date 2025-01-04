import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { IccIconModule } from '@icc/ui/icon';
import { IccGridConfig } from '../../models/grid-column.model';
import { IccRowGroup } from '../../services/row-group/row-group';

@Component({
  selector: 'icc-grid-row-group',
  templateUrl: './grid-row-group.component.html',
  styleUrls: ['./grid-row-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IccIconModule],
})
export class IccGridRowGroupComponent<T> {
  @Input() gridConfig!: IccGridConfig;
  @Input() rowIndex!: number;
  private _record!: IccRowGroup;

  @Input()
  set record(data: IccRowGroup) {
    this._record = data;
  }
  get record(): IccRowGroup {
    return this._record;
  }

  get rowGroup(): string {
    return `${this.record.title}: ${this.record.value} (${this.record.displayedCounts})`;
  }

  toggleExpand(): void {
    this.record.expanded = !this.record.expanded;
    console.log(' this.record=', this.record);
  }

  @HostBinding('class.icc-grid-row')
  get iccGridRow() {
    return true;
  }
}
