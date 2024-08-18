import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, OnDestroy, inject } from '@angular/core';
import { BehaviorSubject, interval, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, skip, switchMap, take, takeUntil } from 'rxjs/operators';
import { IccGridFacade } from '../../+state/grid.facade';
import { IccColumnConfig, IccGridConfig } from '../../models/grid-column.model';
import { IccGridRowComponent } from '../grid-row/grid-row.component';

@Component({
  selector: 'icc-grid-viewport',
  templateUrl: './grid-viewport.component.html',
  styleUrls: ['./grid-viewport.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: true,
  imports: [
    CommonModule,
    ScrollingModule,
    IccGridRowComponent,
  ],
})
export class IccGridViewportComponent implements AfterViewInit, OnDestroy {
  private gridFacade = inject(IccGridFacade);
  private elementRef = inject(ElementRef);
  private _gridConfig!: IccGridConfig;
  sizeChanged$: BehaviorSubject<any> = new BehaviorSubject({});

  @Input() columns: IccColumnConfig[] = [];
  private _gridData: any[] = [];

  @Input()
  set gridConfig(val: IccGridConfig) {
    //console.log(' 8888 gridConfig=', val)
    this._gridConfig = val;
  }
  get gridConfig(): IccGridConfig {
    return this._gridConfig;
  }

  @Input()
  set gridData(data: any[]) { // TODO set local data here
    this._gridData = data;
  }
  get gridData(): any[] {
    // console.log(' view port data uuuu =', this._gridData)
    return this._gridData;
  }

  // @ViewChild(CdkVirtualScrollViewport) private viewport!: CdkVirtualScrollViewport;

  constructor() {
    this.sizeChanged$
      .pipe(
        skip(1),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((event) => {
          return of(event).pipe(takeUntil(this.sizeChanged$.pipe(skip(1))));
        })
      )
      .subscribe((event) => {
        this.setViewportPageSize();
      });
  }

  ngAfterViewInit(): void {
    interval(1).pipe(take(1)).subscribe(() => this.setViewportPageSize());
  }

  private setViewportPageSize(): void {
    const clientHeight = this.elementRef.nativeElement.clientHeight;
    const pageSize = Math.floor(clientHeight / 24);
    this.gridFacade.setViewportPageSize(this.gridConfig.gridName, pageSize);
    this.gridFacade.getGridData(this.gridConfig.gridName);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: MouseEvent) {
    this.sizeChanged$.next(event);
  }

  ngOnDestroy(): void {
    this.sizeChanged$.complete();
  }
}
