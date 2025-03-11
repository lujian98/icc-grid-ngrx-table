import { CdkDragDrop, CdkDragHandle, DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { IccButtonConfg, IccBUTTONS, isEqual, uniqueId } from '@icc/ui/core';
import { IccIconModule } from '@icc/ui/icon';
import { IccLayoutComponent, IccLayoutHeaderComponent } from '@icc/ui/layout';
import { IccMenuConfig, IccMenusComponent } from '@icc/ui/menu';
import { IccPosition, IccTrigger } from '@icc/ui/overlay';
import { IccPopoverDirective } from '@icc/ui/popover';
import { IccPortalComponent, IccPortalContent } from '@icc/ui/portal';
import { IccResizeDirective, IccResizeInfo, IccResizeType } from '@icc/ui/resize';
import { map, Observable } from 'rxjs';
import { IccDashboardStateModule } from './+state/dashboard-state.module';
import { IccDashboardFacade } from './+state/dashboard.facade';
import {
  defaultDashboardConfig,
  defaultTileConfig,
  defaultTileMenus,
  IccDashboardConfig,
  IccDashboardSetting,
  IccTile,
  IccTileOption,
} from './models/dashboard.model';
import { dragDropTile } from './utils/drag-drop-tile';
import { setTileLayouts } from './utils/setup-tiles';
import { getTileResizeInfo } from './utils/tile-resize-info';
import { getGridMap, getViewportSetting, gridViewportConfig } from './utils/viewport-setting';

@Component({
  selector: 'icc-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    DragDropModule,
    CdkDragHandle,
    IccDashboardStateModule,
    IccPortalComponent,
    IccMenusComponent,
    IccPopoverDirective,
    IccIconModule,
    IccLayoutComponent,
    IccLayoutHeaderComponent,
    IccResizeDirective,
  ],
})
export class IccDashboardComponent<T> implements AfterViewInit, OnInit {
  private changeDetectorRef = inject(ChangeDetectorRef);
  private elementRef = inject(ElementRef);
  private dashboardFacade = inject(IccDashboardFacade);
  private dashboardId = uniqueId(16);
  private _config: IccDashboardConfig = defaultDashboardConfig;
  private _tiles: IccTile<unknown>[] = [];
  config$!: Observable<IccDashboardConfig>;
  setting$!: Observable<IccDashboardSetting>;
  tiles$!: Observable<IccTile<unknown>[]>;

  buttons: IccButtonConfg[] = [IccBUTTONS.Add, IccBUTTONS.Remove];
  resizeType = IccResizeType;
  dragDisabled: boolean = false;
  gridTemplateColumns!: string;
  gridTemplateRows!: string;
  position: IccPosition = IccPosition.BOTTOMRIGHT;
  tileMenus = defaultTileMenus;

  @Input()
  set config(value: Partial<IccDashboardConfig>) {
    const config = { ...defaultDashboardConfig, ...value };
    if (!isEqual(config, this.config)) {
      if (config.rows !== this.config.rows || config.cols !== this.config.cols) {
        this.setTileLayouts(this.tiles); //TODO test confg change
      }
      this._config = config;
      this.dashboardFacade.setDashboardConfig(this.dashboardId, this.config);
    }
  }
  get config(): IccDashboardConfig {
    return this._config;
  }

  @Input()
  set tiles(tiles: IccTile<unknown>[]) {
    this._tiles = tiles.map((tile) => ({ ...defaultTileConfig, ...tile }));
    if (!this.config.remoteTiles) {
      this.dashboardFacade.setDashboardTiles(this.dashboardId, this.tiles);
    }
  }
  get tiles(): IccTile<unknown>[] {
    return this._tiles;
  }

  @Input() options: IccTileOption<unknown>[] = [];

  constructor() {
    this.initTabsConfig();
  }

  ngOnInit(): void {
    this.setTileLayouts(this.tiles);
  }

  ngAfterViewInit(): void {
    this.setupGridViewport();
  }

  private initTabsConfig(): void {
    this.config$ = this.dashboardFacade.selectDashboardConfig(this.dashboardId);
    this.setting$ = this.dashboardFacade.selectSetting(this.dashboardId);
    this.tiles$ = this.dashboardFacade.selectDashboardTiles(this.dashboardId);
    this.dashboardFacade.initDashboardConfig(this.dashboardId, this.config);
  }

  getPortalContent(tile: IccTile<unknown>): IccPortalContent<unknown> {
    const find = this.options.find((option) => option.name === tile.portalName);
    return find ? find.component : tile.content!;
  }

  getContextMenuTrigger(tile: IccTile<unknown>): IccTrigger {
    return tile.enableContextMenu ? IccTrigger.CONTEXTMENU : IccTrigger.NOOP;
  }

  onTileMenuClicked(tileMenu: IccMenuConfig, tile: IccTile<unknown>): void {}

  buttonClick(button: IccButtonConfg): void {}

  private setupGridViewport(): void {
    const el = this.elementRef.nativeElement;
    const node = el.firstChild;
    if (node) {
      const width = node.clientWidth - 0; // - padding left/right,
      const height = node.clientHeight - 30;
      this.dashboardFacade.setGridViewport(this.dashboardId, width, height);
    }
  }

  private setTileLayouts(tiles: IccTile<unknown>[]): void {
    const gridMap = getGridMap(this.config); //WARNING this always need run here!!!
    const newTiles = setTileLayouts(tiles, this.config, gridMap);
    this.dashboardFacade.loadDashboardGridMapTiles(this.dashboardId, gridMap, newTiles);
  }

  onResizeTile(
    resizeInfo: IccResizeInfo,
    tile: IccTile<unknown>,
    tiles: IccTile<unknown>[],
    setting: IccDashboardSetting,
  ): void {
    if (resizeInfo.isResized) {
      const tileInfo = getTileResizeInfo(resizeInfo, tile, this.config, setting.gridMap);
      Object.assign(tile, tileInfo);
      this.setTileLayouts(tiles);
    }
  }

  isDragDisabled(tile: IccTile<unknown>): boolean {
    return !!tile.dragDisabled;
  }

  onDropListDropped<D>(
    e: CdkDragDrop<D>,
    tile: IccTile<unknown>,
    tiles: IccTile<unknown>[],
    setting: IccDashboardSetting,
  ): void {
    const newTiles = dragDropTile(e, tile, tiles, this.config, setting.gridMap);
    this.setTileLayouts(newTiles);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: MouseEvent): void {
    this.setupGridViewport();
  }
}
