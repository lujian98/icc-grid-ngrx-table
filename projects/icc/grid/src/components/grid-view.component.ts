import { SelectionModel } from '@angular/cdk/collections';
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
import { uniqueId } from '@icc/ui/core';
import { BehaviorSubject, Observable, Subject, interval, map, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, skip, switchMap, take, takeUntil } from 'rxjs/operators';
import { IccGridFacade } from '../+state/grid.facade';
import { IccColumnConfig, IccColumnWidth, IccGridConfig, IccGridSetting } from '../models/grid-column.model';
import { IccRowGroup } from '../services/row-group/row-group';
import { IccRowGroups } from '../services/row-group/row-groups';
import { getTableWidth } from '../utils/viewport-width-ratio';
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
  private _gridSetting!: IccGridSetting;
  private scrollIndex: number = 0;
  private prevRowIndex: number = -1;
  private destroy$ = new Subject<void>();
  sizeChanged$ = new BehaviorSubject<string | MouseEvent | null>(null);
  gridData$!: Observable<object[]> | undefined;
  rowSelection$: Observable<SelectionModel<object>> | undefined;
  rowGroups$: Observable<IccRowGroups | boolean> | undefined;
  columnHeaderPosition = 0;
  columnWidths: IccColumnWidth[] = [];

  @Input() set gridSetting(val: IccGridSetting) {
    this._gridSetting = { ...val };
    if (!this.gridData$) {
      this.gridData$ = this.gridFacade.selectGridData(this.gridSetting.gridId).pipe(
        map((data) => {
          this.checkViewport(data);
          return data;
        }),
      );
    }
    if (!this.rowSelection$) {
      this.rowSelection$ = this.gridFacade.selectRowSelection(this.gridSetting.gridId);
    }
    if (!this.rowGroups$) {
      this.rowGroups$ = this.gridFacade.selectRowGroups(this.gridSetting.gridId);
    }
  }
  get gridSetting(): IccGridSetting {
    return this._gridSetting;
  }
  @Input() gridConfig!: IccGridConfig;
  @Input() columns: IccColumnConfig[] = [];

  get tableWidth(): number {
    return this.gridConfig.horizontalScroll ? getTableWidth(this.columns) : this.gridSetting.viewportWidth;
  }

  getRecord(record: object): object {
    return record; //{ ...record }; // TODO some issue need this but will disable the select record???
  }

  selected(record: object, selection: SelectionModel<object>): boolean {
    return selection.isSelected(record as object);
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
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((event) => of(event).pipe(takeUntil(this.sizeChanged$.pipe(skip(1))))),
        takeUntil(this.destroy$),
      )
      .subscribe((event) => {
        this.setViewportPageSize(typeof event === 'string' ? false : true, event);
      });
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
      if (displayTotal - index < pageSize - 10 && displayTotal < this.gridSetting.totalCounts) {
        this.gridFacade.getGridPageData(this.gridSetting.gridId, nextPage);
      }
    }
  }

  onToggleRowGroup(rowGroups: IccRowGroups | boolean): void {
    if (this.gridConfig.virtualScroll && rowGroups instanceof IccRowGroups) {
      const nextPage = this.gridConfig.page + 1;
      const pageSize = this.gridConfig.pageSize;
      const displayTotal = (nextPage - 1) * pageSize;
      const actualDisplay = displayTotal - rowGroups.totalHiddenCounts;
      if (actualDisplay - this.scrollIndex < pageSize - 10 && displayTotal < this.gridSetting.totalCounts) {
        this.gridFacade.getGridPageData(this.gridSetting.gridId, nextPage);
      }
    }
  }

  onViewportScroll(event: Event): void {
    this.columnHeaderPosition = -(event.target as HTMLElement).scrollLeft;
  }

  private setViewportPageSize(loadData: boolean = true, event?: string | MouseEvent | null): void {
    const clientHeight = this.viewport.elementRef.nativeElement.clientHeight;
    const clientWidth = this.viewport.elementRef.nativeElement.clientWidth;
    const fitPageSize = Math.floor(clientHeight / this.gridConfig.rowHeight);
    const pageSize =
      !this.gridConfig.virtualScroll && !this.gridConfig.verticalScroll ? fitPageSize : this.gridConfig.pageSize;

    if (!event || typeof event === 'string') {
      this.gridFacade.setViewportPageSize(this.gridConfig, this.gridSetting, pageSize, clientWidth, loadData);
    } else {
      this.gridFacade.setWindowResize(this.gridConfig, this.gridSetting, pageSize, clientWidth, loadData);
    }
  }

  private checkViewport(data: object[]): void {
    const el = this.viewport.elementRef.nativeElement;
    const clientWidth = el.clientWidth;
    const clientHeight = el.clientHeight;
    const pageSize = Math.floor(clientHeight / this.gridConfig.rowHeight);
    if (this.gridConfig.virtualScroll || this.gridConfig.verticalScroll) {
      // make sure column width with vertical scroll are correct
      const widowWidth = this.elementRef.nativeElement.clientWidth;
      if (data.length > pageSize && clientWidth === widowWidth) {
        this.sizeChanged$.next(uniqueId(16));
      } else if (data.length <= pageSize && clientWidth < widowWidth) {
        this.sizeChanged$.next(uniqueId(16));
      }
    } else if (pageSize !== this.gridConfig.pageSize) {
      this.gridFacade.setViewportPageSize(this.gridConfig, this.gridSetting, pageSize, clientWidth, true);
    }
  }

  isRowGroup(index: number, record: object | IccRowGroup): boolean {
    return record instanceof IccRowGroup;
  }

  rowClick(
    event: MouseEvent,
    rowIndex: number,
    record: object,
    selection: SelectionModel<object>,
    data: object[],
  ): void {
    if (this.gridConfig.rowSelection) {
      if (this.prevRowIndex < 0) {
        this.prevRowIndex = rowIndex;
      }
      const selected = selection.isSelected(record as object);
      if (this.gridConfig.multiRowSelection) {
        if (event.ctrlKey || event.metaKey) {
          this.selectRecord([record], !selected, selection);
        } else if (event.shiftKey) {
          if (rowIndex === this.prevRowIndex) {
            this.selectRecord([record], !selected, selection);
          } else {
            const records = this.getSelectionRange(this.prevRowIndex, rowIndex, data);
            this.selectRecord(records, true, selection);
          }
        } else {
          if (selected) {
            this.gridFacade.setSelectAllRows(this.gridSetting.gridId, false);
          } else {
            this.gridFacade.setSelectRow(this.gridSetting.gridId, record as object);
          }
        }
      } else {
        this.selectRecord([record], !selected, selection);
      }
      this.prevRowIndex = rowIndex;
    }
  }

  private getSelectionRange(prevRowIndex: number, rowIndex: number, data: object[]): object[] {
    if (prevRowIndex > rowIndex) {
      return data.slice(rowIndex, prevRowIndex);
    } else {
      return data.slice(prevRowIndex, rowIndex + 1);
    }
  }

  private selectRecord(record: object[], isSelected: boolean, selection: SelectionModel<object>): void {
    const selected = this.getSelectedTotal(record, isSelected, selection);
    this.gridFacade.setSelectRows(this.gridSetting.gridId, record as object[], isSelected, selected);
  }

  private getSelectedTotal(record: object[], isSelected: boolean, selection: SelectionModel<object>): number {
    if (this.gridConfig.multiRowSelection) {
      const prevSelectedLength = selection.selected.length;
      if (isSelected) {
        const preSelected = record.filter((item) => selection.isSelected(item));
        return prevSelectedLength - preSelected.length + record.length;
      } else {
        return prevSelectedLength - record.length;
      }
    } else {
      return isSelected ? 1 : 0;
    }
  }

  rowDblClick(record: object): void {
    this.gridFacade.rowDblClick(this.gridSetting.gridId, record as object);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: MouseEvent): void {
    this.sizeChanged$.next(event);
  }

  ngOnDestroy(): void {
    this.sizeChanged$.next(null);
    this.sizeChanged$.complete();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
