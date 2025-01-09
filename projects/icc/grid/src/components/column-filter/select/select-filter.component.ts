import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IccSelectFieldConfig, IccSelectFieldComponent } from '@icc/ui/fields';
import { IccFieldFilterComponent } from '../field-filter.component';

@Component({
  selector: 'icc-select-filter',
  templateUrl: './select-filter.component.html',
  styleUrls: ['select-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IccSelectFieldComponent],
})
export class IccSelectFilterComponent extends IccFieldFilterComponent {
  fieldConfig!: Partial<IccSelectFieldConfig>;

  override checkField(): void {
    this.fieldConfig = {
      fieldName: this.column.name,
      clearValue: true,
      urlKey: this.gridConfig.urlKey,
      remoteOptions: true,
      editable: true,
      placeholder: 'Filter ...',
    };
  }

  onSelectionChange<T>(value: any): void {
    //console.log(' filtr select change options=', value);
    // TODO if mutiple select filter use this.filterChanged$.next(value);
    if (Array.isArray(value)) {
      this.applyFilter(value);
    } else {
      this.applyFilter([value]);
    }
  }
}
