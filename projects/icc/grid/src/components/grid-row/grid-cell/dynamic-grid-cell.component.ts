import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
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
  /*
  @Input() row: any;
  @Input() data: any;
  @Input() column: any;
  */
  @Input() column!: IccColumnConfig;
  @Input() record: any;

  //@ViewChild(IccGridCellDirective, {read: ViewContainerRef, static: true}) cellHost!: ViewContainerRef;

  constructor(private container: ViewContainerRef) {}

  ngOnInit(): void {
    this.container.clear();
    this.loadComponent();
  }

  private loadComponent(): void {
    const cellComponent = IccGridCellViewComponent; // this.column.component ||
    const componentRef = this.container.createComponent(cellComponent);
    componentRef.instance.column = this.column;
    componentRef.instance.record = this.record;
  }
}
