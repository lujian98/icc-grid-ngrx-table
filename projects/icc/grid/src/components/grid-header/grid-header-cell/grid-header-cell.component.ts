import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { IccIconModule } from '@icc/ui/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { IccGridFacade } from '../../../+state/grid.facade';
import {
  ColumnMenuClick,
  IccColumnConfig,
  IccGridConfig,
  IccGridSetting,
  IccSortField,
} from '../../../models/grid-column.model';

@Component({
  selector: 'icc-grid-header-cell',
  templateUrl: './grid-header-cell.component.html',
  styleUrls: ['./grid-header-cell.component.scss'],
  host: {
    '[class.draggable]': 'draggable',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe, IccIconModule],
  providers: [IccGridFacade],
})
export class IccGridHeaderCellComponent {
  private readonly gridFacade = inject(IccGridFacade);
  column = input.required<IccColumnConfig>();
  gridSetting = input.required<IccGridSetting>();
  gridConfig = input.required<IccGridConfig>();
  columnMenuClick = output<ColumnMenuClick>();

  get title(): string {
    return this.column().title === undefined ? this.column().name : this.column().title!;
  }

  get findSortField(): IccSortField | undefined {
    return this.gridConfig().sortFields.find((field) => field.field === this.column().name);
  }

  get isSortField(): boolean {
    return this.column().sortField !== false && !!this.findSortField;
  }

  get sortDir(): string {
    return this.findSortField!.dir;
  }

  get draggable(): boolean {
    return this.gridConfig().columnReorder && this.column().draggable !== false;
  }

  headCellClick(event: MouseEvent): void {
    if (this.gridConfig().columnSort && this.column().sortField !== false) {
      let find = this.findSortField;
      let sort: IccSortField;
      if (find) {
        sort = { ...find };
        sort.dir = sort.dir === 'asc' ? 'desc' : 'asc';
      } else {
        sort = {
          field: this.column().name,
          dir: 'asc',
        };
      }
      this.gridFacade.setGridSortFields(this.gridConfig(), this.gridSetting(), [sort]);
    }
  }

  onClickColumnMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.columnMenuClick.emit({ column: this.column(), event: event });
  }
}
