import { ChangeDetectionStrategy, Component, Input, OnInit, inject, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IccTextFilterComponent } from './text/text-filter.component';
import { IccSelectFilterComponent } from './select/select-filter.component';
import { IccGridConfig, IccColumnConfig } from '../../models/grid-column.model';

@Component({
  selector: 'icc-column-filter',
  templateUrl: 'column-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IccTextFilterComponent, IccSelectFilterComponent],
})
export class IccColumnFilterComponent implements OnInit {
  private componentMapper: { [index: string]: any } = {
    text: IccTextFilterComponent,
    number: IccTextFilterComponent,
    select: IccSelectFilterComponent,
  };

  private viewContainerRef = inject(ViewContainerRef);
  private _componentRef: any;
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
    // TODO if pass this.column.component  to dynamic components
    const cellComponent = this.componentMapper[filterType]; //IccTextFilterComponent;
    this._componentRef = this.viewContainerRef.createComponent(cellComponent);
    this._componentRef.instance.column = this.column;
    this._componentRef.instance.gridConfig = this.gridConfig;
  }
}
