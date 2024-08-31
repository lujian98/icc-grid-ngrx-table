import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
//import { IccCheckboxModule } from '@icc/ui/checkbox';
import { Observable } from 'rxjs';
import { IccMenuModule, IccMenuItem, IccMenuItemComponent } from '@icc/ui/menu';
import { IccGridFacade } from '../../../+state/grid.facade';
import { IccColumnConfig, IccGridConfig, IccSortField } from '../../../models/grid-column.model';

@Component({
  selector: 'icc-grid-column-menu',
  templateUrl: './grid-column-menu.component.html',
  styleUrls: ['./grid-column-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    IccMenuItemComponent,
    IccMenuModule,
    //IccCheckboxModule,
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

  getTitle(column: IccColumnConfig): string {
    return column.title === undefined ? column.name : column.title;
  }

  get sortItems(): IccMenuItem[] {
    return [{
      name: 'asc',
      title: 'Sort ASC',
      icon: 'arrow-up-short-wide',
    }, {
      name: 'desc',
      title: 'Sort DESC',
      icon: 'arrow-down-wide-short',
    }];
  }

  getSortDisabled(gridConfig: IccGridConfig, dir: string): boolean {
    const sortField = this.findSortField(gridConfig);
    return (this.column.sortField === false) || (!!sortField && sortField.dir === dir);
  }

  private findSortField(gridConfig: IccGridConfig): IccSortField | undefined {
    return gridConfig.sortFields.find((field) => field.field === this.column.name);
  }

  columnSort(dir: string): void {
    const sort = {
      field: this.column.name,
      dir: dir,
    };
    this.gridFacade.setGridSortFields(this.gridName, [sort]);
  }

  getColumnItems(columns: IccColumnConfig[]): IccMenuItem[] {
    return [...columns].map((column) => {
      return {
        name: column.name,
        title: column.title,
        checkbox: true,
        checked: !column.hidden,
      }
    })
  }

  columnHideShow(item: IccMenuItem, columns: IccColumnConfig[]): void {
    const column = columns.find((col) => col.name === item.name)!;
    //console.log('3333333 item=', item)
    const col: IccColumnConfig = {
      ...column,
      hidden: !item.checked,
    };
    this.gridFacade.setGridColumnConfig(this.gridName, col);
  }
}
