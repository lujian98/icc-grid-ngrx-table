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
import { IccPortalComponent, IccPortalContent } from '@icc/ui/portal';
import { IccResizeDirective, IccResizeInfo, IccResizeType, IccSize } from '@icc/ui/resize';
import {
  defaultDashboardConfig,
  defaultTileConfig,
  defaultTileMenus,
  IccDashboardConfig,
  IccTileOption,
  IccTile,
} from './models/dashboard.model';
import { dragDropTile } from './utils/drag-drop-tile';
import { setTileLayouts } from './utils/setup-tiles';
import { getTileResizeInfo } from './utils/tile-resize-info';

@Component({
  selector: 'icc-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    DragDropModule,
    CdkDragHandle,
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
  private _tiles: IccTile<T>[] = [];
  private gridMap: number[][] = [];
  buttons: IccButtonConfg[] = [IccBUTTONS.Add, IccBUTTONS.Remove];
  resizeType = IccResizeType;
  dragDisabled: boolean = false;
  gridTemplateColumns!: string;
  gridTemplateRows!: string;
  position: IccPosition = IccPosition.BOTTOMRIGHT;
  tileMenus = defaultTileMenus;

  @Input()
  set tiles(tiles: IccTile<T>[]) {
    this._tiles = tiles.map((tile) => ({
      ...defaultTileConfig,
      ...tile,
    }));
  }
  get tiles(): IccTile<T>[] {
    return this._tiles;
  }

  @Input() tileOptions: IccTileOption<T>[] = [];
  @Input() config: IccDashboardConfig = defaultDashboardConfig;

  ngOnInit(): void {
    this.setGridTemplate();
    this.setTileLayouts();
  }

  ngAfterViewInit(): void {
    this.setupGrid();
  }

  getPortalContent(tile: IccTile<T>): IccPortalContent<T> {
    const find = this.tileOptions.find((option) => option.name === tile.portalName);
    return find ? find.component : tile.content!;
  }

  getContextMenuTrigger(tile: IccTile<T>): IccTrigger {
    return tile.enableContextMenu ? IccTrigger.CONTEXTMENU : IccTrigger.NOOP;
  }

  onTileMenuClicked(tileMenu: IccMenuConfig, tile: IccTile<T>): void {}

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

  onResizeTile(resizeInfo: IccResizeInfo, tile: IccTile<T>): void {
    if (resizeInfo.isResized) {
      const tileInfo = getTileResizeInfo(resizeInfo, tile, this.config, this.gridMap);
      Object.assign(tile, tileInfo);
      this.setTileLayouts();
    }
  }

  isDragDisabled(tile: IccTile<T>): boolean {
    return !!tile.dragDisabled;
  }

  onDropListDropped<D>(e: CdkDragDrop<D>, tile: IccTile<T>): void {
    this.tiles = dragDropTile(e, tile, [...this.tiles], this.config, this.gridMap);
    this.setTileLayouts();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: MouseEvent): void {
    this.setupGrid();
  }
}
