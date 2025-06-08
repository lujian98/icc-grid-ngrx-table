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
import { IccColumnConfig, IccGridCell, IccGridConfig, IccGridSetting } from '../../../models/grid-column.model';
import { IccCellEditDateComponent } from './cell-edit/date/cell-edit-date.component';
import { IccCellEditNumberComponent } from './cell-edit/number/cell-edit-number.component';
import { IccCellEditSelectComponent } from './cell-edit/select/cell-edit-select.component';
import { IccCellEditTextComponent } from './cell-edit/text/cell-edit-text.component';

@Component({
  selector: 'icc-grid-cell-edit',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IccGridCellEditComponent<T> implements OnInit {
  private readonly viewContainerRef = inject(ViewContainerRef);
  private instance!: IccGridCell<T>;
  private _componentRef!: ComponentRef<unknown>;
  rowIndex = input<number>(0);
  gridConfig = input.required({
    transform: (gridConfig: IccGridConfig) => {
      if (gridConfig && this._componentRef) {
        this.instance.gridConfig = gridConfig;
      }
      return gridConfig;
    },
  });
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
  record = input.required({
    transform: (record: T) => {
      if (record && this._componentRef) {
        this.instance.record = record;
      }
      return record;
    },
  });

  ngOnInit(): void {
    this.loadComponent(this.column());
  }

  private loadComponent(column: IccColumnConfig): void {
    this.viewContainerRef.clear();
    const cellComponent = this.getRenderer(column);
    this._componentRef = this.viewContainerRef.createComponent(cellComponent);
    this.instance = this._componentRef.instance as IccGridCell<T>;
    this.instance.column = column;
    this.instance.rowIndex = this.rowIndex();
    this.instance.record = this.record();
    this.instance.gridConfig = this.gridConfig();
    this.instance.gridSetting = this.gridSetting();
  }

  private getRenderer(column: IccColumnConfig): Type<unknown> {
    switch (column.rendererType) {
      case IccObjectType.Text:
        return IccCellEditTextComponent;
      case IccObjectType.Select:
        return IccCellEditSelectComponent;
      case IccObjectType.Date:
        return IccCellEditDateComponent;
      case IccObjectType.Number:
        return IccCellEditNumberComponent;
      default:
        break;
    }
    return IccCellEditTextComponent;
  }
}
