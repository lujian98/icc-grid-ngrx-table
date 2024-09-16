import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  inject,
} from '@angular/core';
import { BehaviorSubject, debounceTime, distinctUntilChanged, of, skip, switchMap, takeUntil } from 'rxjs';
import { IccGridFacade } from '../../+state/grid.facade';
import { IccColumnConfig, IccGridConfig } from '../../models/grid-column.model';

@Component({
  selector: 'icc-field-filter',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class IccFieldFilterComponent implements AfterViewInit, OnDestroy {
  changeDetectorRef = inject(ChangeDetectorRef);
  filterChanged$: BehaviorSubject<any> = new BehaviorSubject({});
  private gridFacade = inject(IccGridFacade);
  private _value: string = '';
  _gridConfig!: IccGridConfig;
  column!: IccColumnConfig;

  @Input()
  set gridConfig(value: IccGridConfig) {
    this._gridConfig = value;
    if (this.column.filterField === 'select') {
      this.checkSelectField();
    }

    const find = this.gridConfig.columnFilters.find((column) => column.name === this.column.name);
    if (find) {
      this.value = find.value as string;
    } else {
      this.value = this.column.filterField === 'select' ? [] : '';
    }
    this.changeDetectorRef.markForCheck();
  }
  get gridConfig(): IccGridConfig {
    return this._gridConfig;
  }

  set value(val: any) {
    this._value = val;
  }

  get value(): any {
    return this._value;
  }

  ngAfterViewInit(): void {
    this.filterChanged$
      .pipe(
        skip(1),
        debounceTime(250),
        distinctUntilChanged(),
        switchMap((filterValue) => of(filterValue).pipe(takeUntil(this.filterChanged$.pipe(skip(1))))),
      )
      .subscribe((filterValue) => this.applyFilter(filterValue));
  }

  checkSelectField(): void {}

  applyFilter(filterValue: string): void {
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
    console.log(' 22222 call  change value=', filterValue);
    this.gridFacade.setGridColumnFilters(this.gridConfig.gridId, columnFilters);
  }

  ngOnDestroy(): void {
    this.filterChanged$.complete();
  }
}
