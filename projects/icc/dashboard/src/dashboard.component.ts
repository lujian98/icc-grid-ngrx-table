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
  defaultTileConfig,
  defaultTileMenus,
  IccDashboardConfig,
  IccTileOption,
  Tile,
  defaultDashboardConfig,
} from './model';
import { getResizeTileInfo } from './utils/tile-resize-info';

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
  private _tiles: Tile<T>[] = [];
  private gridMap: number[][] = [];
  buttons: IccButtonConfg[] = [IccBUTTONS.Add, IccBUTTONS.Remove];
  resizeType = IccResizeType;
  dragDisabled: boolean = false;
  gridTemplateColumns!: string;
  gridTemplateRows!: string;
  position: IccPosition = IccPosition.BOTTOMRIGHT;
  tileMenus = defaultTileMenus;

  @Input()
  set tiles(tiles: Tile<T>[]) {
    this._tiles = tiles.map((tile) => ({
      ...defaultTileConfig,
      ...tile,
    }));
  }
  get tiles(): Tile<T>[] {
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

  getPortalContent(tile: Tile<T>): IccPortalContent<T> {
    const find = this.tileOptions.find((option) => option.name === tile.portalName);
    return find ? find.component : tile.content!;
  }

  getContextMenuTrigger(tile: Tile<T>): IccTrigger {
    return tile.enableContextMenu ? IccTrigger.CONTEXTMENU : IccTrigger.NOOP;
  }

  onTileMenuClicked(tileMenu: IccMenuConfig, tile: Tile<T>): void {}

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
      const width = node.clientWidth - 0; // - padding left/right
      const height = node.clientHeight - 30; // - top bar height
      return {
        width: width,
        height: height,
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
    this.tiles.forEach((tile, index) => {
      tile.index = index;
      if (tile.colWidth! <= 0) {
        tile.colWidth = 1;
      }
      if (tile.rowHeight! <= 0) {
        tile.rowHeight = 1;
      }
      if (tile.colStart! <= 0) {
        tile.colStart = 1;
      }
      if (tile.rowStart! <= 0) {
        tile.rowStart = 1;
      }
      if (tile.rowStart! + tile.rowHeight! > this.config.rows) {
        tile.rowHeight = this.config.rows - tile.rowStart! + 1;
      }
      if (tile.colStart! + tile.colWidth! > this.config.cols) {
        tile.colWidth = this.config.cols - tile.colStart! + 1;
      }
      for (let j = tile.colStart! - 1; j < tile.colStart! + tile.colWidth! - 1; j++) {
        for (let i = tile.rowStart! - 1; i < tile.rowStart! + tile.rowHeight! - 1; i++) {
          this.gridMap[i][j] = index;
        }
      }
      tile.gridRow = `${tile.rowStart}/${tile.rowStart! + tile.rowHeight!}`;
      tile.gridColumn = `${tile.colStart}/${tile.colStart! + tile.colWidth!}`;

      if (!tile.content) {
        tile.content = tile.title || tile.name;
      }
    });
    window.dispatchEvent(new Event('resize'));
  }

  onResizeTile(resizeInfo: IccResizeInfo, tile: Tile<T>): void {
    if (resizeInfo.isResized) {
      const tileInfo = getResizeTileInfo(resizeInfo, tile, this.config, this.gridMap);
      Object.assign(tile, tileInfo);
      this.setTileLayouts();
    }
  }

  isDragDisabled(tile: Tile<T>): boolean {
    return !!tile.dragDisabled;
  }

  onDropListDropped<D>(e: CdkDragDrop<D>, tile: Tile<T>): void {
    const draggedTile = this.tiles[e.item.data];
    const dx = Math.round(e.distance.x / this.config.gridWidth);
    const dy = Math.round(e.distance.y / this.config.gridHeight);
    const x = Math.min(Math.max(draggedTile.colStart! + dx, 1), this.config.cols);
    const y = Math.min(Math.max(draggedTile.rowStart! + dy, 1), this.config.rows);
    const xyState = this.gridMap[y - 1][x - 1];
    // if drop into empty space check if tile will cover other tile
    if (e.item.data === tile.index || xyState < 0) {
      if (this.isDroppable(x, y, draggedTile, tile.index!) && this.isDroppable(x, y, draggedTile, -1)) {
        draggedTile.colStart = x;
        draggedTile.rowStart = y;
      }
    } else {
      // if drop into other tile(s)
      tile = this.tiles[xyState];
      if (
        this.isDroppable(tile.colStart! + draggedTile.colWidth!, tile.rowStart!, tile, draggedTile.index!) &&
        this.isDroppable(tile.colStart!, tile.rowStart!, draggedTile, tile.index!)
      ) {
        draggedTile.colStart = tile.colStart;
        draggedTile.rowStart = tile.rowStart;
        tile.colStart = draggedTile.colStart! + draggedTile.colWidth!;
      }
    }
    this.setTileLayouts();
  }

  private isDroppable(x: number, y: number, tile: Tile<T>, index: number): boolean {
    if (x <= this.config.cols && y <= this.config.rows) {
      const gridMap = this.gridMap
        .slice(y - 1, y - 1 + tile.rowHeight!)
        .map((i) => i.slice(x - 1, x - 1 + tile.colWidth!));
      const gmap = gridMap.map((items, i) => {
        return items
          .map((item) => {
            if (item >= 0 && item !== tile.index) {
              if ((index !== -1 && item !== index) || index === -1) {
                return item;
              }
            }
            return undefined;
          })
          .filter((item) => item !== undefined)
          .concat();
      });
      return Math.max(...([] as number[]).concat(...gmap), -1) === -1;
    }
    return false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: MouseEvent): void {
    this.setupGrid();
  }
}
