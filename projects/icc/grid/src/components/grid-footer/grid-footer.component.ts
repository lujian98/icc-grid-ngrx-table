import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, inject } from '@angular/core';
import { IccButtonComponent } from '@icc/ui/button';
import { IccNumberFieldComponent, IccNumberFieldConfig, defaultNumberFieldConfig } from '@icc/ui/fields';
import { IccIconModule } from '@icc/ui/icon';
import { IccLayoutFooterComponent, IccLayoutFooterEndComponent } from '@icc/ui/layout';
import { TranslatePipe } from '@ngx-translate/core';
import { BehaviorSubject, Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, skip, switchMap, takeUntil } from 'rxjs/operators';
import { IccGridFacade } from '../../+state/grid.facade';
import { IccGridConfig } from '../../models/grid-column.model';

@Component({
  selector: 'icc-grid-footer',
  templateUrl: './grid-footer.component.html',
  styleUrls: ['./grid-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    IccIconModule,
    TranslatePipe,
    IccNumberFieldComponent,
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
  fieldConfig!: IccNumberFieldConfig;

  @Input()
  set gridConfig(val: IccGridConfig) {
    this._gridConfig = { ...val };
    this.page = val.page;

    this.fieldConfig = {
      ...defaultNumberFieldConfig,
      fieldLabel: 'ICC.UI.GRID.PAGE',
      editable: true,
      minValue: 1,
      maxValue: this.lastPage,
      labelWidth: 25,
      fieldWidth: 50,
    };
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
      .subscribe(() => this.getGridPageData(this.page));
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

  onValueChange(value: number | null): void {
    let page: number = (value as number) || 1;
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
