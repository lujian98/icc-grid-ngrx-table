import { CdkDragDrop, CdkDragHandle, DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { IccMenuConfig, IccMenusComponent } from '@icc/ui/menu';
import { IccPosition, IccTrigger } from '@icc/ui/overlay';
import { IccPopoverDirective } from '@icc/ui/popover';
import { IccPortalComponent, IccPortalContent } from '@icc/ui/portal';
import { IccResizeDirective, IccResizeInfo, IccResizeType } from '@icc/ui/resize';
import { IccDashboardFacade } from '../../+state/dashboard.facade';
import { dragDropTile } from '../../utils/drag-drop-tile';
import { setTileLayouts } from '../../utils/setup-tiles';
import { getTileResizeInfo } from '../../utils/tile-resize-info';
import { getGridMap } from '../../utils/viewport-setting';
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
export class IccTilesComponent implements OnInit {
  private dashboardFacade = inject(IccDashboardFacade);
  resizeType = IccResizeType;
  position: IccPosition = IccPosition.BOTTOMRIGHT;
  tileMenus = defaultTileMenus;

  @Input() config!: IccDashboardConfig;
  @Input() setting!: IccDashboardSetting;
  @Input() tiles!: IccTile<unknown>[];
  @Input() options: IccTileOption<unknown>[] = [];

  get gridGap(): string {
    return `${this.config.gridGap}px`;
  }

  ngOnInit(): void {
    this.setTileLayouts(this.tiles);
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
      const tileInfo = getTileResizeInfo(resizeInfo, tile, this.config, this.setting.gridMap);
      Object.assign(tile, tileInfo);
      this.setTileLayouts(this.tiles);
    }
  }

  isDragDisabled(tile: IccTile<unknown>): boolean {
    return !!tile.dragDisabled;
  }

  onDropListDropped<D>(e: CdkDragDrop<D>, tile: IccTile<unknown>): void {
    const newTiles = dragDropTile(e, tile, this.tiles, this.config, this.setting.gridMap);
    this.setTileLayouts(newTiles);
  }

  private setTileLayouts(tiles: IccTile<unknown>[]): void {
    const gridMap = getGridMap(this.config); //WARNING initialize gridMap!!!
    const newTiles = setTileLayouts(tiles, this.config, gridMap);
    this.dashboardFacade.loadDashboardGridMapTiles(this.setting.dashboardId, gridMap, newTiles);
  }
}
