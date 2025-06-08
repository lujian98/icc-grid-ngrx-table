import { Directive, ElementRef, EventEmitter, inject, input, Output, Renderer2 } from '@angular/core';
import { MIN_GRID_COLUMN_WIDTH } from '../models/constants';
import { EventTargetTypes } from '../models/event-target-types';
import { EventTypes } from '../models/event-types';
import { IccColumnConfig, IccColumnWidth, IccGridConfig, IccGridSetting } from '../models/grid-column.model';
import { viewportWidthRatio } from '../utils/viewport-width-ratio';

@Directive({
  selector: '[iccColumnResize]',
})
export class IccColumnResizeDirective {
  private readonly elementRef = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  column = input.required<IccColumnConfig>();
  columns = input.required<IccColumnConfig[]>();
  gridConfig = input.required<IccGridConfig>();
  gridSetting = input.required<IccGridSetting>();
  groupHeader = input<boolean>(false);

  @Output() readonly columnResizing = new EventEmitter<IccColumnWidth[]>();
  @Output() readonly columnResized = new EventEmitter<IccColumnWidth[]>();

  private columnWidths: IccColumnWidth[] = [];
  private currentIndex: number = 0;
  private columnInResizeMode = false;
  private resizeStartPositionX!: number;
  private currentWidth!: number;

  get displayedColumns(): IccColumnConfig[] {
    return this.columns().filter((column) => column.hidden !== true);
  }

  get element(): HTMLBaseElement {
    return this.elementRef.nativeElement;
  }

  get elementWidth(): number {
    const width = this.element.getBoundingClientRect().width;
    if (this.groupHeader() && this.column().groupHeader) {
      const totalWidth = this.columns()
        .filter((col) => col.groupHeader === this.column().groupHeader)
        .reduce((sum, col) => sum + col.width!, 0);
      return (this.column().width! * width) / totalWidth;
    }
    return width;
  }

  onMouseDown(event: MouseEvent): void {
    this.currentIndex = this.displayedColumns.findIndex((item) => item.name === this.column().name);
    this.columnWidths = [...this.displayedColumns].map((column) => ({
      name: column.name,
      width: viewportWidthRatio(this.gridConfig(), this.gridSetting(), this.displayedColumns) * column.width!,
    }));
    event.stopPropagation();
    this.columnInResizeMode = true;
    this.resizeStartPositionX = event.x;
    this.currentWidth = this.elementWidth;
    this.registerMouseEvents();
  }

  onMouseUp(event: MouseEvent): void {
    event.stopPropagation();
    if (this.columnInResizeMode) {
      this.columnResized.emit(this.getColumnResizeEventData(event.x));
      this.columnInResizeMode = false;
    }
  }

  onMouseMove(event: MouseEvent): void {
    if (this.columnInResizeMode) {
      this.columnResizing.emit(this.getColumnResizeEventData(event.x));
    }
  }

  private registerMouseEvents(): void {
    const unregisterMouseMove = this.renderer.listen(
      EventTargetTypes.Document,
      EventTypes.MouseMove,
      (mouseMoveEvent: MouseEvent) => {
        this.onMouseMove(mouseMoveEvent);
      },
    );

    const unregisterContextMenu = this.renderer.listen(
      EventTargetTypes.Document,
      EventTypes.ContextMenu,
      (contextmenu: MouseEvent) => {
        contextmenu.preventDefault();
      },
    );

    const unregisterMouseUp = this.renderer.listen(
      EventTargetTypes.Document,
      EventTypes.MouseUp,
      (mouseUpEvent: MouseEvent) => {
        this.onMouseUp(mouseUpEvent);
        unregisterMouseUp();
        unregisterMouseMove();
        unregisterContextMenu();
      },
    );
  }

  private getColumnResizeEventData(currentPositionX: number): IccColumnWidth[] {
    const width = this.currentWidth - Number(this.resizeStartPositionX - currentPositionX);
    let dx = width - this.columnWidths[this.currentIndex].width;
    let nextIndex = this.currentIndex + 1;

    this.columnWidths = [...this.columnWidths].map((column, idx) => {
      let width = column.width!;
      if (idx == this.currentIndex) {
        width = column.width! + dx;
        if (width < MIN_GRID_COLUMN_WIDTH) {
          width = MIN_GRID_COLUMN_WIDTH;
          dx = 0;
        }
      } else if (idx == nextIndex && !this.gridConfig().horizontalScroll) {
        width = column.width! - dx;
        if (width < MIN_GRID_COLUMN_WIDTH) {
          width = MIN_GRID_COLUMN_WIDTH;
          if (nextIndex === this.columnWidths.length - 1) {
            dx = 0;
          }
          nextIndex++;
        }
      }
      return {
        name: column.name,
        width: width!,
      };
    });
    return this.columnWidths;
  }
}
