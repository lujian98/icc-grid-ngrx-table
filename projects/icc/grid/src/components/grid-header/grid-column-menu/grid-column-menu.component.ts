import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { IccMenuItem, IccMenuComponent } from '@icc/ui/menu';
import { Observable, combineLatest, map } from 'rxjs';
import { IccGridFacade } from '../../../+state/grid.facade';
import { IccGridStateModule } from '../../../+state/grid-state.module';
import { IccColumnConfig, IccGridConfig } from '../../../models/grid-column.model';

@Component({
  selector: 'icc-grid-column-menu',
  templateUrl: './grid-column-menu.component.html',
  styleUrls: ['./grid-column-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IccGridStateModule, IccMenuComponent],
})
export class IccGridColumnMenuComponent {
  private gridFacade = inject(IccGridFacade);
  columnMenus$!: Observable<[IccGridConfig, IccColumnConfig[]]>;
  private _gridId!: string;
  private gridConfig!: IccGridConfig;
  private columns!: IccColumnConfig[];
  private _menuItems: IccMenuItem[] = [];

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
        this.setMenuItems();
        return [gridConfig, columns];
      }),
    );
  }
  get gridId(): string {
    return this._gridId;
  }

  @Input() column!: IccColumnConfig;

  set menuItems(val: IccMenuItem[]) {
    this._menuItems = [...val];
  }
  get menuItems(): IccMenuItem[] {
    return this._menuItems;
  }

  private setMenuItems(): void {
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
    ];
    const columnItems = [...this.columns].map((column) => {
      return {
        name: column.name,
        title: column.title,
        checkbox: true,
        checked: !column.hidden,
        disabled: !this.gridConfig.columnHidden || this.column.sortField === false,
      };
    });
    this.menuItems = [...menuItems, ...columnItems];
  }

  onMenuItemChange(item: IccMenuItem): void {
    if (item.name === 'asc' || item.name === 'desc') {
      this.columnSort(item.name);
    } else if (item.checkbox) {
      this.columnHideShow(item, this.columns);
    }
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

  private columnHideShow(item: IccMenuItem, columns: IccColumnConfig[]): void {
    const column = this.columns.find((col) => col.name === item.name)!;
    const col: IccColumnConfig = {
      ...column,
      hidden: !item.checked,
    };
    this.gridFacade.setGridColumnConfig(this.gridConfig, col);
  }
}
