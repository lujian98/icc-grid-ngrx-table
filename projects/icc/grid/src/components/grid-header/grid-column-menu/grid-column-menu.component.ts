import { ChangeDetectionStrategy, Component, effect, inject, Signal } from '@angular/core';
import { IccDisabled } from '@icc/ui/core';
import { IccMenuConfig, IccMenusComponent } from '@icc/ui/menu';
import { IccGridStateModule } from '../../../+state/grid-state.module';
import { IccGridFacade } from '../../../+state/grid.facade';
import { IccColumnConfig, IccGridConfig, IccGridSetting, IccRowGroupField } from '../../../models/grid-column.model';

@Component({
  selector: 'icc-grid-column-menu',
  templateUrl: './grid-column-menu.component.html',
  styleUrls: ['./grid-column-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IccGridStateModule, IccMenusComponent],
})
export class IccGridColumnMenuComponent {
  private readonly gridFacade = inject(IccGridFacade);
  private _gridId!: string;
  level = 0;
  gridConfig$!: Signal<IccGridConfig>;
  gridSetting$!: Signal<IccGridSetting>;
  columns$!: Signal<IccColumnConfig[]>;

  set gridId(val: string) {
    this._gridId = val;
    if (!this.gridConfig$) {
      this.gridConfig$ = this.gridFacade.getGridConfig(this.gridId);
    }
    if (!this.gridSetting$) {
      this.gridSetting$ = this.gridFacade.getSetting(this.gridId);
    }
    if (!this.columns$) {
      this.columns$ = this.gridFacade.getColumnsConfig(this.gridId);
    }
  }
  get gridId(): string {
    return this._gridId;
  }
  column!: IccColumnConfig;
  menuItems: IccMenuConfig[] = [];
  values: { [key: string]: boolean } = {};
  disabled: IccDisabled[] = [];

  constructor() {
    effect(() => {
      if (this.columns$()) {
        if (this.menuItems.length === 0) {
          this.setMenuItems();
        }
        this.setDisabledMenu();
      }
    });
  }

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
    const columnItems = [...this.columns$()].map((column) => {
      return {
        name: column.name,
        title: column.title,
        keepOpen: true,
        checkbox: true,
        checked: !column.hidden,
        disabled: !this.gridConfig$().columnHidden || this.column.sortField === false,
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
    this.menuItems = [...menuItems];
  }

  onMenuFormChanges(values: { [key: string]: boolean }): void {
    this.columnHideShow(values, this.columns$());
  }

  onMenuItemClick(item: IccMenuConfig): void {
    if (item.name === 'asc' || item.name === 'desc') {
      this.columnSort(item.name);
    } else if (item.name === 'groupBy') {
      const rowGroupField: IccRowGroupField = {
        field: this.column.name,
        dir: 'asc',
      };
      this.gridFacade.setGridGroupBy(this.gridId, this.gridConfig$(), rowGroupField);
    } else if (item.name === 'unGroupBy') {
      this.gridFacade.setGridUnGroupBy(this.gridId, this.gridConfig$());
    }
  }

  private groupByDisabled(): boolean {
    const rowGroupField = this.gridConfig$().rowGroupField;
    return (
      !this.gridConfig$().rowGroup ||
      this.column.groupField === false ||
      !!(rowGroupField && rowGroupField.field === this.column.name)
    );
  }

  private unGroupByDisabled(): boolean {
    return !this.gridConfig$().rowGroupField;
  }

  private sortDisabled(dir: string): boolean {
    const sortField = this.gridConfig$().sortFields.find((field) => field.field === this.column.name);
    return !this.gridConfig$().columnSort || this.column.sortField === false || (!!sortField && sortField.dir === dir);
  }

  private columnSort(dir: string): void {
    const sort = {
      field: this.column.name,
      dir: dir,
    };
    this.gridFacade.setGridSortFields(this.gridConfig$(), this.gridSetting$(), [sort]);
  }

  private columnHideShow(values: { [key: string]: boolean }, columns: IccColumnConfig[]): void {
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
      this.gridFacade.setGridColumnConfig(this.gridId, col);
    }
  }
}
