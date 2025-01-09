import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IccTextFieldComponent, IccTextFieldConfig } from '@icc/ui/fields';
import { IccFieldFilterComponent } from '../field-filter.component';

@Component({
  selector: 'icc-text-filter',
  templateUrl: './text-filter.component.html',
  styleUrls: ['text-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IccTextFieldComponent, IccFieldFilterComponent],
})
export class IccTextFilterComponent extends IccFieldFilterComponent {
  fieldConfig!: Partial<IccTextFieldConfig>;

  override checkField(): void {
    this.fieldConfig = {
      fieldName: this.column.name,
      clearValue: true,
      placeholder: `ICC.UI.GRID.FILTER`,
      editable: true,
    };
  }

  onValueChange(value: string): void {
    this.filterChanged$.next(value);
  }
}
