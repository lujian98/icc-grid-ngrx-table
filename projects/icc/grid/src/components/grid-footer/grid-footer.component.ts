import { ChangeDetectionStrategy, Component, OnDestroy, ViewChild, effect, inject, input, signal } from '@angular/core';
import { IccButtonComponent } from '@icc/ui/button';
import { IccNumberFieldComponent, IccNumberFieldConfig, defaultNumberFieldConfig } from '@icc/ui/fields';
import { IccIconModule } from '@icc/ui/icon';
import { IccLayoutFooterComponent, IccLayoutFooterEndComponent } from '@icc/ui/layout';
import { TranslatePipe } from '@ngx-translate/core';
import { BehaviorSubject, Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, skip, switchMap, takeUntil } from 'rxjs/operators';
import { IccGridFacade } from '../../+state/grid.facade';
import { IccGridConfig, IccGridSetting } from '../../models/grid-column.model';

@Component({
  selector: 'icc-grid-footer',
  templateUrl: './grid-footer.component.html',
  styleUrls: ['./grid-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IccIconModule,
    TranslatePipe,
    IccNumberFieldComponent,
    IccButtonComponent,
    IccLayoutFooterComponent,
    IccLayoutFooterEndComponent,
  ],
})
export class IccGridFooterComponent implements OnDestroy {
  private readonly gridFacade = inject(IccGridFacade);
  private destroy$ = new Subject<void>();
  valueChanged$: BehaviorSubject<number> = new BehaviorSubject(0);
  gridSetting = input.required<IccGridSetting>();
  gridConfig = input.required<IccGridConfig>();
  fieldConfig = signal<IccNumberFieldConfig | undefined>(undefined);
  page: number = 1;

  get lastPage(): number {
    return Math.ceil(this.gridSetting().totalCounts / this.gridConfig().pageSize) - 0;
  }

  get displaying(): string {
    const start = (this.gridConfig().page - 1) * this.gridConfig().pageSize + 1;
    let end = start + this.gridConfig().pageSize - 1;
    if (end > this.gridSetting().totalCounts) {
      end = this.gridSetting().totalCounts;
    }
    return `${start} - ${end}`;
  }

  @ViewChild(IccNumberFieldComponent, { static: true }) pageField!: IccNumberFieldComponent;

  constructor() {
    effect(() => {
      if (this.gridConfig()) {
        this.page = this.gridConfig().page;
        this.fieldConfig.set({
          ...defaultNumberFieldConfig,
          fieldLabel: 'ICC.UI.GRID.PAGE',
          editable: true,
          minValue: 1,
          maxValue: this.lastPage,
          labelWidth: 25,
          fieldWidth: 50,
        });
      }
    });
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
    if (this.gridConfig().virtualScroll) {
      this.getGridPageData(1);
    } else {
      this.getGridPageData(page);
    }
  }

  getGridPageData(page: number): void {
    this.gridFacade.getGridPageData(this.gridSetting().gridId, page);
  }

  onValueChange(page: number | null): void {
    if (page !== null) {
      if (page < 1) {
        page = 1;
        this.pageField.patchValue(page);
      } else if (page > this.lastPage) {
        page = this.lastPage;
        this.pageField.patchValue(page);
      }
      this.page = page;
      this.valueChanged$.next(page);
    }
  }

  ngOnDestroy(): void {
    this.valueChanged$.next(0);
    this.valueChanged$.complete();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
