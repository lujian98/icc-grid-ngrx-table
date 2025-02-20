import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, inject } from '@angular/core';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, skip, switchMap, takeUntil } from 'rxjs/operators';
import { TranslatePipe } from '@ngx-translate/core';
import { IccInputDirective } from '@icc/ui/form-field';
import { IccLayoutFooterEndComponent, IccLayoutFooterComponent } from '@icc/ui/layout';
import { IccGridFacade } from '../../+state/grid.facade';
import { IccGridConfig } from '../../models/grid-column.model';
import { IccButtonComponent } from '@icc/ui/button';

@Component({
  selector: 'icc-grid-footer',
  templateUrl: './grid-footer.component.html',
  styleUrls: ['./grid-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TranslatePipe,
    IccInputDirective,
    IccButtonComponent,
    IccLayoutFooterComponent,
    IccLayoutFooterEndComponent,
  ],
})
export class IccGridFooterComponent implements OnDestroy {
  private gridFacade = inject(IccGridFacade);
  private _gridConfig!: IccGridConfig;
  private _page: number = 1;
  protected destroy$ = new Subject<void>();
  valueChanged$: BehaviorSubject<number> = new BehaviorSubject(0);

  @Input()
  set gridConfig(val: IccGridConfig) {
    this._gridConfig = { ...val };
    this.page = val.page;
  }
  get gridConfig(): IccGridConfig {
    return this._gridConfig;
  }

  set page(val: number) {
    this._page = val;
  }
  get page(): number {
    return this._page;
  }

  get lastPage(): number {
    return Math.ceil(this.gridConfig.totalCounts / this.gridConfig.pageSize) - 0;
  }

  get displaying(): string {
    const start = (this.gridConfig.page - 1) * this.gridConfig.pageSize + 1;
    let end = start + this.gridConfig.pageSize - 1;
    if (end > this.gridConfig.totalCounts) {
      end = this.gridConfig.totalCounts;
    }
    return `${start} - ${end}`;
  }

  constructor() {
    this.valueChanged$
      .pipe(
        skip(1),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((page) => {
          return of(page).pipe(takeUntil(this.valueChanged$.pipe(skip(1))));
        }),
        takeUntil(this.destroy$),
      )
      .subscribe((page) => {
        this.getGridPageData(this.page);
      });
  }

  refreshData(page: number): void {
    if (this.gridConfig.virtualScroll) {
      this.getGridPageData(1);
    } else {
      this.getGridPageData(page);
    }
  }

  getGridPageData(page: number): void {
    this.gridFacade.getGridPageData(this.gridConfig, page);
  }

  valueChanged(event: Event): void {
    const target = event.target as HTMLInputElement;
    let page: number = parseInt(target.value) | 1;
    if (page < 1) {
      page = 1;
    } else if (page > this.lastPage) {
      page = this.lastPage;
    }
    this.page = page;
    this.valueChanged$.next(page);
  }

  ngOnDestroy(): void {
    this.valueChanged$.next(0);
    this.valueChanged$.complete();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
