import { CdkDragDrop, CdkDragHandle, DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { IccMenuConfig, IccMenusComponent } from '@icc/ui/menu';
import { IccPosition, IccTrigger } from '@icc/ui/overlay';
import { IccPopoverDirective } from '@icc/ui/popover';
import { IccPortalComponent, IccPortalContent } from '@icc/ui/portal';
import { IccResizeDirective, IccResizeInfo, IccResizeType } from '@icc/ui/resize';
import { IccDashboardFacade } from '../../+state/dashboard.facade';
import {
  defaultTileMenus,
  IccDashboardConfig,
  IccDashboardSetting,
  IccTile,
  IccTileOption,
} from './../../models/dashboard.model';

@Component({
  selector: 'icc-tiles',
  templateUrl: './tiles.component.html',
  styleUrls: ['./tiles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.grid-gap]': 'gridGap',
    '[style.grid-template-columns]': 'setting.gridTemplateColumns',
    '[style.grid-template-rows]': 'setting.gridTemplateRows',
  },
  imports: [
    CommonModule,
    DragDropModule,
    CdkDragHandle,
    IccPortalComponent,
    IccMenusComponent,
    IccPopoverDirective,
    IccResizeDirective,
  ],
})
export class IccTilesComponent {
  private dashboardFacade = inject(IccDashboardFacade);
  private _setting!: IccDashboardSetting;
  resizeType = IccResizeType;
  position: IccPosition = IccPosition.BOTTOMRIGHT;
  tileMenus = defaultTileMenus;

  @Input() config!: IccDashboardConfig;

  @Input()
  set setting(setting: IccDashboardSetting) {
    this._setting = setting;
    //console.log( ' 22222 settings =', this.setting)
  }
  get setting(): IccDashboardSetting {
    return this._setting;
  }

  @Input() tiles!: IccTile<unknown>[];
  @Input() options: IccTileOption<unknown>[] = [];

  get gridGap(): string {
    return `${this.config.gridGap}px`;
  }
  getPortalContent(tile: IccTile<unknown>): IccPortalContent<unknown> {
    const find = this.options.find((option) => option.name === tile.portalName);
    return find ? find.component : tile.content!;
  }

  getContextMenuTrigger(tile: IccTile<unknown>): IccTrigger {
    return tile.enableContextMenu ? IccTrigger.CONTEXTMENU : IccTrigger.NOOP;
  }

  onTileMenuClicked(tileMenu: IccMenuConfig, tile: IccTile<unknown>): void {}

  onResizeTile(resizeInfo: IccResizeInfo, tile: IccTile<unknown>): void {
    if (resizeInfo.isResized) {
      this.dashboardFacade.setResizeTile(this.setting.dashboardId, resizeInfo, tile);
    }
  }

  isDragDisabled(tile: IccTile<unknown>): boolean {
    return !!tile.dragDisabled;
  }

  onDropListDropped<D>(e: CdkDragDrop<any>, tile: IccTile<unknown>): void {
    this.dashboardFacade.setDragDropTile(this.setting.dashboardId, e, tile);
  }
}
