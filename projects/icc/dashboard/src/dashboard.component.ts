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
import { IccButtonConfg, IccBUTTONS } from '@icc/ui/core';
import { IccIconModule } from '@icc/ui/icon';
import { IccLayoutComponent, IccLayoutHeaderComponent } from '@icc/ui/layout';
import { IccMenuConfig, IccMenusComponent } from '@icc/ui/menu';
import { IccPosition, IccTrigger } from '@icc/ui/overlay';
import { IccPopoverDirective } from '@icc/ui/popover';
import { isEqual, uniqueId } from '@icc/ui/core';
import { IccPortalComponent, IccPortalContent } from '@icc/ui/portal';
import { IccResizeDirective, IccResizeInfo, IccResizeType, IccSize } from '@icc/ui/resize';
import {
  defaultDashboardConfig,
  defaultTileConfig,
  defaultTileMenus,
  IccDashboardConfig,
  IccDashboardSetting,
  IccTileOption,
  IccTile,
} from './models/dashboard.model';
import { Observable } from 'rxjs';
import { dragDropTile } from './utils/drag-drop-tile';
import { setTileLayouts } from './utils/setup-tiles';
import { getTileResizeInfo } from './utils/tile-resize-info';
import { IccDashboardFacade } from './+state/dashboard.facade';
import { IccDashboardStateModule } from './+state/dashboard-state.module';

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
  dashboardConfig$!: Observable<IccDashboardConfig>;
  dashboardSetting$!: Observable<IccDashboardSetting>;
  tiles$!: Observable<IccTile<unknown>[]>;

  private gridMap: number[][] = [];
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
      this._config = config;
      this.dashboardFacade.setDashboardConfig(this.dashboardId, this.config);
    }
  }
  get config(): IccDashboardConfig {
    return this._config;
  }

  @Input()
  set tiles(tiles: IccTile<unknown>[]) {
    console.log(' 1111111111 tiles=', tiles);
    this._tiles = tiles.map((tile) => ({
      ...defaultTileConfig,
      ...tile,
    }));
    if (!this.config.remoteTiles) {
      this.dashboardFacade.setDashboardTiles(this.dashboardId, this.tiles);
    }
  }
  get tiles(): IccTile<unknown>[] {
    return this._tiles;
  }

  @Input() tileOptions: IccTileOption<unknown>[] = [];

  constructor() {
    this.initTabsConfig();
  }

  private initTabsConfig(): void {
    this.dashboardConfig$ = this.dashboardFacade.selectDashboardConfig(this.dashboardId);
    this.dashboardSetting$ = this.dashboardFacade.selectSetting(this.dashboardId);
    this.tiles$ = this.dashboardFacade.selectDashboardTiles(this.dashboardId);
    this.dashboardFacade.initDashboardConfig(this.dashboardId, this.config);
  }

  ngOnInit(): void {
    this.setGridTemplate();
    this.setTileLayouts();
  }

  ngAfterViewInit(): void {
    this.setupGrid();
  }

  getPortalContent(tile: IccTile<unknown>): IccPortalContent<unknown> {
    const find = this.tileOptions.find((option) => option.name === tile.portalName);
    return find ? find.component : tile.content!;
  }

  getContextMenuTrigger(tile: IccTile<unknown>): IccTrigger {
    return tile.enableContextMenu ? IccTrigger.CONTEXTMENU : IccTrigger.NOOP;
  }

  onTileMenuClicked(tileMenu: IccMenuConfig, tile: IccTile<unknown>): void {}

  buttonClick(button: IccButtonConfg): void {}

  private setupGrid(): void {
    const size = this.getDashboardSize()!;
    const width = (size.width - this.config.cols * this.config.gridGap - 4) / this.config.cols;
    const height = (size.height - this.config.cols * this.config.gridGap - 4) / this.config.rows;
    if (width !== this.config.gridWidth || height !== this.config.gridHeight) {
      this.config.gridWidth = width;
      this.config.gridHeight = height;
      this.setGridTemplate();
      this.changeDetectorRef.detectChanges();
      window.dispatchEvent(new Event('resize'));
    }
  }

  private getDashboardSize(): IccSize | null {
    const el = this.elementRef.nativeElement;
    const node = el.firstChild;
    if (node) {
      return {
        width: node.clientWidth - 0, // - padding left/right,
        height: node.clientHeight - 30,
      };
    }
    return null;
  }

  private setGridTemplate(): void {
    this.gridTemplateColumns = `repeat(${this.config.cols}, ${this.config.gridWidth}px)`;
    this.gridTemplateRows = `repeat(${this.config.rows}, ${this.config.gridHeight}px)`;
  }

  private setTileLayouts(): void {
    for (let i = 0; i < this.config.rows; i++) {
      this.gridMap[i] = [];
      for (let j = 0; j < this.config.cols; j++) {
        this.gridMap[i][j] = -1;
      }
    }
    this.tiles = setTileLayouts(this.tiles, this.config, this.gridMap);
    window.dispatchEvent(new Event('resize'));
  }

  onResizeTile(resizeInfo: IccResizeInfo, tile: IccTile<unknown>): void {
    if (resizeInfo.isResized) {
      const tileInfo = getTileResizeInfo(resizeInfo, tile, this.config, this.gridMap);
      Object.assign(tile, tileInfo);
      this.setTileLayouts();
    }
  }

  isDragDisabled(tile: IccTile<unknown>): boolean {
    return !!tile.dragDisabled;
  }

  onDropListDropped<D>(e: CdkDragDrop<D>, tile: IccTile<unknown>): void {
    this.tiles = dragDropTile(e, tile, [...this.tiles], this.config, this.gridMap);
    this.setTileLayouts();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: MouseEvent): void {
    this.setupGrid();
  }
}
