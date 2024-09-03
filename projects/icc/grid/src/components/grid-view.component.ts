import { DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  ViewChild,
  inject,
} from '@angular/core';
import { BehaviorSubject, Observable, interval, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, skip, switchMap, take, takeUntil } from 'rxjs/operators';
import { IccGridFacade } from '../+state/grid.facade';
import { DragDropEvent } from '../models/drag-drop-event';
import { IccColumnConfig, IccColumnWidth, IccGridConfig } from '../models/grid-column.model';
import { getTableWidth, viewportWidthRatio } from '../utils/viewport-width-ratio';
import { IccGridHeaderItemComponent } from './grid-header/grid-header-item/grid-header-item.component';
import { IccGridHeaderComponent } from './grid-header/grid-header.component';
import { IccGridRowComponent } from './grid-row/grid-row.component';
import { IccRowSelectComponent } from './row-select/row-select.component';
import { ROW_SELECTION_CELL_WIDTH } from '../models/constants';

@Component({
  selector: 'icc-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  //changeDetection: ChangeDetectionStrategy.Default,
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    ScrollingModule,
    IccGridHeaderComponent,
    IccGridHeaderItemComponent,
    IccRowSelectComponent,
    IccGridRowComponent,
  ],
})
export class IccGridViewComponent<T> implements AfterViewInit, OnDestroy {
  private elementRef = inject(ElementRef);
  private gridFacade = inject(IccGridFacade);
  private _gridConfig!: IccGridConfig;
  private _columns: IccColumnConfig[] = [];
  private _gridTemplateColumns: string = '';
  private _columnWidths: IccColumnWidth[] = [];
  private firstTimeLoadColumnsConfig = true;
  sizeChanged$: BehaviorSubject<any> = new BehaviorSubject({});
  gridData$!: Observable<T[]>;
  columnHeaderPosition = 0;
  tableWidth: number = 100;

  @Input()
  set columns(val: IccColumnConfig[]) {
    this._columns = val;
    const widthRatio = viewportWidthRatio(this.gridConfig, this.columns);
    this.setColumWidths(this.columns, widthRatio);
  }
  get columns(): IccColumnConfig[] {
    return this._columns;
  }

  @Input()
  set gridConfig(val: IccGridConfig) {
    this._gridConfig = val;
    if (this.gridConfig.remoteColumnsConfig && this.firstTimeLoadColumnsConfig) {
      this.firstTimeLoadColumnsConfig = false;
      this.gridFacade.setupGridColumnsConfig(this.gridConfig.gridName, []);
    }
    this.gridData$ = this.gridFacade.selectGridData(val.gridName);
    const widthRatio = viewportWidthRatio(this.gridConfig, this.columns);
    this.setColumWidths(this.columns, widthRatio);
    //console.log(' this.viewport =', this.viewport);
    //this.viewport.setTotalContentSize(this.gridConfig.totalCounts * 2400);
    //window.dispatchEvent(new Event('resize'));
  }
  get gridConfig(): IccGridConfig {
    return this._gridConfig;
  }

  set columnWidths(values: IccColumnWidth[]) {
    this._columnWidths = values;
  }

  get columnWidths(): IccColumnWidth[] {
    return this._columnWidths;
  }

  set gridTemplateColumns(value: string) {
    this._gridTemplateColumns = value;
  }

  get gridTemplateColumns(): string {
    return this._gridTemplateColumns;
  }

  @ViewChild(CdkVirtualScrollViewport, { static: true })
  viewport!: CdkVirtualScrollViewport;

  ngAfterViewInit(): void {
    interval(10)
      .pipe(take(1))
      .subscribe(() => this.setViewportPageSize());

    this.sizeChanged$
      .pipe(
        skip(1),
        debounceTime(250),
        distinctUntilChanged(),
        switchMap((event) => {
          return of(event).pipe(takeUntil(this.sizeChanged$.pipe(skip(1))));
        }),
      )
      .subscribe(() => this.setViewportPageSize());
  }

  trackByIndex(index: number): number {
    return index;
  }

  private setViewportPageSize(): void {
    const clientHeight = this.viewport.elementRef.nativeElement.clientHeight;
    const clientWidth = this.viewport.elementRef.nativeElement.clientWidth;
    const fitPageSize = Math.floor(clientHeight / 24);
    const pageSize =
      !this.gridConfig.virtualScroll && !this.gridConfig.verticalScroll ? fitPageSize : this.gridConfig.pageSize;
    this.gridFacade.setViewportPageSize(this.gridConfig.gridName, pageSize, clientWidth);
    this.gridFacade.getGridData(this.gridConfig.gridName);
  }

  onColumnResizing(columnWidths: IccColumnWidth[]): void {
    this.setColumWidths(columnWidths, 1);
    if (this.gridConfig.horizontalScroll) {
      this.tableWidth = getTableWidth(columnWidths);
    }
  }

  onColumnResized(columnWidths: IccColumnWidth[]): void {
    const widthRatio = viewportWidthRatio(this.gridConfig, this.columns);
    const columns: IccColumnConfig[] = [...this.columns].map((column, index) => {
      return {
        ...column,
        width: columnWidths[index].width / widthRatio,
      };
    });
    this.setColumWidths(columnWidths, widthRatio);
    this.gridFacade.setGridColumnsConfig(this.gridConfig.gridName, columns);
  }

  onColumnDragDrop(events: DragDropEvent): void {
    const previousIndex = this.indexCorrection(events.previousIndex);
    const currentIndex = this.indexCorrection(events.currentIndex);
    const columns = [...this.columns];
    moveItemInArray(columns, previousIndex, currentIndex);
    this.gridFacade.setGridColumnsConfig(this.gridConfig.gridName, columns);
  }

  onScrolledIndexChange(index: number): void {
    if (this.gridConfig.virtualScroll) {
      const nextPage = this.gridConfig.page + 1;
      const pageSize = this.gridConfig.pageSize;
      const displayTotal = (nextPage - 1) * pageSize;
      if (displayTotal - index < pageSize - 10 && displayTotal < this.gridConfig.totalCounts) {
        console.log('load next page =', nextPage);
        this.gridFacade.getGridPageData(this.gridConfig.gridName, nextPage);
      }
    }
  }

  onViewportScroll(event: any): void {
    this.columnHeaderPosition = -event.target.scrollLeft;
  }

  private setColumWidths(columns: any[], widthRatio: number): void {
    if (this.gridConfig.horizontalScroll) {
      this.tableWidth = getTableWidth(this.columns);
    } else {
      this.tableWidth = this.gridConfig.viewportWidth;
    }
    const colWidths = [...columns]
      .filter((column) => column.hidden !== true)
      .map((column) => {
        return widthRatio * column.width! + 'px';
      })
      .join(' ');
    this.gridTemplateColumns = this.gridConfig.rowSelection ? `${ROW_SELECTION_CELL_WIDTH}px ${colWidths}` : colWidths;
    //console.log(' this.tableWidth=', this.tableWidth);
    //console.log(' this.gridTemplateColumns=', this.gridTemplateColumns);
  }

  private indexCorrection(idx: number): number {
    this.columns.forEach((column, index) => {
      if (column.hidden && idx >= index) {
        idx++;
      }
    });
    return idx;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: MouseEvent) {
    this.sizeChanged$.next(event);
  }

  ngOnDestroy(): void {
    this.sizeChanged$.complete();
  }
}
