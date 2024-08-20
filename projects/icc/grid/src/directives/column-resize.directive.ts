import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
//import { DataGridColumnWithId, HEADER_NAME_ID } from '../models';
//import * as R from 'ramda';
import { EventTypes } from '../models/event-types';
import { EventTargetTypes } from '../models/event-target-types';
import { ColumnResizeEvent } from '../models/column-resize-event';
//import { MIN_HEADER_NAME_WIDTH } from '../util/columns-style';
import { IccColumnConfig, IccColumnWidth } from '../models/grid-column.model';

export const MIN_HEADER_NAME_WIDTH = 60;

/*
export const HEADER_NAME_ID = 'headerName';
export const headerName = R.prop(HEADER_NAME_ID);
export const COLUMN_ID = 'columnId';
export const getColumnId = R.prop(COLUMN_ID);
*/
@Directive({
  selector: '[iccColumnResize]',
  standalone: true,
})
export class IccColumnResizeDirective implements AfterViewInit {
 // @Input() column: DataGridColumnWithId;
  @Input() column!: IccColumnConfig;


  @Output() readonly columnResizing = new EventEmitter<IccColumnWidth>();
  @Output() readonly columnResized = new EventEmitter<IccColumnWidth>();

  columnInResizeMode = false;
  resizeStartPositionX!: number;
  minColumnWidth!: number;
  currentWidth!: number;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
  ) {
  }

  ngAfterViewInit(): void {
    this.minColumnWidth = this.calculateMinColumnWidth();
  }

  get element() {
    return this.elementRef.nativeElement;
  }

  get elementWidth() {
    return this.element.getBoundingClientRect().width;
  }

  onMouseDown(event: MouseEvent) {
    event.stopPropagation();
    this.columnInResizeMode = true;
    this.resizeStartPositionX = event.x;
    this.currentWidth = this.elementWidth;
    this.registerMouseEvents();
  }

  onMouseUp(event: MouseEvent) {
    event.stopPropagation();
    if (this.columnInResizeMode) {
      this.columnResized.emit(this.getColumnResizeEventData(event.x));
      this.columnInResizeMode = false;
    }
  }

  onMouseMove(event: MouseEvent) {
    if (this.columnInResizeMode) {
      this.columnResizing.emit(this.getColumnResizeEventData(event.x));
    }
  }

  private registerMouseEvents() {
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

  //private getColumnResizeEventData(currentPositionX: number): ColumnResizeEvent {
  private getColumnResizeEventData(currentPositionX: number): any {
   // const width = this.calculateColumnWidth(currentPositionX);
   // this.column.width = width;
    return {
      name: this.column.name,
      width: this.calculateColumnWidth(currentPositionX),
    }
    //return {columnId: this.column.name, width: this.calculateColumnWidth(currentPositionX)};
  }

  private calculateColumnWidth(currentPositionX: number) {
    const width = this.currentWidth - Number(this.resizeStartPositionX - currentPositionX);
    //console.log( ' new width=', width)
    return width;
    //return R.lt(width, this.minColumnWidth) ? this.minColumnWidth : width;
  }

  private calculateMinColumnWidth(): number {
    return 100;
    //return Number((R.sum(this.getChildrenWidth())).toFixed(0));
  }

  private getChildrenWidth(): number {
    return 200;
    /*
    return R.map(child => child?.id === HEADER_NAME_ID
        ? MIN_HEADER_NAME_WIDTH
        : child.getBoundingClientRect()?.width,
      R.head(this.element?.children)?.children);
    */
  }
}
