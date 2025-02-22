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
import { IccObjectType } from '@icc/ui/core';
import { IccColumnConfig, IccGridCell, IccGridConfig } from '../../../models/grid-column.model';
import { IccCellEditDateComponent } from './cell-edit/date/cell-edit-date.component';
import { IccCellEditNumberComponent } from './cell-edit/number/cell-edit-number.component';
import { IccCellEditSelectComponent } from './cell-edit/select/cell-edit-select.component';
import { IccCellEditTextComponent } from './cell-edit/text/cell-edit-text.component';

@Component({
  selector: 'icc-grid-cell-edit',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class IccGridCellEditComponent<T> implements OnInit {
  private viewContainerRef = inject(ViewContainerRef);
  private instance!: IccGridCell<T>;
  private _componentRef!: ComponentRef<unknown>;
  private _column!: IccColumnConfig;

  @Input() gridConfig!: IccGridConfig;
  @Input() rowIndex!: number;

  @Input()
  set column(val: IccColumnConfig) {
    this._column = { ...val };
    if (this._componentRef) {
      this.loadComponent();
    }
  }
  get column(): IccColumnConfig {
    return this._column;
  }

  private _record!: T;

  @Input()
  set record(data: T) {
    this._record = data;
    if (this._componentRef) {
      this.instance.record = this.record;
    }
  }
  get record(): T {
    return this._record;
  }

  ngOnInit(): void {
    this.loadComponent();
  }

  private loadComponent(): void {
    this.viewContainerRef.clear();
    const cellComponent = this.getRenderer();
    this._componentRef = this.viewContainerRef.createComponent(cellComponent);
    this.instance = this._componentRef.instance as IccGridCell<T>;
    this.instance.column = this.column;
    this.instance.rowIndex = this.rowIndex;
    this.instance.record = this.record;
    this.instance.gridConfig = this.gridConfig;
  }

  private getRenderer(): Type<unknown> {
    switch (this.column.rendererType) {
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
