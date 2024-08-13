import { AfterViewChecked, ChangeDetectionStrategy, Component, Input, inject, Output, EventEmitter, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { DataSource } from '@angular/cdk/collections';
import { CdkTableModule } from '@angular/cdk/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { IccGridFacade } from '../+state/grid.facade';
import { IccGridConfig } from '../+state/grid.reducer';
import { IccColumnConfig } from '../models/grid-column.model';
import { IccGridHeaderComponent } from './grid-header/grid-header.component';
import { IccGridHeaderItemComponent } from './grid-header/grid-header-item/grid-header-item.component';
import { IccGridRowComponent } from './grid-row/grid-row.component';
import { IccRowSelectComponent } from './row-select/row-select.component';
import { DragDropEvent } from '../models/drag-drop-event';
import { ColumnResizeEvent } from '../models/column-resize-event';

export const FIXED_SIZE = Array(10000).fill(30);

@Component({
  selector: 'icc-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    ScrollingModule,
    //MatPaginatorModule,
    IccGridHeaderComponent,
    IccGridHeaderItemComponent,
    IccGridRowComponent,
    IccRowSelectComponent,
  ],
})
export class IccGridViewComponent implements AfterViewChecked {
  private gridFacade = inject(IccGridFacade);
  private _columnConfig: IccColumnConfig[] = [];
  private _gridConfig!: IccGridConfig;
  private _gridName: string = '';
  columnConfig$!: Observable<IccColumnConfig[]>;

  @Input()
  set gridName(val: string) {
    this._gridName = val;
    this.columnConfig$ = this.gridFacade.selectColumnConfig(this.gridName);
  }
  get gridName(): string {
    return this._gridName;
  }

  @Input()
  set gridConfig(val: IccGridConfig) {
    console.log( ' 6666 gridConfig=', val)
    this._gridConfig = val;
  }
  get gridConfig(): IccGridConfig {
    return this._gridConfig;
  }

  @Input()
  set columnConfig(columns: IccColumnConfig[]) {
    this._columnConfig = columns;
    this.gridFacade.setupGridColumnConfig(this.gridName, columns);
  }
  get columnConfig(): IccColumnConfig[] {
    return this._columnConfig;
  }

  @Input() gridRows: any[] = [];
  @Input() allSelected = false;

  @Output() sortGrid = new EventEmitter<any>();
  @Output() filterGrid = new EventEmitter<any>();
  @Output() dropColumn = new EventEmitter<DragDropEvent>();
  @Output() columnResized = new EventEmitter<ColumnResizeEvent>();

  fixedSizeData = FIXED_SIZE;

  get displayedColumns(): string[] {
    return this.columnConfig.map((column) => column.name);
  }

  @ViewChild(CdkVirtualScrollViewport) private viewport!: CdkVirtualScrollViewport;

  ngAfterViewChecked(): void {
    const viewportSize = this.viewport.elementRef.nativeElement.getBoundingClientRect();
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
