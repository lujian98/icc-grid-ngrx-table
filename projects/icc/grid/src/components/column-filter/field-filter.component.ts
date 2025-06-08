import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, inject } from '@angular/core';
import { IccObjectType } from '@icc/ui/core';
import { IccFormField } from '@icc/ui/fields';
import { BehaviorSubject, Subject, debounceTime, of, skip, switchMap, takeUntil } from 'rxjs';
import { IccGridFacade } from '../../+state/grid.facade';
import { IccColumnConfig, IccFilterValueType, IccGridConfig, IccGridSetting } from '../../models/grid-column.model';

@Component({
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IccFieldFilterComponent implements AfterViewInit, OnDestroy {
  private readonly gridFacade = inject(IccGridFacade);
  protected readonly destroy$ = new Subject<void>();
  protected _value: IccFilterValueType = '';

  changeDetectorRef = inject(ChangeDetectorRef);
  filterChanged$ = new BehaviorSubject<IccFilterValueType>(null);
  private _gridConfig!: IccGridConfig;
  column!: IccColumnConfig;
  fieldConfig!: Partial<IccFormField>;

  gridSetting!: IccGridSetting;
  set gridConfig(value: IccGridConfig) {
    this._gridConfig = { ...value };
    this.checkField();

    const find = this.gridConfig.columnFilters.find((column) => column.name === this.column.name);
    if (find) {
      this.value = find.value as string;
    } else {
      this.value = this.column.filterField === IccObjectType.Select ? [] : '';
    }
    this.changeDetectorRef.markForCheck();
  }
  get gridConfig(): IccGridConfig {
    return this._gridConfig;
  }

  set value(val: IccFilterValueType) {
    this._value = val;
  }

  get value(): IccFilterValueType {
    return this._value;
  }

  ngAfterViewInit(): void {
    this.filterChanged$
      .pipe(
        skip(1),
        debounceTime(500),
        //distinctUntilChanged(), //WARNING not need distinct change here
        switchMap((filterValue) => of(filterValue).pipe(takeUntil(this.filterChanged$.pipe(skip(1))))),
        takeUntil(this.destroy$),
      )
      .subscribe((filterValue) => {
        this.applyFilter(filterValue);
      });
  }

  checkField(): void {}

  applyFilter(filterValue: IccFilterValueType): void {
    this.value = filterValue;
    let columnFilters = [...this.gridConfig.columnFilters];

    const find = this.gridConfig.columnFilters.find((column) => column.name === this.column.name);
    if (find) {
      columnFilters = columnFilters.filter((col) => col.name !== this.column.name);
    }
    if (this.value) {
      columnFilters.push({
        name: this.column.name,
        value: this.value,
      });
    }
    this.gridFacade.setGridColumnFilters(this.gridConfig, this.gridSetting, columnFilters);
  }

  ngOnDestroy(): void {
    this.filterChanged$.next(null);
    this.filterChanged$.complete();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
