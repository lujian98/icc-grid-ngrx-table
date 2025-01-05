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
  standalone: true,
  imports: [CommonModule, ScrollingModule, IccGridRowComponent, IccGridRowGroupComponent, IccGridHeaderViewComponent],
})
export class IccGridViewComponent<T> implements AfterViewInit, OnDestroy {
  private elementRef = inject(ElementRef);
  private gridFacade = inject(IccGridFacade);
  private _gridConfig!: IccGridConfig;
  private scrollIndex: number = 0;
  sizeChanged$: BehaviorSubject<any> = new BehaviorSubject({});
  gridData$!: Observable<T[]> | undefined;
  rowGroups$: Observable<IccRowGroups | boolean> | undefined;
  columnHeaderPosition = 0;
  columnWidths: IccColumnWidth[] = [];

  @Input() columns: IccColumnConfig[] = [];

  @Input()
  set gridConfig(val: IccGridConfig) {
    this._gridConfig = { ...val };
    if (!this.gridData$) {
      this.gridData$ = this.gridFacade.selectGridData(this.gridConfig).pipe(
        map((data) => {
          this.checkViewport(data);
          return data;
        }),
      );
    }

    if (!this.rowGroups$) {
      this.rowGroups$ = this.gridFacade.selectRowGroups(this.gridConfig);
    }
  }
  get gridConfig(): IccGridConfig {
    return this._gridConfig;
  }

  getRecord(record: T): T {
    return { ...record };
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
        debounceTime(250),
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
    const pageSize =
      !this.gridConfig.virtualScroll && !this.gridConfig.verticalScroll ? fitPageSize : this.gridConfig.pageSize;
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

  @HostListener('window:resize', ['$event'])
  onResize(event: MouseEvent) {
    this.sizeChanged$.next(event);
  }

  ngOnDestroy(): void {
    this.sizeChanged$.complete();
  }
}
