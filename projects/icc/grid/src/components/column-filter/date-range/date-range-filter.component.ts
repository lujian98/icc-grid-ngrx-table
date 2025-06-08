import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  IccDateRange,
  IccDateRangeFieldComponent,
  IccDateRangeFieldConfig,
  defaultDateRangeFieldConfig,
} from '@icc/ui/fields';
import { IccFieldFilterComponent } from '../field-filter.component';

@Component({
  selector: 'icc-date-range-filter',
  templateUrl: './date-range-filter.component.html',
  styleUrls: ['date-range-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IccDateRangeFieldComponent],
})
export class IccDateRangeFilterComponent extends IccFieldFilterComponent {
  override fieldConfig!: Partial<IccDateRangeFieldConfig>;

  override checkField(): void {
    const today = new Date();
    this.fieldConfig = {
      ...defaultDateRangeFieldConfig,
      fieldName: this.column.name,
      clearValue: true,
      placeholder: `ICC.UI.GRID.FILTER`,
      editable: true,
      fromMinMax: { fromDate: null, toDate: new Date(today.getFullYear(), today.getMonth() + 1, 0) },
      toMinMax: { fromDate: new Date(today.getFullYear(), today.getMonth() + 1, 1), toDate: null },
    };
  }

  override set value(val: IccDateRange) {
    this._value = val;
  }

  override get value(): IccDateRange {
    return this._value as IccDateRange;
  }

  onValueChange(value: IccDateRange | null): void {
    if (this.value?.fromDate !== value?.fromDate || this.value?.toDate !== value?.toDate) {
      this.filterChanged$.next(value);
    }
  }
}
