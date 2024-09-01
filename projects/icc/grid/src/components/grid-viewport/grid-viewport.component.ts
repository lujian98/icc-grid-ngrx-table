import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Output, EventEmitter, Component, ElementRef, HostListener, Input, OnDestroy, inject } from '@angular/core';
import { BehaviorSubject, interval, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, skip, switchMap, take, takeUntil } from 'rxjs/operators';
import { IccGridFacade } from '../../+state/grid.facade';
import { IccColumnConfig, IccGridConfig, IccColumnWidth } from '../../models/grid-column.model';
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
export class IccGridViewportComponent<T>  {
  private gridFacade = inject(IccGridFacade);
  private elementRef = inject(ElementRef);
  private _gridConfig!: IccGridConfig;
  sizeChanged$: BehaviorSubject<any> = new BehaviorSubject({});
  dataChanged$: BehaviorSubject<any> = new BehaviorSubject([]);

  @Input() columns: IccColumnConfig[] = [];
  @Input() columnWidths: IccColumnWidth[] = [];
  private _gridData: T[] = [];

  @Input()
  set gridConfig(val: IccGridConfig) {
    this._gridConfig = val;
    //this.setViewportPageSize();
  }
  get gridConfig(): IccGridConfig {
    return this._gridConfig;
  }

  @Input()
  set gridData(data: T[]) {
    console.log(' set new data=', data)
    this._gridData = data;
    this.dataChanged$.next(data);
  }
  get gridData(): T[] {
    return this._gridData;
  }

  @Output() columnHeaderPosition = new EventEmitter<number>();

  constructor() {
    /*
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
*/

  }


  trackByIndex(index: number): number {
    return index;
  }

  onViewportScroll(event: any): void {
    this.columnHeaderPosition.emit(-event.target.scrollLeft);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: MouseEvent) {
    ///this.sizeChanged$.next(event);
  }

  ngOnDestroy(): void {
    this.sizeChanged$.complete();
    this.dataChanged$.complete();
  }
}
