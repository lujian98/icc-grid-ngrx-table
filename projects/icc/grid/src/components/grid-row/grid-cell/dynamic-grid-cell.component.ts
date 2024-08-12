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

  @Input() column!: IccColumnConfig;
  @Input() record: any;

  //@ViewChild(IccGridCellDirective, {read: ViewContainerRef, static: true}) cellHost!: ViewContainerRef;


  ngOnInit(): void {
    this.viewContainerRef.clear();
    this.loadComponent();
  }

  private loadComponent(): void {
    const cellComponent = IccGridCellViewComponent; // this.column.component || // to dynamic components
    const componentRef = this.viewContainerRef.createComponent(cellComponent);
    componentRef.instance.column = this.column;
    componentRef.instance.record = this.record;
  }
}
