import { ChangeDetectionStrategy, Component, Input, OnInit, inject, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { DataGridColumnWithId } from '../../../models';
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
export class IccDynamicGridCellComponent implements OnInit {
  private viewContainerRef = inject(ViewContainerRef);
  private _componentRef: any;

  @Input() column!: IccColumnConfig;
  private _record: any;

  @Input()
  set record(data: any) {
    this._record = data;
    if(this._componentRef) {
      //console.log( ' 22222 set record =', data)
      this._componentRef.instance.record = this.record;
    }
  }
  get record(): any {
    return this._record;
  }

  //@ViewChild(IccGridCellDirective, {read: ViewContainerRef, static: true}) cellHost!: ViewContainerRef;
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
