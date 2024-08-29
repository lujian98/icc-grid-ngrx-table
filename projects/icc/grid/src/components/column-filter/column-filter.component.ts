import { ChangeDetectionStrategy, Component, Input, OnInit, inject, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IccTextFilterComponent } from './text/text-filter.component';
import { IccGridConfig, IccColumnConfig } from '../../models/grid-column.model';

@Component({
  selector: 'icc-column-filter',
  templateUrl: 'column-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    IccTextFilterComponent,
  ],
})
export class IccColumnFilterComponent implements OnInit {
  private viewContainerRef = inject(ViewContainerRef);
  private _componentRef: any;
  private _gridConfig!: IccGridConfig;

  @Input() column!: IccColumnConfig;

  @Input()
  set gridConfig(value: IccGridConfig) {
    this._gridConfig = value;
    if(this._componentRef) {
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
    const cellComponent = IccTextFilterComponent; // this.column.component || // to dynamic components
    this._componentRef = this.viewContainerRef.createComponent(cellComponent);
    this._componentRef.instance.column = this.column;
    this._componentRef.instance.gridConfig = this.gridConfig;
  }
}
