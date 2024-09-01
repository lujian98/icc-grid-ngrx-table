import { DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, Component, Input, inject, ViewChild, HostListener, AfterViewInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, interval, of, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, skip, switchMap, take, takeUntil } from 'rxjs/operators';
import { IccGridFacade } from '../+state/grid.facade';
import { DragDropEvent } from '../models/drag-drop-event';
import { IccColumnConfig, IccColumnWidth, IccGridConfig } from '../models/grid-column.model';
import { IccGridHeaderItemComponent } from './grid-header/grid-header-item/grid-header-item.component';
import { IccGridHeaderComponent } from './grid-header/grid-header.component';
import { IccGridViewportComponent } from './grid-viewport/grid-viewport.component';
import { IccRowSelectComponent } from './row-select/row-select.component';
import { IccGridRowComponent } from './grid-row/grid-row.component';
import { viewportWidthRatio } from '../utils/viewport-width-ratio';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'icc-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    ScrollingModule,
    IccGridHeaderComponent,
    IccGridHeaderItemComponent,
    IccGridViewportComponent,
    IccRowSelectComponent,
    IccGridRowComponent,
  ],
})
export class IccGridViewComponent<T> implements AfterViewInit, OnDestroy {
  private gridFacade = inject(IccGridFacade);
  private _gridConfig!: IccGridConfig;
  private _columns: IccColumnConfig[] = [];
  private _columnWidths: IccColumnWidth[] = [];
  private firstTimeLoadColumnsConfig = true;
  sizeChanged$: BehaviorSubject<any> = new BehaviorSubject({});
  gridData$!: Observable<T[]>;
  columnHeaderPosition = 0;

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
    if (this.gridConfig.remoteColumnsConfig && this.firstTimeLoadColumnsConfig) {
      this.firstTimeLoadColumnsConfig = false;
      this.gridFacade.setupGridColumnsConfig(this.gridConfig.gridName, []);
    }
    this.gridData$ = this.gridFacade.selectGridData(val.gridName);
    this.setColumWidths();
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

  @ViewChild(CdkVirtualScrollViewport, { static: true }) viewport!: CdkVirtualScrollViewport;

  ngAfterViewInit(): void {
    interval(10).pipe(
      take(1)
    ).subscribe(() => this.setViewportPageSize());

    this.sizeChanged$
      .pipe(
        skip(1),
        debounceTime(250),
        distinctUntilChanged(),
        switchMap((event) => {
          return of(event).pipe(takeUntil(this.sizeChanged$.pipe(skip(1))));
        })
      )
      .subscribe((event) => {
        this.setViewportPageSize();
      });

  }

  trackByIndex(index: number): number {
    return index;
  }

  private setViewportPageSize(): void {
    const clientHeight = this.viewport.elementRef.nativeElement.clientHeight;
    if (clientHeight > 0) {
      const clientWidth = this.viewport.elementRef.nativeElement.clientWidth;
      const pageSize = Math.floor(clientHeight / 24);
      this.gridFacade.setViewportPageSize(this.gridConfig.gridName, pageSize, clientWidth);
      this.gridFacade.getGridData(this.gridConfig.gridName);
    }
  }

  onColumnResizing(columnWidths: IccColumnWidth[]): void {
    this.columnWidths = columnWidths;
  }

  onColumnResized(columnWidths: IccColumnWidth[]): void {
    this.columnWidths = columnWidths;
    const columns: IccColumnConfig[] = [...this.columns].map((column, index) => {
      return {
        ...column,
        width: this.columnWidths[index].width / viewportWidthRatio(this.gridConfig, this.columns),
      }
    });
    this.gridFacade.setGridColumnsConfig(this.gridConfig.gridName, columns);
  }

  onColumnDragDrop(events: DragDropEvent): void {
    const previousIndex = this.indexCorrection(events.previousIndex);
    const currentIndex = this.indexCorrection(events.currentIndex);
    const columns = [...this.columns];
    moveItemInArray(columns, previousIndex, currentIndex);
    this.gridFacade.setGridColumnsConfig(this.gridConfig.gridName, columns);
  }

  onViewportScroll(event: any): void {
    this.columnHeaderPosition = -event.target.scrollLeft;
  }

  private setColumWidths(): void {
    this.columnWidths = [...this.columns].map((column) => ({
      name: column.name,
      width: viewportWidthRatio(this.gridConfig, this.columns) * column.width!,
    }));
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
    //this.dataChanged$.complete();
  }
}
