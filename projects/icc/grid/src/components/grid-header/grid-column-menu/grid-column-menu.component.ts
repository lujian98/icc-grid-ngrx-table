import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IccCheckboxModule } from '@icc/ui/checkbox';
import { IccGridFacade } from '../../../+state/grid.facade';
import { IccColumnConfig, IccGridConfig } from '../../../models/grid-column.model';

@Component({
  selector: 'sun-grid-column-menu',
  templateUrl: './grid-column-menu.component.html',
  styleUrls: ['./grid-column-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    IccCheckboxModule,
  ],
})
export class IccGridColumnMenuComponent {
  private gridFacade = inject(IccGridFacade);
  columnConfig$!: Observable<IccColumnConfig[]>;
  private _gridConfig!: IccGridConfig;

  @Input()
  set gridConfig(val: IccGridConfig) {
    this._gridConfig = val;
    this.columnConfig$ = this.gridFacade.selectColumnConfig(val.gridName);
  }
  get gridConfig(): IccGridConfig {
    return this._gridConfig;
  }
  @Input() column!: IccColumnConfig;

  getTitle(column: IccColumnConfig): string {
    return column.title === undefined ? column.name : column.title;
  }

  columnSort(dir: string): void {
    const sort = {
      field: this.column.name,
      dir: dir,
    };
    this.gridFacade.setGridSortField(this.gridConfig.gridName, [sort]);
  }


  /*
    headCellClick(): void {
    let find = this.findSortField;
    let sort: IccSortField;
    if (find) {
      sort = { ...find };
      sort.dir = sort.dir === 'asc' ? 'desc' : 'asc';
    } else {
      sort = {
        field: this.column.name,
        dir: 'asc'
      };
    }
    this.gridFacade.setGridSortField(this.gridConfig.gridName, [sort]);
  }
  */

  columnHideShow(column: IccColumnConfig): void {
    const col: IccColumnConfig = {
      ...column,
      hidden: column.hidden ? false: true,
    };
    //console.log('col=', col );
    this.gridFacade.setGridColumnHiddenShow(this.gridConfig.gridName, col);
  }
}
