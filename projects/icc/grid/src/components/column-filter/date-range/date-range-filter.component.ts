import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IccDateRangeFieldComponent, IccDateRangeFieldConfig, IccDateRange } from '@icc/ui/fields';
import { IccFieldFilterComponent } from '../field-filter.component';

@Component({
  selector: 'icc-date-range-filter',
  templateUrl: './date-range-filter.component.html',
  styleUrls: ['date-range-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IccDateRangeFieldComponent],
})
export class IccDateRangeFilterComponent extends IccFieldFilterComponent {
  // @ts-ignore
  fieldConfig!: Partial<IccDateRangeFieldConfig>;

  override checkField(): void {
    this.fieldConfig = {
      fieldName: this.column.name,
      clearValue: true,
      placeholder: `ICC.UI.GRID.FILTER`,
      editable: true,
    };
  }

  override set value(val: IccDateRange) {
    this._value = val;
  }

  override get value(): IccDateRange {
    return this._value as IccDateRange;
  }

  onValueChange(value: IccDateRange | null): void {
    this.filterChanged$.next(value);
  }
}
