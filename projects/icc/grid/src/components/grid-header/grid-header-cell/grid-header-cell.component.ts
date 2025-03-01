import { CdkMenuTrigger } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, ElementRef } from '@angular/core';
import {
  DEFAULT_OVERLAY_SERVICE_CONFIG,
  IccDynamicOverlayService,
  IccOverlayServiceConfig,
  IccPosition,
  IccTrigger,
} from '@icc/ui/overlay';
import { IccIconModule } from '@icc/ui/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { IccGridFacade } from '../../../+state/grid.facade';
import { IccColumnConfig, IccGridConfig, IccGridSetting, IccSortField } from '../../../models/grid-column.model';
import { IccGridColumnMenuComponent } from '../grid-column-menu/grid-column-menu.component';
import { IccPopoverComponent } from '@icc/ui/popover';

@Component({
  selector: 'icc-grid-header-cell',
  templateUrl: './grid-header-cell.component.html',
  styleUrls: ['./grid-header-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TranslatePipe, IccIconModule, IccGridColumnMenuComponent, CdkMenuTrigger],
  providers: [IccGridFacade, IccDynamicOverlayService],
})
export class IccGridHeaderCellComponent {
  private gridFacade = inject(IccGridFacade);
  private dynamicOverlayService = inject(IccDynamicOverlayService);
  private elementRef = inject(ElementRef);
  @Input() column!: IccColumnConfig;
  @Input() gridSetting!: IccGridSetting;
  @Input() gridConfig!: IccGridConfig;
  @Input() values: { [key: string]: boolean } = {};

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
      this.gridFacade.setGridSortFields(this.gridConfig, this.gridSetting, [sort]);
    }
  }

  onClickColumnMenu(event: MouseEvent): void {
    event.stopPropagation();

    /*
    let values: { [key: string]: boolean } = {};
    [...this.columns].forEach((column) => {
      values[column.name] = !column.hidden;
    });*/
    const popoverContext = {
      gridId: this.gridSetting.gridId,
      column: this.column,
      values: this.values,
    };
    this.buildPopover(popoverContext, event);
  }

  //build column menu use POINT not depened on the grid column so it will not close the menu panel
  private buildPopover(popoverContext: Object, event: MouseEvent): void {
    const overlayServiceConfig: IccOverlayServiceConfig = {
      ...DEFAULT_OVERLAY_SERVICE_CONFIG,
      trigger: IccTrigger.POINT,
      position: IccPosition.BOTTOM_END,
      clickToClose: false,
      event,
    };
    this.dynamicOverlayService.build(
      IccPopoverComponent,
      this.elementRef,
      overlayServiceConfig,
      IccGridColumnMenuComponent,
      popoverContext,
    );
    this.showMenu();
  }

  private showMenu(): void {
    this.hideMenu();
    this.dynamicOverlayService.show();
  }

  private hideMenu() {
    this.dynamicOverlayService.hide();
  }
}
