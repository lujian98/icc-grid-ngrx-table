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
import { IccColumnConfig, IccGridCell, IccGridConfig } from '../../../models/grid-column.model';
import { IccGridCellDateComponent } from './renderer/date/grid-cell-date.component';
import { IccGridCellFunctionComponent } from './renderer/function/grid-cell-function.component';
import { IccGridCellImageComponent } from './renderer/image/grid-cell-image.component';
import { IccGridCellNumberComponent } from './renderer/number/grid-cell-number.component';
import { IccGridCellSelectComponent } from './renderer/select/grid-cell-select.component';
import { IccGridCellTextComponent } from './renderer/text/grid-cell-text.component';

@Component({
  selector: 'icc-grid-cell-view',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IccGridCellViewComponent<T> implements OnInit {
  private readonly viewContainerRef = inject(ViewContainerRef);
  private instance!: IccGridCell<T>;
  private _componentRef!: ComponentRef<unknown>;
  gridConfig = input.required<IccGridConfig>();
  rowIndex = input<number>(0);
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
    this.instance.gridConfig = this.gridConfig();
    this.instance.rowIndex = this.rowIndex();
    this.instance.column = column;
    this.instance.record = this.record();
  }

  private getRenderer(column: IccColumnConfig): Type<unknown> {
    switch (column.rendererType) {
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
        if (column.renderer) {
          return IccGridCellFunctionComponent;
        }
        break;
      case IccObjectType.Component:
        if (column.component) {
          return column.component!;
        }
        break;
      default:
        break;
    }
    return IccGridCellTextComponent;
  }
}
