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
import { IccGridFacade } from '../+state/grid.facade';
import { IccColumnConfig, IccGridConfig, IccColumnWidth } from '../models/grid-column.model';
import { IccGridHeaderViewComponent } from './grid-header-view/grid-header-view.component';
import { IccGridRowComponent } from './grid-row/grid-row.component';

@Component({
  selector: 'icc-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ScrollingModule, IccGridRowComponent, IccGridHeaderViewComponent],
})
export class IccGridViewComponent<T> implements AfterViewInit, OnDestroy {
  private gridFacade = inject(IccGridFacade);
  private _gridConfig!: IccGridConfig;
  sizeChanged$: BehaviorSubject<any> = new BehaviorSubject({});
  gridData$!: Observable<T[]> | undefined;
  columnHeaderPosition = 0;
  columnWidths: IccColumnWidth[] = [];

  @Input() columns: IccColumnConfig[] = [];

  @Input()
  set gridConfig(val: IccGridConfig) {
    this._gridConfig = { ...val };
    if (!this.gridData$) {
      this.gridData$ = this.gridFacade.selectGridData(this.gridConfig);
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
      .subscribe(() => this.setViewportPageSize());
  }

  trackByIndex(index: number): number {
    return index;
  }

  onScrolledIndexChange(index: number): void {
    if (this.gridConfig.virtualScroll) {
      const nextPage = this.gridConfig.page + 1;
      const pageSize = this.gridConfig.pageSize;
      const displayTotal = (nextPage - 1) * pageSize;
      if (displayTotal - index < pageSize - 10 && displayTotal < this.gridConfig.totalCounts) {
        this.gridFacade.getGridPageData(this.gridConfig, nextPage);
      }
    }
  }

  onViewportScroll(event: any): void {
    this.columnHeaderPosition = -event.target.scrollLeft;
  }

  private setViewportPageSize(): void {
    const clientHeight = this.viewport.elementRef.nativeElement.clientHeight;
    const clientWidth = this.viewport.elementRef.nativeElement.clientWidth;
    const fitPageSize = Math.floor(clientHeight / this.gridConfig.rowHeight);
    console.log('v clientWidth=', clientWidth);
    const pageSize =
      !this.gridConfig.virtualScroll && !this.gridConfig.verticalScroll ? fitPageSize : this.gridConfig.pageSize;
    this.gridFacade.setViewportPageSize(this.gridConfig, pageSize, clientWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: MouseEvent) {
    this.sizeChanged$.next(event);
  }

  ngOnDestroy(): void {
    this.sizeChanged$.complete();
  }
}
