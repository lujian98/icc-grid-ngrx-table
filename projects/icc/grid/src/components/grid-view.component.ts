import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';
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
import { uniqueId } from '@icc/ui/core';
import { BehaviorSubject, Observable, interval, map, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, skip, switchMap, take, takeUntil } from 'rxjs/operators';
import { IccGridFacade } from '../+state/grid.facade';
import { IccColumnConfig, IccColumnWidth, IccGridConfig } from '../models/grid-column.model';
import { IccRowGroup } from '../services/row-group/row-group';
import { IccRowGroups } from '../services/row-group/row-groups';
import { IccGridHeaderViewComponent } from './grid-header-view/grid-header-view.component';
import { IccGridRowGroupComponent } from './grid-row/grid-row-group.component';
import { IccGridRowComponent } from './grid-row/grid-row.component';

@Component({
  selector: 'icc-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ScrollingModule, IccGridRowComponent, IccGridRowGroupComponent, IccGridHeaderViewComponent],
})
export class IccGridViewComponent<T> implements AfterViewInit, OnDestroy {
  private elementRef = inject(ElementRef);
  private gridFacade = inject(IccGridFacade);
  private _gridConfig!: IccGridConfig;
  private scrollIndex: number = 0;
  private prevRowIndex: number = -1;
  sizeChanged$: BehaviorSubject<any> = new BehaviorSubject({});
  gridData$!: Observable<T[]> | undefined;
  rowSelection$: Observable<SelectionModel<T>> | undefined;
  rowGroups$: Observable<IccRowGroups | boolean> | undefined;
  columnHeaderPosition = 0;
  columnWidths: IccColumnWidth[] = [];
  //private

  selections!: any;
  @Input() columns: IccColumnConfig[] = [];

  @Input()
  set gridConfig(val: IccGridConfig) {
    this._gridConfig = { ...val };
    if (!this.gridData$) {
      this.gridData$ = this.gridFacade.selectGridData(this.gridConfig).pipe(
        map((data) => {
          console.log(' data=', data);
          console.log(' gridConfig.viewportReady=', this.gridConfig.viewportReady);
          this.checkViewport(data);
          // window.dispatchEvent(new Event('resize'));
          return data;
        }),
      );
    }
    if (!this.rowSelection$) {
      this.rowSelection$ = this.gridFacade.selectRowSelection(this.gridConfig);
    }
    if (!this.rowGroups$) {
      this.rowGroups$ = this.gridFacade.selectRowGroups(this.gridConfig);
    }
  }
  get gridConfig(): IccGridConfig {
    return this._gridConfig;
  }

  getRecord(record: T): T {
    return record; //{ ...record }; // TODO some issue need this but will disable the select record???
  }

  selected(record: T, selection: SelectionModel<T>): boolean {
    return selection.isSelected(record);
  }

  gridColumnWidthsEvent(values: IccColumnWidth[]): void {
    this.columnWidths = values;
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
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((event) => of(event).pipe(takeUntil(this.sizeChanged$.pipe(skip(1))))),
      )
      .subscribe((event) => this.setViewportPageSize(typeof event === 'string' ? false : true));
  }

  trackByIndex(index: number): number {
    return index;
  }

  onScrolledIndexChange(index: number): void {
    if (this.gridConfig.virtualScroll) {
      this.scrollIndex = index;
      const nextPage = this.gridConfig.page + 1;
      const pageSize = this.gridConfig.pageSize;
      const displayTotal = (nextPage - 1) * pageSize;
      if (displayTotal - index < pageSize - 10 && displayTotal < this.gridConfig.totalCounts) {
        this.gridFacade.getGridPageData(this.gridConfig, nextPage);
      }
    }
  }

  onToggleRowGroup(rowGroups: IccRowGroups | boolean): void {
    if (this.gridConfig.virtualScroll && rowGroups instanceof IccRowGroups) {
      const nextPage = this.gridConfig.page + 1;
      const pageSize = this.gridConfig.pageSize;
      const displayTotal = (nextPage - 1) * pageSize;
      const actualDisplay = displayTotal - rowGroups.totalHiddenCounts;
      if (actualDisplay - this.scrollIndex < pageSize - 10 && displayTotal < this.gridConfig.totalCounts) {
        this.gridFacade.getGridPageData(this.gridConfig, nextPage);
      }
    }
  }

  onViewportScroll(event: any): void {
    this.columnHeaderPosition = -event.target.scrollLeft;
  }

  private setViewportPageSize(loadData: boolean = true): void {
    const clientHeight = this.viewport.elementRef.nativeElement.clientHeight;
    const clientWidth = this.viewport.elementRef.nativeElement.clientWidth;
    const fitPageSize = Math.floor(clientHeight / this.gridConfig.rowHeight);
    console.log(' set view port 2222 clientHeight=', clientHeight);
    const pageSize =
      !this.gridConfig.virtualScroll && !this.gridConfig.verticalScroll ? fitPageSize : this.gridConfig.pageSize;
    console.log(' set view port 2222 pageSize=', pageSize);
    console.log('000000000 gridConfig.viewportReady=', this.gridConfig.viewportReady);
    this.gridFacade.setViewportPageSize(this.gridConfig, pageSize, clientWidth, loadData);
  }

  private checkViewport(data: T[]): void {
    if (this.gridConfig.virtualScroll || this.gridConfig.verticalScroll) {
      // make sure column width with vertical scroll are correct
      const el = this.viewport.elementRef.nativeElement;
      const clientHeight = el.clientHeight;
      const clientWidth = el.clientWidth;
      const widowWidth = this.elementRef.nativeElement.clientWidth;
      const pageSize = Math.floor(clientHeight / this.gridConfig.rowHeight);
      if (data.length > pageSize && clientWidth === widowWidth) {
        this.sizeChanged$.next(uniqueId(16));
      } else if (data.length <= pageSize && clientWidth < widowWidth) {
        this.sizeChanged$.next(uniqueId(16));
      }
    }
  }

  isRowGroup(index: number, record: T | IccRowGroup): boolean {
    return record instanceof IccRowGroup;
  }

  rowClick(event: MouseEvent, rowIndex: number, record: T, selection: SelectionModel<T>, data: T[]): void {
    if (this.prevRowIndex < 0) {
      this.prevRowIndex = rowIndex;
    }
    const selected = selection.isSelected(record);
    if (this.gridConfig.multiRowSelection) {
      if (event.ctrlKey || event.metaKey) {
        this.selectRecord([record], !selected);
      } else if (event.shiftKey) {
        if (rowIndex === this.prevRowIndex) {
          this.selectRecord([record], !selected);
        } else {
          const records = this.getSelectionRange(this.prevRowIndex, rowIndex, data);
          this.selectRecord(records, true);
        }
      } else {
        if (selected) {
          this.gridFacade.setSelectAllRows(this.gridConfig, false);
        } else {
          this.gridFacade.setSelectRow(this.gridConfig, record);
        }
      }
    } else {
      this.selectRecord([record], !selected);
    }
    this.prevRowIndex = rowIndex;
  }

  private getSelectionRange(prevRowIndex: number, rowIndex: number, data: T[]): T[] {
    if (prevRowIndex > rowIndex) {
      return data.slice(rowIndex, prevRowIndex);
    } else {
      return data.slice(prevRowIndex, rowIndex + 1);
    }
  }

  private selectRecord(record: T[], selected: boolean): void {
    this.gridFacade.setSelectRows(this.gridConfig, record, selected);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: MouseEvent): void {
    this.sizeChanged$.next(event);
  }

  ngOnDestroy(): void {
    this.sizeChanged$.complete();
  }
}
