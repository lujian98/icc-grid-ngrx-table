import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { IccSelectFieldConfig, SelectFieldComponent, defaultSelectFieldConfig } from '@icc/ui/form-field';
import { IccGridFacade } from '../../../+state/grid.facade';
import { IccColumnConfig, IccGridConfig } from '../../../models/grid-column.model';

@Component({
  selector: 'icc-select-filter',
  templateUrl: './select-filter.component.html',
  styleUrls: ['select-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, SelectFieldComponent],
})
export class IccSelectFilterComponent {
  private gridFacade = inject(IccGridFacade);
  private _gridConfig!: IccGridConfig;
  column!: IccColumnConfig;
  private _value: any;
  fieldConfig!: IccSelectFieldConfig;

  @Input()
  set gridConfig(value: IccGridConfig) {
    this._gridConfig = value;
    this.fieldConfig = {
      ...defaultSelectFieldConfig,
      fieldName: this.column.name,
      remoteOptions: true,
      placeholder: 'Filter ...',
    };
    //console.log(' fieldConfig=', this.fieldConfig, ' column=', this.column);
    //console.log(' gridConfig=', value, ' column=', this.column)
    const find = this.gridConfig.columnFilters.find((column) => column.name === this.column.name);
    if (find) {
      this.value = find.value;
    }
  }
  get gridConfig(): IccGridConfig {
    return this._gridConfig;
  }

  set value(val: any) {
    this._value = val;
  }

  get value(): any {
    return this._value;
  }

  onSelectionChange<T>(value: any): void {
    //console.log(' filtr select change options=', value);
    this.applyFilter(value);
  }

  private applyFilter(filterValue: any): void {
    this.value = filterValue;
    let columnFilters = [...this.gridConfig.columnFilters];

    const find = this.gridConfig.columnFilters.find((column) => column.name === this.column.name);
    if (find) {
      columnFilters = columnFilters.filter((col) => col.name !== this.column.name);
    }
    if (this.value) {
      columnFilters.push({
        name: this.column.name,
        value: this.value,
      });
    }
    this.gridFacade.setGridColumnFilters(this.gridConfig.gridId, columnFilters);
  }
}
