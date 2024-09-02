import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { IccMenuItem, IccMenuModule } from '@icc/ui/menu';
import { Observable, combineLatest, map } from 'rxjs';
import { IccGridFacade } from '../../../+state/grid.facade';
import {
  IccColumnConfig,
  IccGridConfig,
} from '../../../models/grid-column.model';

@Component({
  selector: 'icc-grid-column-menu',
  templateUrl: './grid-column-menu.component.html',
  styleUrls: ['./grid-column-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IccMenuModule],
})
export class IccGridColumnMenuComponent {
  private gridFacade = inject(IccGridFacade);
  columnMenus$!: Observable<[IccGridConfig, IccColumnConfig[]]>;
  private _gridName!: string;
  private gridConfig!: IccGridConfig;
  private columns!: IccColumnConfig[];
  private _menuItems: IccMenuItem[] = [];

  @Input()
  set gridName(val: string) {
    this._gridName = val;
    this.columnMenus$ = combineLatest([
      this.gridFacade.selectGridConfig(this.gridName),
      this.gridFacade.selectColumnsConfig(this.gridName),
    ]).pipe(
      map(([gridConfig, columns]) => {
        this.gridConfig = gridConfig;
        this.columns = columns;
        this.setMenuItems();
        return [gridConfig, columns];
      }),
    );
  }
  get gridName(): string {
    return this._gridName;
  }

  @Input() column!: IccColumnConfig;

  set menuItems(val: IccMenuItem[]) {
    this._menuItems = val;
  }
  get menuItems(): IccMenuItem[] {
    return this._menuItems;
  }

  private setMenuItems(): void {
    const menuItems = [
      {
        name: 'asc',
        title: 'Sort ASC',
        icon: 'arrow-up-short-wide',
        disabled: this.sortDisabled('asc'),
      },
      {
        name: 'desc',
        title: 'Sort DESC',
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
        disabled:
          !this.gridConfig.columnHidden || this.column.sortField === false,
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
    const sortField = this.gridConfig.sortFields.find(
      (field) => field.field === this.column.name,
    );
    return (
      !this.gridConfig.columnSort ||
      this.column.sortField === false ||
      (!!sortField && sortField.dir === dir)
    );
  }

  private columnSort(dir: string): void {
    const sort = {
      field: this.column.name,
      dir: dir,
    };
    this.gridFacade.setGridSortFields(this.gridName, [sort]);
  }

  private columnHideShow(item: IccMenuItem, columns: IccColumnConfig[]): void {
    const column = this.columns.find((col) => col.name === item.name)!;
    const col: IccColumnConfig = {
      ...column,
      hidden: !item.checked,
    };
    this.gridFacade.setGridColumnConfig(this.gridName, col);
  }
}
