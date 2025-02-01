import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
  ViewContainerRef,
  ComponentRef,
} from '@angular/core';
import { IccColumnConfig, IccGridConfig } from '../../models/grid-column.model';
import { IccSelectFilterComponent } from './select/select-filter.component';
import { IccTextFilterComponent } from './text/text-filter.component';
import { defaultTextFieldConfig, defaultSelectFieldConfig, IccFormField } from '@icc/ui/fields';

@Component({
  selector: 'icc-column-filter',
  templateUrl: 'column-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class IccColumnFilterComponent<T> implements OnInit {
  private componentMapper: { [index: string]: any } = {
    text: IccTextFilterComponent,
    number: IccTextFilterComponent,
    select: IccSelectFilterComponent,
  };

  private viewContainerRef = inject(ViewContainerRef);
  private _componentRef: ComponentRef<any> | undefined;
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
      this._componentRef.instance.gridConfig = this.gridConfig;
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

    const cellComponent = this.componentMapper[filterType];
    this._componentRef = this.viewContainerRef.createComponent(cellComponent);
    if (this.column.filterFieldConfig) {
      this._componentRef.instance.fieldConfig = this.column.filterFieldConfig;
    }
    this._componentRef.instance.column = this.column;
    this._componentRef.instance.gridConfig = this.gridConfig;
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
