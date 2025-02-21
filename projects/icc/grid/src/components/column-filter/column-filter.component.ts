import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  inject,
  Input,
  OnInit,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { defaultSelectFieldConfig, defaultTextFieldConfig, IccFormField } from '@icc/ui/fields';
import { IccColumnConfig, IccFieldType, IccGridConfig } from '../../models/grid-column.model';
import { IccDateRangeFilterComponent } from './date-range/date-range-filter.component';
import { IccNumberFilterComponent } from './number/number-filter.component';
import { IccSelectFilterComponent } from './select/select-filter.component';
import { IccTextFilterComponent } from './text/text-filter.component';

export interface IccDynamicColumnFilter {
  gridConfig: IccGridConfig;
  fieldConfig: Partial<IccFormField>;
  column: IccColumnConfig;
}

@Component({
  selector: 'icc-column-filter',
  templateUrl: 'column-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class IccColumnFilterComponent implements OnInit {
  private viewContainerRef = inject(ViewContainerRef);
  private instance!: IccDynamicColumnFilter;
  private _componentRef: ComponentRef<unknown> | undefined;
  private _gridConfig!: IccGridConfig;
  private _column!: IccColumnConfig;

  @Input()
  set column(val: IccColumnConfig) {
    this._column = { ...val };
    if (this._componentRef) {
      this._componentRef = undefined;
      this.viewContainerRef.clear();
      this.loadComponent();
    }
  }
  get column(): IccColumnConfig {
    return this._column;
  }

  @Input()
  set gridConfig(value: IccGridConfig) {
    this._gridConfig = value;
    if (this._componentRef) {
      this.instance.gridConfig = this.gridConfig;
    }
  }
  get gridConfig(): IccGridConfig {
    return this._gridConfig;
  }

  ngOnInit(): void {
    this.viewContainerRef.clear();
    this.loadComponent();
  }

  private loadComponent(): void {
    const filterType = this.getFilterType(this.column);

    const cellComponent = this.getFilterTypeComponent(filterType);
    this._componentRef = this.viewContainerRef.createComponent(cellComponent);
    this.instance = this._componentRef.instance as IccDynamicColumnFilter;
    if (this.column.filterFieldConfig) {
      this.instance.fieldConfig = this.column.filterFieldConfig;
    }
    this.instance.column = this.column;
    this.instance.gridConfig = this.gridConfig;
  }

  private getFilterType(column: IccColumnConfig): string {
    if (typeof column.filterField === 'string') {
      return column.filterField;
    } else if (column.filterFieldConfig?.fieldType) {
      return column.filterFieldConfig?.fieldType;
    }
    return IccFieldType.Text;
  }

  private getFilterTypeComponent(filterType: string): Type<unknown> {
    console.log(' filterType =', filterType);
    if (filterType === IccFieldType.Select) {
      return IccSelectFilterComponent;
    } else if (filterType === IccFieldType.Number) {
      return IccNumberFilterComponent;
    } else if (filterType === IccFieldType.DateRange) {
      return IccDateRangeFilterComponent;
    }
    return IccTextFilterComponent;
  }

  private getFilterFieldConfig(filterType: string): IccFormField {
    if (filterType === 'select') {
      return {
        ...defaultSelectFieldConfig,
        ...this.column.filterFieldConfig,
      };
    }
    return {
      ...defaultTextFieldConfig,
    };
  }
}
