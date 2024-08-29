import { ChangeDetectionStrategy, Component, Input, OnInit, inject, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IccGridCellViewComponent } from './grid-cell-view.component';
import { IccColumnConfig } from '../../../models/grid-column.model';

@Component({
  selector: 'icc-dynamic-grid-cell',
  templateUrl: 'dynamic-grid-cell.component.html',
  styleUrls: ['dynamic-grid-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    IccGridCellViewComponent,
  ],
})
export class IccDynamicGridCellComponent<T> implements OnInit {
  private viewContainerRef = inject(ViewContainerRef);
  private _componentRef: any;

  @Input() column!: IccColumnConfig;
  private _record!: T;

  @Input()
  set record(data: T) {
    this._record = data;
    if(this._componentRef) {
      this._componentRef.instance.record = this.record;
    }
  }
  get record(): T {
    return this._record;
  }

  ngOnInit(): void {
    this.viewContainerRef.clear();
    this.loadComponent();
  }

  private loadComponent(): void {
    const cellComponent = IccGridCellViewComponent; // this.column.component || // to dynamic components
    this._componentRef = this.viewContainerRef.createComponent(cellComponent);
    this._componentRef.instance.column = this.column;
    this._componentRef.instance.record = this.record;
  }
}
