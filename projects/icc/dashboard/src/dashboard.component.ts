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
  OnDestroy,
} from '@angular/core';
import { IccButtonConfg, IccBUTTONS, isEqual } from '@icc/ui/core';
import { IccLayoutComponent, IccLayoutHeaderComponent } from '@icc/ui/layout';
import { ReducerManager } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IccDashboardStateModule } from './+state/dashboard-state.module';
import { IccDashboardFacade } from './+state/dashboard.facade';
import { iccDashboardReducer } from './+state/dashboard.reducer';
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
export class IccDashboardComponent<T> implements AfterViewInit, OnDestroy {
  private elementRef = inject(ElementRef);
  private reducerManager = inject(ReducerManager);
  private dashboardFacade = inject(IccDashboardFacade);
  private _config: IccDashboardConfig = defaultDashboardConfig;
  private _options: IccTileOption<unknown>[] = [];
  private _tiles: IccTile<unknown>[] = [];
  config$!: Observable<IccDashboardConfig>;
  setting$!: Observable<IccDashboardSetting>;
  tiles$!: Observable<IccTile<unknown>[]>;
  buttons: IccButtonConfg[] = [IccBUTTONS.Add, IccBUTTONS.Remove];

  @Input()
  set config(value: Partial<IccDashboardConfig>) {
    const featureName = value?.featureName ? value.featureName : `dashbard-${crypto.randomUUID()}`;
    const config = { ...defaultDashboardConfig, ...value, featureName };

    if (this.dashboardFacade.featureName !== config.featureName) {
      if (this.dashboardFacade.featureName) {
        this.reducerManager.removeReducer(this.dashboardFacade.featureName);
      }
      this.reducerManager.addReducer(config.featureName, iccDashboardReducer);
      this.dashboardFacade.featureName = config.featureName;
      this.initTabsConfig();
    }

    if (!isEqual(config, this.config)) {
      this._config = config;
      this.dashboardFacade.setDashboardConfig(this.config);
    }
  }
  get config(): IccDashboardConfig {
    return this._config;
  }

  @Input()
  set options(options: IccTileOption<unknown>[]) {
    this._options = [...options];
    this.dashboardFacade.setDashboardOptions(this.options);
  }
  get options(): IccTileOption<unknown>[] {
    return this._options;
  }

  @Input()
  set tiles(tiles: IccTile<unknown>[]) {
    this._tiles = tiles.map((tile) => ({ ...defaultTileConfig, ...tile }));
    if (!this.config.remoteTiles) {
      this.dashboardFacade.setDashboardTiles(this.tiles);
    }
  }
  get tiles(): IccTile<unknown>[] {
    return this._tiles;
  }

  ngAfterViewInit(): void {
    this.setupGridViewport();
  }

  private initTabsConfig(): void {
    this.config$ = this.dashboardFacade.selectDashboardConfig();
    this.setting$ = this.dashboardFacade.selectSetting();
    this.tiles$ = this.dashboardFacade.selectDashboardTiles();
    this.dashboardFacade.initDashboardConfig(this.config);
  }

  buttonClick(button: IccButtonConfg): void {}

  private setupGridViewport(): void {
    const el = this.elementRef.nativeElement;
    const node = el.firstChild;
    if (node) {
      const width = node.clientWidth - 0; // - padding left/right,
      const height = node.clientHeight - 30;
      this.dashboardFacade.setGridViewport(width, height);
    }
  }

  ngOnDestroy(): void {
    this.dashboardFacade.removeDashboardStore();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: MouseEvent): void {
    this.setupGridViewport();
  }
}
