import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TextFieldComponent, IccTextFieldConfig, defaultTextFieldConfig } from '@icc/ui/fields';
import { IccFieldFilterComponent } from '../field-filter.component';

@Component({
  selector: 'icc-text-filter',
  templateUrl: './text-filter.component.html',
  styleUrls: ['text-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, TextFieldComponent, IccFieldFilterComponent],
})
export class IccTextFilterComponent extends IccFieldFilterComponent {
  //filterPlaceholder: string = 'Filter ...';

  fieldConfig!: IccTextFieldConfig;

  override checkField(): void {
    this.fieldConfig = {
      ...defaultTextFieldConfig,
      fieldName: this.column.name,
      placeholder: 'Filter ...',
    };
  }

  onValueChange(value: string): void {
    this.filterChanged$.next(value);
  }
}
