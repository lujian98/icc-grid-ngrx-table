import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { IccMenuItem, IccMenuModule } from '@icc/ui/menu';
import { Observable } from 'rxjs';
import { IccGridFacade } from '../../../+state/grid.facade';
import { IccColumnConfig, IccGridConfig } from '../../../models/grid-column.model';

@Component({
  selector: 'icc-grid-column-menu',
  templateUrl: './grid-column-menu.component.html',
  styleUrls: ['./grid-column-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    IccMenuModule,
  ],
})
export class IccGridColumnMenuComponent {
  private gridFacade = inject(IccGridFacade);
  gridConfig$!: Observable<IccGridConfig>;
  columnsConfig$!: Observable<IccColumnConfig[]>;
  private _gridName!: string;

  @Input()
  set gridName(val: string) {
    this._gridName = val;
    this.gridConfig$ = this.gridFacade.selectGridConfig(this.gridName);
    this.columnsConfig$ = this.gridFacade.selectColumnsConfig(this.gridName);
  }
  get gridName(): string {
    return this._gridName;
  }
  @Input() column!: IccColumnConfig;

  getMenuItems(gridConfig: IccGridConfig, columns: IccColumnConfig[]): IccMenuItem[] {
    // TODO disable sort if columnSort or column each sort is disaled ??
    const menuItems = gridConfig.columnSort ? [{
      name: 'asc',
      title: 'Sort ASC',
      icon: 'arrow-up-short-wide',
    }, {
      name: 'desc',
      title: 'Sort DESC',
      icon: 'arrow-down-wide-short',
    }] : [];
    const columnItems = [...columns].map((column) => {
      return {
        name: column.name,
        title: column.title,
        checkbox: true,
        checked: !column.hidden,
        disabled: !gridConfig.columnHidden,
      }
    });
    return [...menuItems, ...columnItems];
  }

  /*

  getSortDisabled(gridConfig: IccGridConfig, dir: string): boolean {
    const sortField = this.findSortField(gridConfig);
    return (this.column.sortField === false) || (!!sortField && sortField.dir === dir);
  }

  private findSortField(gridConfig: IccGridConfig): IccSortField | undefined {
    return gridConfig.sortFields.find((field) => field.field === this.column.name);
  } */



  onMenuItemChange(item: IccMenuItem, columns: IccColumnConfig[]): void {
    if (item.name === 'asc' || item.name === 'desc') {
      this.columnSort(item.name);
    } else if (item.checkbox) {
      this.columnHideShow(item, columns);
    }
  }

  private columnSort(dir: string): void {
    const sort = {
      field: this.column.name,
      dir: dir,
    };
    this.gridFacade.setGridSortFields(this.gridName, [sort]);
  }

  private columnHideShow(item: IccMenuItem, columns: IccColumnConfig[]): void {
    const column = columns.find((col) => col.name === item.name)!;
    const col: IccColumnConfig = {
      ...column,
      hidden: !item.checked,
    };
    this.gridFacade.setGridColumnConfig(this.gridName, col);
  }
}
