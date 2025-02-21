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
import { IccColumnConfig, IccGridConfig, IccGridCell } from '../../../models/grid-column.model';
import { IccGridCellDateComponent } from './renderer/date/grid-cell-date.component';
import { IccGridCellFunctionComponent } from './renderer/function/grid-cell-function.component';
import { IccGridCellImageComponent } from './renderer/image/grid-cell-image.component';
import { IccGridCellNumberComponent } from './renderer/number/grid-cell-number.component';
import { IccGridCellSelectComponent } from './renderer/select/grid-cell-select.component';
import { IccGridCellTextComponent } from './renderer/text/grid-cell-text.component';

@Component({
  selector: 'icc-grid-cell-view',
  templateUrl: 'grid-cell-view.component.html',
  styleUrls: ['grid-cell-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class IccGridCellViewComponent<T> implements OnInit {
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
    this._record = { ...data };
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
    this.instance.gridConfig = this.gridConfig;
    this.instance.rowIndex = this.rowIndex;
    this.instance.column = this.column;
    this.instance.record = this.record;
  }

  private getRenderer(): Type<unknown> {
    switch (this.column.rendererType) {
      case IccObjectType.Text:
        return IccGridCellTextComponent;
      case IccObjectType.Select:
        return IccGridCellSelectComponent;
      case IccObjectType.Date:
        return IccGridCellDateComponent;
      case IccObjectType.Number:
        return IccGridCellNumberComponent;
      case IccObjectType.Image:
        return IccGridCellImageComponent;
      case IccObjectType.Function:
        if (this.column.renderer) {
          return IccGridCellFunctionComponent;
        }
        break;
      case IccObjectType.Component:
        if (this.column.component) {
          return this.column.component;
        }
        break;
      default:
        break;
    }
    return IccGridCellTextComponent;
  }
}
