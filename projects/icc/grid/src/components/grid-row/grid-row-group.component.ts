import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output, inject } from '@angular/core';
import { IccIconModule } from '@icc/ui/icon';
import { TranslateModule } from '@ngx-translate/core';
import { IccColumnConfig, IccGridConfig } from '../../models/grid-column.model';
import { IccRowGroup } from '../../services/row-group/row-group';
import { IccGridFacade } from '../../+state/grid.facade';

@Component({
  selector: 'icc-grid-row-group',
  templateUrl: './grid-row-group.component.html',
  styleUrls: ['./grid-row-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TranslateModule, IccIconModule],
})
export class IccGridRowGroupComponent<T> {
  private gridFacade = inject(IccGridFacade);
  private _record!: IccRowGroup;

  @Input() gridConfig!: IccGridConfig;
  @Input() columns: IccColumnConfig[] = [];
  @Input() rowIndex!: number;

  @Input()
  set record(data: T | IccRowGroup) {
    if (data instanceof IccRowGroup) {
      this._record = data;
    }
  }
  get record(): IccRowGroup {
    return this._record;
  }

  get title(): string {
    const column = this.columns.find((item) => item.name === this.record.field)!;
    return column.title || column.name;
  }

  @Output() onToggleRowGroup = new EventEmitter<IccRowGroup>();

  toggleRowGroup(): void {
    this.record.expanded = !this.record.expanded;
    this.gridFacade.setToggleRowGroup(this.gridConfig, this.record);
    this.onToggleRowGroup.emit(this.record);
  }

  @HostBinding('class.icc-grid-row')
  get iccGridRow() {
    return true;
  }
}
