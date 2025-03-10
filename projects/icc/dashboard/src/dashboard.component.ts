import { DragDropModule } from '@angular/cdk/drag-drop';
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
} from '@angular/core';
import { IccButtonConfg, IccBUTTONS, isEqual, uniqueId } from '@icc/ui/core';
import { IccLayoutComponent, IccLayoutHeaderComponent } from '@icc/ui/layout';
import { IccSize } from '@icc/ui/resize';
import { Observable } from 'rxjs';
import { IccDashboardStateModule } from './+state/dashboard-state.module';
import { IccDashboardFacade } from './+state/dashboard.facade';
import { IccTilesComponent } from './components/tiles/tiles.component';

import {
  defaultDashboardConfig,
  defaultTileConfig,
  IccDashboardConfig,
  IccDashboardSetting,
  IccTile,
  IccTileOption,
} from './models/dashboard.model';

@Component({
  selector: 'icc-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    DragDropModule,
    IccDashboardStateModule,
    IccTilesComponent,
    IccLayoutComponent,
    IccLayoutHeaderComponent,
  ],
})
export class IccDashboardComponent<T> implements AfterViewInit {
  private changeDetectorRef = inject(ChangeDetectorRef);
  private elementRef = inject(ElementRef);
  private dashboardFacade = inject(IccDashboardFacade);
  private dashboardId = uniqueId(16);
  private _config: IccDashboardConfig = defaultDashboardConfig;
  private _tiles: IccTile<unknown>[] = [];
  dashboardConfig$!: Observable<IccDashboardConfig>;
  dashboardSetting$!: Observable<IccDashboardSetting>;
  tiles$!: Observable<IccTile<unknown>[]>;
  buttons: IccButtonConfg[] = [IccBUTTONS.Add, IccBUTTONS.Remove];
  dragDisabled: boolean = false; // TODO not used
  gridTemplateColumns!: string;
  gridTemplateRows!: string;

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

  @Input() options: IccTileOption<unknown>[] = [];

  constructor() {
    this.initTabsConfig();
  }

  private initTabsConfig(): void {
    this.dashboardConfig$ = this.dashboardFacade.selectDashboardConfig(this.dashboardId);
    this.dashboardSetting$ = this.dashboardFacade.selectSetting(this.dashboardId);
    this.tiles$ = this.dashboardFacade.selectDashboardTiles(this.dashboardId);
    this.dashboardFacade.initDashboardConfig(this.dashboardId, this.config);
  }

  ngAfterViewInit(): void {
    this.setupGrid();
  }

  buttonClick(button: IccButtonConfg): void {}

  private setupGrid(): void {
    const size = this.getDashboardSize()!;
    const width = (size.width - this.config.cols * this.config.gridGap - 4) / this.config.cols;
    const height = (size.height - this.config.cols * this.config.gridGap - 4) / this.config.rows;
    if (width !== this.config.gridWidth || height !== this.config.gridHeight) {
      this.config.gridWidth = width;
      this.config.gridHeight = height;
      this.config = {
        ...this.config,
        gridWidth: width,
        gridHeight: height,
      };
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

  @HostListener('window:resize', ['$event'])
  onResize(event: MouseEvent): void {
    this.setupGrid();
  }
}
