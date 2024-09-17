import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IccSelectFieldConfig, SelectFieldComponent, defaultSelectFieldConfig } from '@icc/ui/fields';
import { IccFieldFilterComponent } from '../field-filter.component';

@Component({
  selector: 'icc-select-filter',
  templateUrl: './select-filter.component.html',
  styleUrls: ['select-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, SelectFieldComponent, IccFieldFilterComponent],
})
export class IccSelectFilterComponent extends IccFieldFilterComponent {
  fieldConfig!: IccSelectFieldConfig;

  override checkField(): void {
    this.fieldConfig = {
      ...defaultSelectFieldConfig,
      fieldName: this.column.name,
      urlKey: this.gridConfig.urlKey,
      remoteOptions: true,
      placeholder: 'Filter ...',
    };
  }

  onSelectionChange<T>(value: any): void {
    //console.log(' filtr select change options=', value);
    // TODO if mutiple select filter use this.filterChanged$.next(value);
    this.applyFilter(value);
  }
}
