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
import { IccColumnConfig, IccGridConfig, IccRendererType } from '../../../models/grid-column.model';
import { IccGridCellFunctionComponent } from '../grid-cell-renderer/function/grid-cell-function.component';
import { IccGridCellImageComponent } from '../grid-cell-renderer/image/grid-cell-image.component';
import { IccGridCellTextComponent } from '../grid-cell-renderer/text/grid-cell-text.component';

@Component({
  selector: 'icc-dynamic-grid-cell',
  templateUrl: 'dynamic-grid-cell.component.html',
  styleUrls: ['dynamic-grid-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class IccDynamicGridCellComponent<T> implements OnInit {
  private viewContainerRef = inject(ViewContainerRef);
  private _componentRef!: ComponentRef<any>;
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
      this._componentRef.instance.record = this.record;
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
    this._componentRef.instance.gridConfig = this.gridConfig;
    this._componentRef.instance.rowIndex = this.rowIndex;
    this._componentRef.instance.column = this.column;
    this._componentRef.instance.record = this.record;
  }

  private getRenderer(): Type<unknown> {
    if (this.column.component) {
      return this.column.component;
    } else if (this.column.renderer) {
      return IccGridCellFunctionComponent;
    } else if (this.column.rendererType === IccRendererType.Image) {
      return IccGridCellImageComponent;
    }
    return IccGridCellTextComponent;
  }
}
