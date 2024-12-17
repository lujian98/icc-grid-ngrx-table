import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject, ChangeDetectorRef } from '@angular/core';
import { IccMenuItem, IccMenusComponent } from '@icc/ui/menu';
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
  imports: [CommonModule, IccGridStateModule, IccMenusComponent],
})
export class IccGridColumnMenuComponent {
  private changeDetectorRef = inject(ChangeDetectorRef);

  private gridFacade = inject(IccGridFacade);
  columnMenus$!: Observable<[IccGridConfig, IccColumnConfig[]]>;
  private _gridId!: string;
  private gridConfig!: IccGridConfig;
  private columns!: IccColumnConfig[];
  private _menuItems: IccMenuItem[] = [];
  private _values: any;

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
        } else {
          this.checkColumnHidden();
        }
        return [gridConfig, columns];
      }),
    );
  }
  get gridId(): string {
    return this._gridId;
  }

  @Input() column!: IccColumnConfig;

  private _disabled!: any;

  @Input()
  set disabled(disabled: any) {
    // this._disabled = [...disabled];
    //console.log(' 777777777777  this._disable=', disabled)
    //this.changeDetectorRef.markForCheck();
  }

  get disabled(): any {
    //console.log(' 88888888888  this._disable=', this.disabled)

    const disabled = [...this.columns].map((column) => {
      return {
        [column.name]: !this.gridConfig.columnHidden || this.column.sortField === false,
      };
    });
    // console.log(' 9999999999999988888888  this._disable=', this.disabled)
    return disabled;
  }

  get checked(): any {
    // [column.name]: !this.gridConfig.columnHidden || this.column.sortField === false,

    console.log(' 9999999999999988888888 this.columns=', this.columns);
    const checked = [...this.columns].map((column) => {
      return {
        [column.name]: !column.hidden,
      };
    });
    console.log(' 9999999999999988888888  this._disable=', checked);
    return checked;
  }

  @Input()
  set values(values: any) {
    this._values = values;
  }
  get values(): any {
    return this._values;
  }

  set menuItems(val: IccMenuItem[]) {
    this._menuItems = [...val];
  }
  get menuItems(): IccMenuItem[] {
    return this._menuItems;
  }

  private checkColumnHidden(): void {
    /*
    const checked = [...this.columns].map((column) => {
      return {
        [column.name]: !this.gridConfig.columnHidden || this.column.sortField === false,
      };
    });
    console.log(' yyyyyyyyyy this.checked=', this.checked)
    console.log(' yyyyyyyyyythis.columns=', this.columns)
    this.changeDetectorRef.markForCheck();
    */
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
