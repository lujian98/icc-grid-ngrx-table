import { DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, skip, switchMap, takeUntil } from 'rxjs/operators';
import { IccGridFacade } from '../+state/grid.facade';
import { DragDropEvent } from '../models/drag-drop-event';
import { IccColumnConfig, IccColumnWidth, IccGridConfig, IccGridData } from '../models/grid-column.model';
import { IccGridHeaderItemComponent } from './grid-header/grid-header-item/grid-header-item.component';
import { IccGridHeaderComponent } from './grid-header/grid-header.component';
import { IccGridViewportComponent } from './grid-viewport/grid-viewport.component';
import { IccRowSelectComponent } from './row-select/row-select.component';

@Component({
  selector: 'icc-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    IccGridHeaderComponent,
    IccGridHeaderItemComponent,
    IccGridViewportComponent,
    IccRowSelectComponent,
  ],
})
export class IccGridViewComponent<T> {
  private gridFacade = inject(IccGridFacade);
  private _gridConfig!: IccGridConfig;
  private _columns: IccColumnConfig[] = [];
  private _columnWidths: IccColumnWidth[] = [];
  gridData$!: Observable<T[]>;
  //columnResized$: BehaviorSubject<any> = new BehaviorSubject({});

  @Input()
  set columns(val: IccColumnConfig[]) {
    this._columns = val;
    this.setColumWidths();
  }
  get columns(): IccColumnConfig[] {
    return this._columns;
  }

  @Input()
  set gridConfig(val: IccGridConfig) {
    this._gridConfig = val;
    if (!this.columns || this.columns.length === 0) {
      this.gridFacade.setupGridColumnsConfig(this.gridConfig.gridName, []);
    }
    this.gridData$ = this.gridFacade.selectGridData(val.gridName);
    this.setColumWidths();
  }
  get gridConfig(): IccGridConfig {
    return this._gridConfig;
  }

  @Input()
  set gridData(data: IccGridData<T>) { // TODO set local data here
    if (data) { // use set getGridDataSuccess ??
      //this.gridFacade.getGridData(this.gridConfig.gridName, data);
    }
  }

  get totalWidth(): number {
    return this.columns
      .filter((column) => !column.hidden)
      .map((column) => (column.width || 100))
      .reduce((prev, curr) => prev + curr, 0);
  }

  get widthRatio(): number {
    const viewportWidth = this.gridConfig.viewportWidth - (this.gridConfig.rowSelection ? 40 : 0);
    return viewportWidth / this.totalWidth;
  }

  set columnWidths(values: IccColumnWidth[]) {
    this._columnWidths = values;
  }

  get columnWidths(): IccColumnWidth[] {
    return this._columnWidths;
  }

  constructor() {
    /*
    this.columnResized$
      .pipe(
        skip(1),
        debounceTime(100),
        distinctUntilChanged(),
        switchMap((column) => {
          return of(column).pipe(takeUntil(this.columnResized$.pipe(skip(1))));
        })
      )
      .subscribe((column) => {
        this.gridFacade.setGridColumnConfig(this.gridConfig.gridName, column);
        // window.dispatchEvent(new Event('resize'));
      });
*/
  }

  onColumnResizing(events: IccColumnWidth): void {
    this.columnWidths = this.getResizeColumnWidths(events);
  }

  onColumnResized(events: IccColumnWidth): void {
    this.columnWidths = this.getResizeColumnWidths(events);
    const columns: IccColumnConfig[] = [...this.columns].map((column, index)=>{
      return {
        ...column,
        width: this.columnWidths[index].width / this.widthRatio,
      }
    });
    this.gridFacade.setGridColumnsConfig(this.gridConfig.gridName, columns);
  }

  private setColumWidths(): void {
    this.columnWidths = [...this.columns].map((column) => ({
      name: column.name,
      width: this.widthRatio * column.width!,
    }));
  }

  private getResizeColumnWidths(events: IccColumnWidth): IccColumnWidth[] {
    const column = this.columnWidths.find((item) => item.name === events.name);
    let dx = (events.width - column!.width);
    const index = this.columnWidths.findIndex((item) => item.name === column?.name);
    if(events.width < 100 || (this.columnWidths[index+1].width - dx) < 100) {
      dx = 0;
    }
   // console.log( ' ')
    return [...this.columnWidths].map((column, idx) => {
      let width = column.width!;
      if (idx == index) {
        width = column.width! + dx;
      } else if (idx == index + 1) {
        width = column.width! - dx;
      }
      /*
      if(width <100) {
        width = 100;
      }*/
      return {
        name: column.name,
        width: width!,
      }
    });
  }

  onColumnDragDrop(events: DragDropEvent): void {
    const previousIndex = this.indexCorrection(events.previousIndex);
    const currentIndex = this.indexCorrection(events.currentIndex);
    const columns = [...this.columns];
    moveItemInArray(columns, previousIndex, currentIndex);
    this.gridFacade.setGridColumnsConfig(this.gridConfig.gridName, columns);
  }

  private indexCorrection(idx: number): number {
    this.columns.forEach((column, index) => {
      if (column.hidden && idx >= index) {
        idx++;
      }
    });
    return idx;
  }
}
