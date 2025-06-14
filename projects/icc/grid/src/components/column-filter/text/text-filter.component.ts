import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IccTextFieldComponent, IccTextFieldConfig } from '@icc/ui/fields';
import { IccFieldFilterComponent } from '../field-filter.component';

@Component({
  selector: 'icc-text-filter',
  templateUrl: './text-filter.component.html',
  styleUrls: ['text-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IccTextFieldComponent],
})
export class IccTextFilterComponent extends IccFieldFilterComponent {
  override fieldConfig!: Partial<IccTextFieldConfig>;

  override checkField(): void {
    this.fieldConfig = {
      fieldName: this.column.name,
      clearValue: true,
      placeholder: `ICC.UI.GRID.FILTER`,
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
