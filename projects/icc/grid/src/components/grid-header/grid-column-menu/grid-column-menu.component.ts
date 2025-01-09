import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { IccDisabled } from '@icc/ui/core';
import { IccMenuItem, IccMenusComponent } from '@icc/ui/menu';
import { Observable, combineLatest, map } from 'rxjs';
import { IccGridStateModule } from '../../../+state/grid-state.module';
import { IccGridFacade } from '../../../+state/grid.facade';
import { IccColumnConfig, IccGridConfig, IccRowGroupField } from '../../../models/grid-column.model';

@Component({
  selector: 'icc-grid-column-menu',
  templateUrl: './grid-column-menu.component.html',
  styleUrls: ['./grid-column-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IccGridStateModule, IccMenusComponent],
})
export class IccGridColumnMenuComponent {
  private gridFacade = inject(IccGridFacade);
  private _gridId!: string;
  private gridConfig!: IccGridConfig;
  private columns!: IccColumnConfig[];

  columnMenus$!: Observable<[IccGridConfig, IccColumnConfig[]]>;
  level = 0;

  @Input()
  set gridId(val: string) {
    this._gridId = val;
    this.columnMenus$ = combineLatest([
      this.gridFacade.selectGridConfig(this.gridId),
      this.gridFacade.selectColumnsConfig(this.gridId),
    ]).pipe(
      map(([gridConfig, columns]) => {
        this.gridConfig = gridConfig;
        this.columns = columns;
        if (this.menuItems.length === 0) {
          this.setMenuItems();
        }
        this.setDisabledMenu();
        return [gridConfig, columns];
      }),
    );
  }
  get gridId(): string {
    return this._gridId;
  }

  @Input() column!: IccColumnConfig;
  @Input() menuItems: IccMenuItem[] = [];
  @Input() values: any[] = [];
  @Input() disabled: IccDisabled[] = [];

  private setDisabledMenu(): void {
    this.disabled = [
      {
        name: 'asc',
        disabled: this.sortDisabled('asc'),
      },
      {
        name: 'desc',
        disabled: this.sortDisabled('desc'),
      },
      {
        name: 'groupBy',
        disabled: this.groupByDisabled(),
      },
      {
        name: 'unGroupBy',
        disabled: this.unGroupByDisabled(),
      },
      {
        name: 'columns',
        disabled: false,
      },
    ];
  }

  private setMenuItems(): void {
    const columnItems = [...this.columns].map((column) => {
      return {
        name: column.name,
        title: column.title,
        checkbox: true,
        checked: !column.hidden,
        disabled: !this.gridConfig.columnHidden || this.column.sortField === false,
      };
    });
    const menuItems = [
      {
        name: 'asc',
        title: 'ICC.UI.GRID.SORT_ASCENDING',
        icon: 'arrow-up-short-wide',
        disabled: this.sortDisabled('asc'),
      },
      {
        name: 'desc',
        title: 'ICC.UI.GRID.SORT_DESCENDING',
        icon: 'arrow-down-wide-short',
        disabled: this.sortDisabled('desc'),
      },
      {
        name: 'groupBy',
        title: 'ICC.UI.GRID.GROUP_BY_THIS_FIELD',
        icon: 'arrow-down-wide-short',
        disabled: this.groupByDisabled(),
      },
      {
        name: 'unGroupBy',
        title: 'ICC.UI.GRID.UNGROUP',
        icon: 'arrow-down-wide-short',
        disabled: this.unGroupByDisabled(),
      },
      {
        name: 'columns',
        title: 'ICC.UI.GRID.COLUMNS',
        children: columnItems,
      },
    ];
    this.menuItems = [...menuItems]; // ...columnItems
  }

  onMenuFormChanges(values: any): void {
    this.columnHideShow(values, this.columns);
  }

  onMenuItemClick(item: IccMenuItem): void {
    if (item.name === 'asc' || item.name === 'desc') {
      this.columnSort(item.name);
    } else if (item.name === 'groupBy') {
      const rowGroupField: IccRowGroupField = {
        field: this.column.name,
        dir: 'asc',
      };
      this.gridFacade.setGridGroupBy(this.gridConfig, rowGroupField);
    } else if (item.name === 'unGroupBy') {
      this.gridFacade.setGridUnGroupBy(this.gridConfig);
    }
  }

  private groupByDisabled(): boolean {
    const rowGroupField = this.gridConfig.rowGroupField;
    return (
      !this.gridConfig.rowGroup ||
      this.column.groupField === false ||
      !!(rowGroupField && rowGroupField.field === this.column.name)
    );
  }

  private unGroupByDisabled(): boolean {
    return !this.gridConfig.rowGroupField;
  }

  private sortDisabled(dir: string): boolean {
    const sortField = this.gridConfig.sortFields.find((field) => field.field === this.column.name);
    return !this.gridConfig.columnSort || this.column.sortField === false || (!!sortField && sortField.dir === dir);
  }

  private columnSort(dir: string): void {
    const sort = {
      field: this.column.name,
      dir: dir,
    };
    this.gridFacade.setGridSortFields(this.gridConfig, [sort]);
  }

  private columnHideShow(values: any, columns: IccColumnConfig[]): void {
    const column = columns.find((col) => {
      const checked = values[col.name];
      const colChecked = !col.hidden;
      return checked !== undefined && checked !== colChecked;
    })!;
    if (column) {
      const col: IccColumnConfig = {
        ...column,
        hidden: !values[column.name],
      };
      this.gridFacade.setGridColumnConfig(this.gridConfig, col);
    }
  }
}
