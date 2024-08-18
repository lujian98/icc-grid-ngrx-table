import { ChangeDetectionStrategy, Component, ElementRef, Input, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataSource } from '@angular/cdk/collections';
import { CdkTableModule } from '@angular/cdk/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { IccPopoverModule, IccPopoverComponent } from '@icc/ui/popover';
import { IccOverlayModule, IccTrigger, IccPosition, IccDynamicOverlayService } from '@icc/ui/overlay';
import { IccGridFacade } from '../../../+state/grid.facade';
import { IccColumnConfig, IccGridConfig, IccSortField } from '../../../models/grid-column.model';
import { IccGridColumnMenuComponent } from '../grid-column-menu/grid-column-menu.component';

export interface CanvasElement {
  title: string;
  x: number;
  y: number;
  r: number;
  color: string;
}

@Component({
  selector: 'icc-grid-header-cell',
  templateUrl: './grid-header-cell.component.html',
  styleUrls: ['./grid-header-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    //CdkTableModule, IccTrigger
    // IccOverlayModule.forRoot(),
    IccPopoverModule,
   // IccOverlayModule.forRoot(),
    IccGridColumnMenuComponent,
  ],
  providers: [IccDynamicOverlayService],
})
export class IccGridHeaderCellComponent {
  private gridFacade = inject(IccGridFacade);
  private dynamicOverlayService =  inject(IccDynamicOverlayService);
  @Input() column!: IccColumnConfig;
  @Input() gridConfig!: IccGridConfig;

  gridColumnMenuComponent = IccGridColumnMenuComponent;
  clickTrigger = IccTrigger.CLICK;

  @Output() sortGrid = new EventEmitter<any>();
  @Output() filterGrid = new EventEmitter<any>();

  get title(): string {
    //console.log('title =', this.column.title)
    return this.column.title === undefined ? this.column.name : this.column.title;
  }

  get downCaretStyle() {
    return {'border-top': '5px solid rgba(16, 46, 84, 0.8)'};
    //return {'border-top': sortDescending(this.sortType) ? '5px solid rgba(16, 46, 84, 0.8)' : null};
  }

  get upCaretStyle() {
    return {'border-bottom': null};
    //return {'border-bottom': sortAscending(this.sortType) ? '5px solid rgba(16, 46, 84, 0.8)' : null};
  }

  get findSortField(): IccSortField | undefined {
    return this.gridConfig.sortFields.find((field)=>field.field === this.column.name);
  }

  get isSortField(): boolean {
    return !!this.findSortField;
  }

  get sortDir(): string {
    return this.findSortField!.dir;
  }

  headCellClick(): void  {
    let find = this.findSortField;
    let sort: IccSortField;
    if(find) {
      sort = {...find};
      sort.dir = sort.dir === 'asc' ? 'desc' : 'asc';
    } else {
      sort = {
        field: this.column.name,
        dir: 'asc'
      };
    }
    this.gridFacade.setGridSortField(this.gridConfig.gridName, [sort]);
  }

  onClickColumnMenu(event: MouseEvent): void {
    const x = event.pageX; // - this.tooltipCanvas.nativeElement.offsetLeft;
    const y = event.pageY; // - this.tooltipCanvas.nativeElement.offsetTop;
    //const element = this.findElement(x, y);
   // if (element) {
      const fakeElement = this.getFakeElement(event);
      // const tooltip = `Title: ${element.title} Color: ${element.color} X: ${element.x} Y: ${element.y} R: ${element.r}`;
      const popoverContext = { element: 'test' };
      this.buildPopover(fakeElement, popoverContext);
      this.show();
   // } else {
   //   this.hide();
   // }
  }

  private getFakeElement(event: MouseEvent): ElementRef {
    return new ElementRef({
      // @ts-ignore
      getBoundingClientRect: (): ClientRect => ({
        bottom: event.clientY,
        height: 0,
        left: event.clientX,
        right: event.clientX,
        top: event.clientY,
        width: 0,
      }),
    });
  }
/*
  private findElement(x: number, y: number): CanvasElement {
    return this.elemets.find(
      (item) => x > item.x - item.r && x < item.x + item.r && y > item.y - item.r && y < item.y + item.r
    );
  }*/

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
      IccPosition.BOTTOM,
      IccTrigger.NOOP,
      IccGridColumnMenuComponent,
      popoverContext,
      this.dynamicOverlayService
    );
  }

}
