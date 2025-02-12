import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IccNumberFieldComponent, IccNumberFieldConfig } from '@icc/ui/fields';
import { IccFieldFilterComponent } from '../field-filter.component';

@Component({
  selector: 'icc-number-filter',
  templateUrl: './number-filter.component.html',
  styleUrls: ['number-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IccNumberFieldComponent],
})
export class IccNumberFilterComponent extends IccFieldFilterComponent {
  override fieldConfig!: Partial<IccNumberFieldConfig>;

  override checkField(): void {
    this.fieldConfig = {
      fieldName: this.column.name,
      clearValue: true,
      placeholder: `ICC.UI.GRID.FILTER`,
      editable: true,
    };
  }

  override set value(val: number) {
    this._value = val;
  }

  override get value(): number {
    return this._value as number;
  }

  onValueChange(value: number | null): void {
    this.filterChanged$.next(value);
  }
}
