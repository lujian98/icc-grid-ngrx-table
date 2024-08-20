import { DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { AfterViewChecked, ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
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
export class IccGridViewComponent implements AfterViewChecked {
  private gridFacade = inject(IccGridFacade);
  private _gridConfig!: IccGridConfig;
  private _columns: IccColumnConfig[] = [];
  private _columnWidths: IccColumnWidth[] = [];
  gridData$!: Observable<any[]>;
  columnResized$: BehaviorSubject<any> = new BehaviorSubject({});

  @Input()
  set columns(val: IccColumnConfig[]) {
    this._columns = val;
    this.columnWidths = [...this.columns].map((column) => ({
      name: column.name,
      width: this.widthRatio * column.width!,
    }));
  }
  get columns(): IccColumnConfig[] {
    return this._columns;
  }

  @Input()
  set gridConfig(val: IccGridConfig) {
    //console.log(' 5555 gridConfig=', val)
    this._gridConfig = val;
    if(!this.columns || this.columns.length === 0) {
      this.gridFacade.setupGridColumnConfig(this.gridConfig.gridName, []);
    }
    this.gridData$ = this.gridFacade.selectGridData(val.gridName);
  }
  get gridConfig(): IccGridConfig {
    return this._gridConfig;
  }

  @Input()
  set gridData(data: IccGridData<any>) { // TODO set local data here
    // console.log( ' 7777 input grid data =', data)
    if (data) { // use set getGridDataSuccess ??
      //this.gridFacade.getGridData(this.gridConfig.gridName, data);
    }
  }

  @Input() allSelected = false;
  @Output() filterGrid = new EventEmitter<any>();

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
        this.gridFacade.setGridColumnHiddenShow(this.gridConfig.gridName, column);
        // window.dispatchEvent(new Event('resize'));
      });

  }

  onColumnResizing(events: IccColumnWidth): void {
    this.columnWidths = [...this.columns].map((column) => {
      const width = column.name === events.name ? events.width : this.widthRatio * column.width!;
      return {
        name: column.name,
        width: width!,
      }
    });
  }

  onColumnResized(event: IccColumnWidth): void {
    const column: IccColumnConfig = {
      ...this.columns.find((item)=>item.name === event.name)!,
      width: event.width! / this.widthRatio,
    }
    this.columnResized$.next(column);
  }

  onColumnDragDrop(events: DragDropEvent): void {
    const previousIndex = this.indexCorrection(events.previousIndex);
    const currentIndex = this.indexCorrection(events.currentIndex);
    const columns = [...this.columns];
    moveItemInArray(columns, previousIndex, currentIndex);
    this.gridFacade.setGridColumnConfig(this.gridConfig.gridName, columns);
  }

  private indexCorrection(idx: number): number {
    this.columns.forEach((column, index)=>{
      if(column.hidden && idx >= index) {
        idx++;
      }
    });
    return idx;
  }

  ngAfterViewChecked(): void {
    //const viewportSize = this.viewport.elementRef.nativeElement.getBoundingClientRect();
    //this.viewport.checkViewportSize();
    //console.log(' viewportSize=', viewportSize)
  }

  onToggleSelectAllRowsOnCurrentPage() {
    //console.log( ' view columnConfig=', this.columnConfig)
    //this.toggleSelectAllRowsOnCurrentPage.emit(!this.allSelected);
  }

  hasCheckboxSelection(): boolean {
    return true;
    //return isCheckboxSelection(this.selectionType);
  }

  checkSelected(index: number): boolean {
    return true;
    //return this.isRowSelected(index, this.selectedRowIndexes);
  }

}
