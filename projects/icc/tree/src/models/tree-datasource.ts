import { CollectionViewer, DataSource, ListRange } from '@angular/cdk/collections';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { BehaviorSubject, combineLatest, Observable, of, Subscription } from 'rxjs';
import { map, shareReplay, startWith } from 'rxjs/operators';
import { ArrayDataSource } from '@angular/cdk/collections';

export class IccTreeDataSource<T> extends DataSource<T> {
  protected recordsSubject = new BehaviorSubject<T[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  //protected visibleData$: Observable<T[]>;
  //private _data: T[] = [];
  //readonly queryData$: Observable<T[]>;
  public loading$ = this.loadingSubject.asObservable();

  //private _dataSourceService: IccAbstractDataService<T>;
  //private subDataSourceService: Subscription;

  get data(): T[] {
    return this._data;
  }

  set data(data: T[]) {
    this._data = data;
    //this.recordsSubject.next(data);
  }

  constructor(private _data: T[]) {
    super();
  }

  /*
  get visibleData(): T[] {
    let data: T[];
    this.visibleData$.subscribe((d) => (data = d)).unsubscribe();
    return data;
  }

  set dataSourceService(val: IccAbstractDataService<T>) {
    this._dataSourceService = val;
    this.subDataSourceService = this._dataSourceService.dataSourceChanged$.subscribe((data: T[]) =>
      this.loadRecords(data),
    );
  }

  get dataSourceService(): IccAbstractDataService<T> {
    return this._dataSourceService;
  }

  constructor(protected viewport: CdkVirtualScrollViewport) {
    super();
    const sliced = combineLatest(
      this.recordsSubject,
      this.viewport.renderedRangeStream.pipe(startWith({} as ListRange)),
    ).pipe(
      map(([data, range]) => {
        if (!range.end) {
          range = this.viewport.getRenderedRange();
        }
        console.log(' start=', range.start, ' end =', range.end, ' datalength=', data.length);
        return data.slice(range.start, range.end);
      }),
    );
    this.visibleData$ = sliced.pipe(shareReplay(1));
    this.queryData$ = this.recordsSubject.asObservable();
  }
    

  loadRecords(data: T[]) {
    this.data = data;
  }
    */

  connect(collectionViewer: CollectionViewer): Observable<T[]> {
    return of(this.data);
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.recordsSubject.complete();
    this.loadingSubject.complete();
  }
}
