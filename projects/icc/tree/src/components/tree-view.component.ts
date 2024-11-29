import { DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Input,
  OnDestroy,
  ViewChild,
  inject,
} from '@angular/core';
import { BehaviorSubject, Observable, interval, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, skip, switchMap, take, takeUntil } from 'rxjs/operators';
import {
  IccColumnConfig,
  IccColumnWidth,
  getTableWidth,
  viewportWidthRatio,
  IccGridHeaderComponent,
  ROW_SELECTION_CELL_WIDTH,
  DragDropEvent,
  IccGridRowComponent,
  IccGridFacade,
} from '@icc/ui/grid';
import { IccTreeConfig, defaultTreeConfig, IccTreeData } from '../models/tree-grid.model';
import { IccFlatTreeComponent } from './flat-tree/flat-tree.component';

@Component({
  selector: 'icc-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    ScrollingModule,
    IccGridHeaderComponent,
    IccGridRowComponent,
    IccFlatTreeComponent,
  ],
})
export class IccTreeViewComponent<T> implements AfterViewInit, OnDestroy {
  private gridFacade = inject(IccGridFacade);
  private _treeConfig!: IccTreeConfig;
  private _columns: IccColumnConfig[] = [];
  private _gridTemplateColumns: string = '';
  private _columnWidths: IccColumnWidth[] = [];
  sizeChanged$: BehaviorSubject<any> = new BehaviorSubject({});
  treeData$!: Observable<T[]>;
  columnHeaderPosition = 0;
  tableWidth: number = 2000;

  @Input()
  set columns(val: IccColumnConfig[]) {
    this._columns = [...val];
    const widthRatio = viewportWidthRatio(this.treeConfig, this.columns);
    this.setColumWidths(this.columns, widthRatio);
  }
  get columns(): IccColumnConfig[] {
    return this._columns;
  }

  @Input()
  set treeConfig(val: IccTreeConfig) {
    this._treeConfig = { ...val };
    this.treeData$ = this.gridFacade.selectGridData(this.treeConfig.gridId);
    const widthRatio = viewportWidthRatio(this.treeConfig, this.columns);
    this.setColumWidths(this.columns, widthRatio);
  }
  get treeConfig(): IccTreeConfig {
    return this._treeConfig;
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
  private viewport!: CdkVirtualScrollViewport;

  ngAfterViewInit(): void {
    interval(10)
      .pipe(take(1))
      .subscribe(() => this.setViewportPageSize());

    this.sizeChanged$
      .pipe(
        skip(1),
        debounceTime(250),
        distinctUntilChanged(),
        switchMap((event) => of(event).pipe(takeUntil(this.sizeChanged$.pipe(skip(1))))),
      )
      .subscribe(() => this.setViewportPageSize());
  }

  trackByIndex(index: number): number {
    return index;
  }

  onColumnResizing(columnWidths: IccColumnWidth[]): void {
    this.setColumWidths(columnWidths, 1);
    if (this.treeConfig.horizontalScroll) {
      this.tableWidth = getTableWidth(columnWidths);
    }
  }

  onColumnResized(columnWidths: IccColumnWidth[]): void {
    const widthRatio = viewportWidthRatio(this.treeConfig, this.columns);
    const columns: IccColumnConfig[] = [...this.columns].map((column, index) => ({
      ...column,
      width: columnWidths[index].width / widthRatio,
    }));
    this.setColumWidths(columnWidths, widthRatio);
    this.gridFacade.setGridColumnsConfig(this.treeConfig, columns);
  }

  onColumnDragDrop(events: DragDropEvent): void {
    const previousIndex = this.indexCorrection(events.previousIndex);
    const currentIndex = this.indexCorrection(events.currentIndex);
    const columns = [...this.columns];
    moveItemInArray(columns, previousIndex, currentIndex);
    this.gridFacade.setGridColumnsConfig(this.treeConfig, columns);
  }

  onScrolledIndexChange(index: number): void {
    if (this.treeConfig.virtualScroll) {
      const nextPage = this.treeConfig.page + 1;
      const pageSize = this.treeConfig.pageSize;
      const displayTotal = (nextPage - 1) * pageSize;
      if (displayTotal - index < pageSize - 10 && displayTotal < this.treeConfig.totalCounts) {
        this.gridFacade.getGridPageData(this.treeConfig.gridId, nextPage);
      }
    }
  }

  onViewportScroll(event: any): void {
    this.columnHeaderPosition = -event.target.scrollLeft;
  }

  private setColumWidths(columns: any[], widthRatio: number): void {
    if (this.treeConfig.horizontalScroll) {
      this.tableWidth = getTableWidth(this.columns);
    } else {
      this.tableWidth = this.treeConfig.viewportWidth;
    }
    const colWidths = [...columns]
      .filter((column) => column.hidden !== true)
      .map((column) => widthRatio * column.width! + 'px')
      .join(' ');
    this.gridTemplateColumns = this.treeConfig.rowSelection ? `${ROW_SELECTION_CELL_WIDTH}px ${colWidths}` : colWidths;
  }

  private indexCorrection(idx: number): number {
    this.columns.forEach((column, index) => {
      if (column.hidden && idx >= index) {
        idx++;
      }
    });
    return idx;
  }

  private setViewportPageSize(): void {
    const clientHeight = this.viewport.elementRef.nativeElement.clientHeight;
    const clientWidth = this.viewport.elementRef.nativeElement.clientWidth;
    const fitPageSize = Math.floor(clientHeight / this.treeConfig.rowHeight);
    const pageSize =
      !this.treeConfig.virtualScroll && !this.treeConfig.verticalScroll ? fitPageSize : this.treeConfig.pageSize;
    this.gridFacade.setViewportPageSize(this.treeConfig, pageSize, clientWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: MouseEvent) {
    this.sizeChanged$.next(event);
  }

  ngOnDestroy(): void {
    this.sizeChanged$.complete();
  }
}
