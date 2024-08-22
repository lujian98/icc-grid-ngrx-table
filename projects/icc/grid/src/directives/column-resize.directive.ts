import { Directive, ElementRef, EventEmitter, Input, Output, Renderer2, inject } from '@angular/core';
import { EventTargetTypes } from '../models/event-target-types';
import { EventTypes } from '../models/event-types';
import { IccColumnConfig, IccColumnWidth, IccGridConfig, MIN_GRID_COLUMN_WIDTH } from '../models/grid-column.model';

@Directive({
  selector: '[iccColumnResize]',
  standalone: true,
})
export class IccColumnResizeDirective {
  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);
  @Input() column!: IccColumnConfig;
  @Input() columns!: IccColumnConfig[];
  @Input() gridConfig!: IccGridConfig;

  @Output() readonly columnResizing = new EventEmitter<IccColumnWidth[]>();
  @Output() readonly columnResized = new EventEmitter<IccColumnWidth[]>();

  private columnWidths: IccColumnWidth[] = [];
  private currentIndex: number = 0;
  private columnInResizeMode = false;
  private resizeStartPositionX!: number;
  private currentWidth!: number;

  get element(): HTMLBaseElement {
    return this.elementRef.nativeElement;
  }

  get elementWidth(): number {
    return this.element.getBoundingClientRect().width;
  }

  get totalWidth(): number {
    return this.columns
      .filter((column) => !column.hidden)
      .map((column) => (column.width || MIN_GRID_COLUMN_WIDTH))
      .reduce((prev, curr) => prev + curr, 0);
  }

  get widthRatio(): number {
    const viewportWidth = this.gridConfig.viewportWidth - (this.gridConfig.rowSelection ? 40 : 0);
    return viewportWidth / this.totalWidth;
  }

  onMouseDown(event: MouseEvent): void {
    this.currentIndex = this.columns.findIndex((item) => item.name === this.column.name);
    this.columnWidths = [...this.columns].map((column) => ({
      name: column.name,
      width: this.widthRatio * column.width!,
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
    const unregisterMouseMove = this.renderer.listen(EventTargetTypes.Document, EventTypes.MouseMove, (mouseMoveEvent: MouseEvent) => {
      this.onMouseMove(mouseMoveEvent);
    });

    const unregisterContextMenu = this.renderer.listen(EventTargetTypes.Document, EventTypes.ContextMenu, (contextmenu: MouseEvent) => {
      contextmenu.preventDefault();
    });

    const unregisterMouseUp = this.renderer.listen(EventTargetTypes.Document, EventTypes.MouseUp, (mouseUpEvent: MouseEvent) => {
      this.onMouseUp(mouseUpEvent);
      unregisterMouseUp();
      unregisterMouseMove();
      unregisterContextMenu();
    });
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
      } else if (idx == nextIndex) {
        width = column.width! - dx;
        if (width < MIN_GRID_COLUMN_WIDTH) {
          width = MIN_GRID_COLUMN_WIDTH;
          if(nextIndex === this.columnWidths.length-1) {
            dx = 0;
          }
          nextIndex++;
        }
      }
      return {
        name: column.name,
        width: width!,
      }
    });
    //console.log(' this.columnWidths=', this.columnWidths)
    return this.columnWidths;
  }
  /*
  ngAfterViewInit(): void {
    this.minColumnWidth = this.calculateMinColumnWidth();
  }
  private calculateColumnWidth(currentPositionX: number) {
    const width = this.currentWidth - Number(this.resizeStartPositionX - currentPositionX); // - 90;
    return R.lt(width, this.minColumnWidth) ? this.minColumnWidth : width;
  }

  private calculateMinColumnWidth(): number {
    return Number((R.sum(this.getChildrenWidth())).toFixed(0));
  }

  private getChildrenWidth(): number {
    return R.map(child => child?.id === HEADER_NAME_ID
        ? MIN_HEADER_NAME_WIDTH
        : child.getBoundingClientRect()?.width,
      R.head(this.element?.children)?.children);
  }*/
}
