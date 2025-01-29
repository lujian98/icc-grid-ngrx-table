import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IccSelectFieldComponent, IccSelectFieldConfig, defaultSelectFieldConfig } from '@icc/ui/fields';
import { IccFieldFilterComponent } from '../field-filter.component';

@Component({
  selector: 'icc-select-filter',
  templateUrl: './select-filter.component.html',
  styleUrls: ['select-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IccSelectFieldComponent],
})
export class IccSelectFilterComponent extends IccFieldFilterComponent {
  override fieldConfig!: Partial<IccSelectFieldConfig>;

  override checkField(): void {
    const fieldConfig = {
      ...defaultSelectFieldConfig,
      fieldName: this.column.name,
      clearValue: true,
      urlKey: this.gridConfig.urlKey,
      remoteOptions: true,
      editable: true,
      placeholder: `ICC.UI.GRID.FILTER`,
    };
    this.fieldConfig = this.fieldConfig ? { ...fieldConfig, ...this.fieldConfig } : { ...fieldConfig };
    this.column.filterFieldConfig = { ...this.fieldConfig };
  }

  onSelectionChange<T>(value: T[]): void {
    if (Array.isArray(value)) {
      this.applyFilter(value);
    }
  }
}
