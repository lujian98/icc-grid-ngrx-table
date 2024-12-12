import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IccIconModule } from '@icc/ui/icon';
import { IccPopoverComponent } from '@icc/ui/popover';
import { TranslateModule } from '@ngx-translate/core';
import { IccGridFacade } from '../../../+state/grid.facade';
import { ColumnMenuClick, IccColumnConfig, IccGridConfig, IccSortField } from '../../../models/grid-column.model';
import { IccGridColumnMenuComponent } from '../grid-column-menu/grid-column-menu.component';
import {
  IccDynamicOverlayService,
  IccPosition,
  IccTrigger,
  IccOverlayServiceConfig,
  DEFAULT_OVERLAY_SERVICE_CONFIG,
} from '@icc/ui/overlay';
import { IccPopoverDirective } from '@icc/ui/popover';

@Component({
  selector: 'icc-grid-header-cell',
  templateUrl: './grid-header-cell.component.html',
  styleUrls: ['./grid-header-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    IccPopoverComponent,
    IccPopoverDirective,
    IccIconModule,
    IccGridColumnMenuComponent,
  ],
  providers: [IccGridFacade],
})
export class IccGridHeaderCellComponent {
  private gridFacade = inject(IccGridFacade);
  @Input() column!: IccColumnConfig;
  @Input() gridConfig!: IccGridConfig;

  gridColumnMenuComponent = IccGridColumnMenuComponent;
  trigger: IccTrigger = IccTrigger.CLICK;
  position: IccPosition = IccPosition.BOTTOM_END;
  /*
  trigger: IccTrigger.POINT,
  position: IccPosition.BOTTOM_END,
  */
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
}
