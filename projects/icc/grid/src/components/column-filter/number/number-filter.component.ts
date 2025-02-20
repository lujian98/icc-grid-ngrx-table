import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IccNumberFieldComponent, IccNumberFieldConfig } from '@icc/ui/fields';
import { IccFieldFilterComponent } from '../field-filter.component';
import { IccTextFieldComponent, IccTextFieldConfig } from '@icc/ui/fields';

@Component({
  selector: 'icc-number-filter',
  templateUrl: './number-filter.component.html',
  styleUrls: ['number-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IccNumberFieldComponent, IccTextFieldComponent],
})
export class IccNumberFilterComponent extends IccFieldFilterComponent {
  override fieldConfig!: Partial<IccTextFieldConfig>;

  override checkField(): void {
    this.fieldConfig = {
      fieldName: this.column.name,
      clearValue: true,
      placeholder: `Filter... > < <= >= = null !null`,
      editable: true,
    };
  }

  override set value(val: string) {
    this._value = val;
  }

  override get value(): string {
    return this._value as string;
  }

  onValueChange(value: string): void {
    this.filterChanged$.next(value);
  }
}
