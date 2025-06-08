import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  inject,
  input,
  OnInit,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { IccObjectType } from '@icc/ui/core';
import { defaultSelectFieldConfig, defaultTextFieldConfig, IccFormField } from '@icc/ui/fields';
import { IccColumnConfig, IccGridConfig, IccGridSetting } from '../../models/grid-column.model';
import { IccDateRangeFilterComponent } from './date-range/date-range-filter.component';
import { IccNumberFilterComponent } from './number/number-filter.component';
import { IccSelectFilterComponent } from './select/select-filter.component';
import { IccTextFilterComponent } from './text/text-filter.component';

export interface IccColumnFilterInstance {
  gridSetting: IccGridSetting;
  gridConfig: IccGridConfig;
  fieldConfig: Partial<IccFormField>;
  column: IccColumnConfig;
}

@Component({
  selector: 'icc-column-filter',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IccColumnFilterComponent implements OnInit {
  private readonly viewContainerRef = inject(ViewContainerRef);
  private instance!: IccColumnFilterInstance;
  private _componentRef: ComponentRef<unknown> | undefined;
  gridSetting = input.required({
    transform: (gridSetting: IccGridSetting) => {
      if (gridSetting && this._componentRef) {
        this.instance.gridSetting = gridSetting;
      }
      return gridSetting;
    },
  });
  column = input.required({
    transform: (column: IccColumnConfig) => {
      if (column && this._componentRef) {
        this.loadComponent(column);
      }
      return column;
    },
  });
  gridConfig = input.required({
    transform: (gridConfig: IccGridConfig) => {
      if (gridConfig && this._componentRef) {
        this.instance.gridConfig = gridConfig;
      }
      return gridConfig;
    },
  });

  ngOnInit(): void {
    this.loadComponent(this.column());
  }

  private loadComponent(column: IccColumnConfig): void {
    this._componentRef = undefined;
    this.viewContainerRef.clear();
    const filterType = this.getFilterType(column);

    const cellComponent = this.getFilterTypeComponent(filterType);
    this._componentRef = this.viewContainerRef.createComponent(cellComponent);
    this.instance = this._componentRef.instance as IccColumnFilterInstance;
    if (column.filterFieldConfig) {
      this.instance.fieldConfig = column.filterFieldConfig;
    }
    this.instance.column = column;
    this.instance.gridSetting = this.gridSetting();
    this.instance.gridConfig = this.gridConfig();
  }

  private getFilterType(column: IccColumnConfig): string {
    if (typeof column.filterField === 'string') {
      return column.filterField;
    } else if (column.filterFieldConfig?.fieldType) {
      return column.filterFieldConfig?.fieldType;
    }
    return IccObjectType.Text;
  }

  private getFilterTypeComponent(filterType: string): Type<unknown> {
    if (filterType === IccObjectType.Select) {
      return IccSelectFilterComponent;
    } else if (filterType === IccObjectType.Number) {
      return IccNumberFilterComponent;
    } else if (filterType === IccObjectType.DateRange) {
      return IccDateRangeFilterComponent;
    }
    return IccTextFilterComponent;
  }

  private getFilterFieldConfig(filterType: string, column: IccColumnConfig): IccFormField {
    if (filterType === 'select') {
      return {
        ...defaultSelectFieldConfig,
        ...column.filterFieldConfig, // TODO
      };
    }
    return {
      ...defaultTextFieldConfig,
    };
  }
}
