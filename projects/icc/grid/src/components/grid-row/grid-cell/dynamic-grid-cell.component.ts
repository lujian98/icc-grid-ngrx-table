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
import { IccColumnConfig, IccFieldType, IccGridConfig } from '../../../models/grid-column.model';
import { IccGridCellDateComponent } from '../grid-cell-renderer/date/grid-cell-date.component';
import { IccGridCellFunctionComponent } from '../grid-cell-renderer/function/grid-cell-function.component';
import { IccGridCellImageComponent } from '../grid-cell-renderer/image/grid-cell-image.component';
import { IccGridCellNumberComponent } from '../grid-cell-renderer/number/grid-cell-number.component';
import { IccGridCellSelectComponent } from '../grid-cell-renderer/select/grid-cell-select.component';
import { IccGridCellTextComponent } from '../grid-cell-renderer/text/grid-cell-text.component';

export interface IccDynamicGridCell<T> {
  gridConfig: IccGridConfig;
  rowIndex: number;
  column: IccColumnConfig;
  record: T;
}

@Component({
  selector: 'icc-dynamic-grid-cell',
  templateUrl: 'dynamic-grid-cell.component.html',
  styleUrls: ['dynamic-grid-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class IccDynamicGridCellComponent<T> implements OnInit {
  private viewContainerRef = inject(ViewContainerRef);
  private instance!: IccDynamicGridCell<T>;
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
    this.instance = this._componentRef.instance as IccDynamicGridCell<T>;
    this.instance.gridConfig = this.gridConfig;
    this.instance.rowIndex = this.rowIndex;
    this.instance.column = this.column;
    this.instance.record = this.record;
  }

  private getRenderer(): Type<unknown> {
    if (this.column.component) {
      return this.column.component;
    } else if (this.column.renderer) {
      return IccGridCellFunctionComponent;
    } else if (this.column.rendererType === IccFieldType.Image) {
      return IccGridCellImageComponent;
    } else if (this.column.rendererType === IccFieldType.Date) {
      return IccGridCellDateComponent;
    } else if (this.column.rendererType === IccFieldType.Number) {
      return IccGridCellNumberComponent;
    } else if (this.column.rendererType === IccFieldType.Select) {
      return IccGridCellSelectComponent;
    }
    return IccGridCellTextComponent;
  }
}
