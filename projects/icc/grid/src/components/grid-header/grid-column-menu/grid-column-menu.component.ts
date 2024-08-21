import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Input, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IccCheckboxModule } from '@icc/ui/checkbox';
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
    IccCheckboxModule,
  ],
})
export class IccGridColumnMenuComponent {
  private gridFacade = inject(IccGridFacade);
  gridConfig$!: Observable<IccGridConfig>;
  columnConfig$!: Observable<IccColumnConfig[]>;
  private _gridName!: string;

  @Input()
  set gridName(val: string) {
    this._gridName = val;
    this.gridConfig$ = this.gridFacade.selectGridConfig(this.gridName);
    this.columnConfig$ = this.gridFacade.selectColumnConfig(this.gridName);
  }
  get gridName(): string {
    return this._gridName;
  }
  @Input() column!: IccColumnConfig;

  getTitle(column: IccColumnConfig): string {
    return column.title === undefined ? column.name : column.title;
  }

  getSortDisabled(gridConfig: IccGridConfig, dir: string): boolean {
    const sortField = this.findSortField(gridConfig);
    return (this.column.sortField===false) || (!!sortField && sortField.dir === dir);
  }

  private findSortField(gridConfig: IccGridConfig): IccSortField | undefined {
    return gridConfig.sortFields.find((field) => field.field === this.column.name);
  }

  columnSort(dir: string): void {
    const sort = {
      field: this.column.name,
      dir: dir,
    };
    this.gridFacade.setGridSortField(this.gridName, [sort]);
  }

  columnHideShow(column: IccColumnConfig): void {
    const col: IccColumnConfig = {
      ...column,
      hidden: column.hidden ? false: true,
    };
    this.gridFacade.setGridColumnConfig(this.gridName, col);
  }
}
