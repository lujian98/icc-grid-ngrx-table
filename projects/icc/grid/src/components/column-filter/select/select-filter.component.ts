import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IccSelectFieldComponent, IccSelectFieldConfig, defaultSelectFieldConfig, IccOptionType } from '@icc/ui/fields';
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
  options: IccOptionType[] = [];

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

    if (this.fieldConfig.options) {
      this.options = this.fieldConfig.options;
      delete this.fieldConfig.options;
    }
    this.column.filterFieldConfig = { ...this.fieldConfig };
    //console.log('fffff this.fieldConfig= ', this.fieldConfig);
  }

  override set value(val: string | string[] | object[]) {
    if (!val) {
      val = this.fieldConfig.multiSelection ? [] : '';
    }
    this._value = val;
  }

  override get value(): string | string[] | object[] {
    return this._value as string | string[] | object[];
  }

  onValueChange(value: string | object | string[] | object[]): void {
    //console.log(' filter value =', value);
    if (Array.isArray(value)) {
      this.applyFilter(value);
    } else {
      this.applyFilter((value ? [value] : []) as string[] | object[]);
    }
  }
}
