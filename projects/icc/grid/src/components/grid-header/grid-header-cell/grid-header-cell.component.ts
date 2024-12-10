import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IccIconModule } from '@icc/ui/icon';
import { IccDynamicOverlayService } from '@icc/ui/overlay';
import { IccPopoverComponent } from '@icc/ui/popover';
import { TranslateModule } from '@ngx-translate/core';
import { IccGridFacade } from '../../../+state/grid.facade';
import { ColumnMenuClick, IccColumnConfig, IccGridConfig, IccSortField } from '../../../models/grid-column.model';
import { IccGridColumnMenuComponent } from '../grid-column-menu/grid-column-menu.component';

@Component({
  selector: 'icc-grid-header-cell',
  templateUrl: './grid-header-cell.component.html',
  styleUrls: ['./grid-header-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, TranslateModule, IccPopoverComponent, IccIconModule, IccGridColumnMenuComponent],
  providers: [IccDynamicOverlayService, IccGridFacade],
})
export class IccGridHeaderCellComponent {
  private gridFacade = inject(IccGridFacade);
  @Input() column!: IccColumnConfig;
  @Input() gridConfig!: IccGridConfig;

  get title(): string {
    return this.column.title === undefined ? this.column.name : this.column.title;
  }

  get findSortField(): IccSortField | undefined {
    return this.gridConfig.sortFields.find((field) => field.field === this.column.name);
  }

  get isSortField(): boolean {
    return this.column.sortField !== false && !!this.findSortField;
  }

  get sortDir(): string {
    return this.findSortField!.dir;
  }

  @Output() columnMenuClick = new EventEmitter<ColumnMenuClick>(false);

  headCellClick(event: MouseEvent): void {
    if (this.gridConfig.columnSort && this.column.sortField !== false) {
      let find = this.findSortField;
      let sort: IccSortField;
      if (find) {
        sort = { ...find };
        sort.dir = sort.dir === 'asc' ? 'desc' : 'asc';
      } else {
        sort = {
          field: this.column.name,
          dir: 'asc',
        };
      }
      this.gridFacade.setGridSortFields(this.gridConfig, [sort]);
    }
  }

  onClickColumnMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.columnMenuClick.emit({ column: this.column, event: event });
  }

  /*
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
    */
}
