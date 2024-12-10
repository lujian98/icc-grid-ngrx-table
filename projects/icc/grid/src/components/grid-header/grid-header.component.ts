import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, inject, Input, Output } from '@angular/core';
import { IccDynamicOverlayService, IccPosition, IccTrigger } from '@icc/ui/overlay';
import { IccPopoverComponent } from '@icc/ui/popover';
import { IccColumnResizeTriggerDirective } from '../../directives/column-resize-trigger.directive';
import { IccColumnResizeDirective } from '../../directives/column-resize.directive';
import { ROW_SELECTION_CELL_WIDTH } from '../../models/constants';
import { ColumnMenuClick, IccColumnConfig, IccColumnWidth, IccGridConfig } from '../../models/grid-column.model';
import { IccColumnFilterComponent } from '../column-filter/column-filter.component';
import { IccRowSelectComponent } from '../row-select/row-select.component';
import { IccGridColumnMenuComponent } from './grid-column-menu/grid-column-menu.component';
import { IccGridHeaderCellComponent } from './grid-header-cell/grid-header-cell.component';
import { IccGridHeaderItemComponent } from './grid-header-item/grid-header-item.component';

@Component({
  selector: 'icc-grid-header',
  templateUrl: './grid-header.component.html',
  styleUrls: ['./grid-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    IccGridHeaderCellComponent,
    IccGridHeaderItemComponent,
    IccColumnResizeDirective,
    IccColumnResizeTriggerDirective,
    IccColumnFilterComponent,
    IccRowSelectComponent,
    IccPopoverComponent,
    IccGridColumnMenuComponent,
  ],
  providers: [IccDynamicOverlayService],
})
export class IccGridHeaderComponent {
  private dynamicOverlayService = inject(IccDynamicOverlayService);
  @Input() columns: IccColumnConfig[] = [];
  @Input() gridConfig!: IccGridConfig;

  @Input() allSelected = false;
  @Input() columnWidths: IccColumnWidth[] = [];

  @Output() columnResizing = new EventEmitter<IccColumnWidth[]>();
  @Output() columnResized = new EventEmitter<IccColumnWidth[]>();

  rowSelectionCellWidth = ROW_SELECTION_CELL_WIDTH;

  getColumnWidth(column: IccColumnConfig): string {
    const width = this.columnWidths.find((col) => col.name === column.name)?.width;
    return width ? `${width}px` : '';
  }

  trackByIndex(index: number): number {
    return index;
  }

  get dragDisabled(): boolean {
    // TODO add each column enable/disable
    return !this.gridConfig.columnReorder;
  }

  onToggleSelectAllRowsOnCurrentPage() {
    //console.log( ' view columnConfig=', this.columnConfig)
    //this.toggleSelectAllRowsOnCurrentPage.emit(!this.allSelected);
  }

  onColumnMenuClick(menuClick: ColumnMenuClick): void {
    const fakeElement = this.getFakeElement(menuClick.event);
    const popoverContext = {
      gridId: this.gridConfig.gridId,
      column: menuClick.column,
    };
    this.buildPopover(fakeElement, popoverContext);
    this.show();
  }

  private getFakeElement(event: MouseEvent): ElementRef {
    return new ElementRef({
      getBoundingClientRect: () => ({
        bottom: event.clientY,
        height: 0,
        left: event.clientX,
        right: event.clientX,
        top: event.clientY,
        width: 0,
      }),
    });
  }

  private show(): void {
    this.hide();
    this.dynamicOverlayService.show();
  }

  private hide() {
    this.dynamicOverlayService.hide();
  }

  private buildPopover(elementRef: ElementRef, popoverContext: Object): void {
    this.dynamicOverlayService.build(
      IccPopoverComponent,
      elementRef,
      IccPosition.BOTTOM_END,
      IccTrigger.POINT,
      IccGridColumnMenuComponent,
      popoverContext,
      this.dynamicOverlayService,
    );
  }
}
