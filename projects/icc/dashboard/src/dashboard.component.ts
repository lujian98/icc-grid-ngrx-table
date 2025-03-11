import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  Input,
} from '@angular/core';
import { IccButtonConfg, IccBUTTONS, isEqual, uniqueId } from '@icc/ui/core';
import { IccLayoutComponent, IccLayoutHeaderComponent } from '@icc/ui/layout';
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
  private elementRef = inject(ElementRef);
  private dashboardFacade = inject(IccDashboardFacade);
  private dashboardId = uniqueId(16);
  private _config: IccDashboardConfig = defaultDashboardConfig;
  private _tiles: IccTile<unknown>[] = [];
  config$!: Observable<IccDashboardConfig>;
  setting$!: Observable<IccDashboardSetting>;
  tiles$!: Observable<IccTile<unknown>[]>;
  buttons: IccButtonConfg[] = [IccBUTTONS.Add, IccBUTTONS.Remove];

  @Input()
  set config(value: Partial<IccDashboardConfig>) {
    const config = { ...defaultDashboardConfig, ...value };
    if (!isEqual(config, this.config)) {
      if (config.rows !== this.config.rows || config.cols !== this.config.cols) {
        //this.setTileLayouts(this.tiles); //TODO add to tile component test confg change
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

  ngAfterViewInit(): void {
    this.setupGridViewport();
  }

  private initTabsConfig(): void {
    this.config$ = this.dashboardFacade.selectDashboardConfig(this.dashboardId);
    this.setting$ = this.dashboardFacade.selectSetting(this.dashboardId);
    this.tiles$ = this.dashboardFacade.selectDashboardTiles(this.dashboardId);
    this.dashboardFacade.initDashboardConfig(this.dashboardId, this.config);
  }

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

  @HostListener('window:resize', ['$event'])
  onResize(event: MouseEvent): void {
    this.setupGridViewport();
  }
}
