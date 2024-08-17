import { AfterViewChecked, ChangeDetectionStrategy, Component, Input, inject, Output, EventEmitter, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Observable } from 'rxjs';
import { IccGridFacade } from '../+state/grid.facade';
import { IccGridConfig, IccColumnConfig, IccGridData } from '../models/grid-column.model';
import { IccGridHeaderComponent } from './grid-header/grid-header.component';
import { IccGridHeaderItemComponent } from './grid-header/grid-header-item/grid-header-item.component';
import { IccGridViewportComponent } from './grid-viewport/grid-viewport.component';
import { IccGridRowComponent } from './grid-row/grid-row.component';
import { IccRowSelectComponent } from './row-select/row-select.component';
import { DragDropEvent } from '../models/drag-drop-event';
import { ColumnResizeEvent } from '../models/column-resize-event';

@Component({
  selector: 'icc-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    //ScrollingModule,
    IccGridHeaderComponent,
    IccGridHeaderItemComponent,
    //IccGridRowComponent,
    IccGridViewportComponent,
    IccRowSelectComponent,
  ],
})
export class IccGridViewComponent implements AfterViewChecked {
  private gridFacade = inject(IccGridFacade);
  private _gridConfig!: IccGridConfig;
  columnConfig$!: Observable<IccColumnConfig[]>;
  gridData$!: Observable<any[]>;

  @Input()
  set gridConfig(val: IccGridConfig) {
    console.log( ' 5555 gridConfig=', val)
    this._gridConfig = val;
    this.columnConfig$ = this.gridFacade.selectColumnConfig(val.gridName);
    this.gridData$ = this.gridFacade.selectGridData(val.gridName);
  }
  get gridConfig(): IccGridConfig {
    return this._gridConfig;
  }

  @Input()
  set columnConfig(columns: IccColumnConfig[]) {
    console.log( ' 6666 input IccColumnConfig =', columns)
    this.gridFacade.setupGridColumnConfig(this.gridConfig.gridName, columns);
  }

  @Input()
  set gridData(data: IccGridData<any>) { // TODO set local data here
    console.log( ' 7777 input grid data =', data)
    if(data) { // use set getGridDataSuccess ??
      //this.gridFacade.getGridData(this.gridConfig.gridName, data);
    }
  }

  @Input() allSelected = false;

  @Output() sortGrid = new EventEmitter<any>();
  @Output() filterGrid = new EventEmitter<any>();
  @Output() dropColumn = new EventEmitter<DragDropEvent>();
  @Output() columnResized = new EventEmitter<ColumnResizeEvent>();

  get displayedColumns(): string[] {
    return this.columnConfig.map((column) => column.name);
  }

  //@ViewChild(CdkVirtualScrollViewport) private viewport!: CdkVirtualScrollViewport;

  ngAfterViewChecked(): void {
    //const viewportSize = this.viewport.elementRef.nativeElement.getBoundingClientRect();
    //this.viewport.checkViewportSize();
    //console.log(' viewportSize=', viewportSize)
  }

  onToggleSelectAllRowsOnCurrentPage() {
    //console.log( ' view columnConfig=', this.columnConfig)
    //this.toggleSelectAllRowsOnCurrentPage.emit(!this.allSelected);
  }

  hasCheckboxSelection(): boolean {
    return true;
    //return isCheckboxSelection(this.selectionType);
  }

  checkSelected(index: number): boolean {
    return true;
    //return this.isRowSelected(index, this.selectedRowIndexes);
  }

  onDrop(events: any): void {
    //this.dropColumn.emit({ currentIndex, previousIndex });
  }

  onColumnResizing(events: any): void {
    //this.setColumnsStyle(updateColumnWidth(columnId, width, this.columnConfig));
  }
}
