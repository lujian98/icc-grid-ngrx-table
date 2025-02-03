import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
  ViewContainerRef,
  ComponentRef,
  Type,
} from '@angular/core';
import { IccColumnConfig, IccGridConfig } from '../../models/grid-column.model';
import { IccSelectFilterComponent } from './select/select-filter.component';
import { IccTextFilterComponent } from './text/text-filter.component';
import { defaultTextFieldConfig, defaultSelectFieldConfig, IccFormField } from '@icc/ui/fields';

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
  private _componentRef: ComponentRef<unknown> | undefined;
  private instance!: IccDynamicColumnFilter;
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
    const filterType = typeof this.column.filterField === 'string' ? this.column.filterField : 'text';
    // TODO support input filter dynamic component

    const cellComponent = this.getFilterType(filterType);
    this._componentRef = this.viewContainerRef.createComponent(cellComponent);
    this.instance = this._componentRef.instance as IccDynamicColumnFilter;
    if (this.column.filterFieldConfig) {
      this.instance.fieldConfig = this.column.filterFieldConfig;
    }
    this.instance.column = this.column;
    this.instance.gridConfig = this.gridConfig;
  }

  private getFilterType(filterType: string): Type<unknown> {
    if (filterType === 'select') {
      return IccSelectFilterComponent;
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
