import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  OnDestroy,
  signal,
} from '@angular/core';
import { IccButtonConfg, IccBUTTONS, isEqual } from '@icc/ui/core';
import { IccLayoutComponent, IccLayoutHeaderComponent } from '@icc/ui/layout';
import { IccDashboardStateModule } from './+state/dashboard-state.module';
import { IccDashboardFacade } from './+state/dashboard.facade';
import { IccTilesComponent } from './components/tiles/tiles.component';
import {
  defaultDashboardConfig,
  defaultTileConfig,
  IccDashboardConfig,
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
  private readonly elementRef = inject(ElementRef);
  private readonly dashboardFacade = inject(IccDashboardFacade);
  private readonly dashboardId = `dashbard-${crypto.randomUUID()}`;
  config$ = this.dashboardFacade.getDashboardConfig(this.dashboardId);
  setting$ = this.dashboardFacade.getSetting(this.dashboardId);
  tiles$ = this.dashboardFacade.getDashboardTiles(this.dashboardId);
  buttons: IccButtonConfg[] = [IccBUTTONS.Add, IccBUTTONS.Remove];

  prevConfig = signal<IccDashboardConfig | undefined>(undefined);
  config = input.required({
    transform: (value: Partial<IccDashboardConfig>) => {
      const config = { ...defaultDashboardConfig, ...value };
      this.initTabsConfig(config);
      if (this.prevConfig() && !isEqual(config, this.prevConfig())) {
        this.dashboardFacade.setDashboardConfig(this.dashboardId, config);
      }
      this.prevConfig.update(() => config);
      return config;
    },
  });

  options = input([], {
    transform: (options: IccTileOption<unknown>[]) => {
      this.dashboardFacade.setDashboardOptions(this.dashboardId, options);
      return options;
    },
  });

  tiles = input([], {
    transform: (items: IccTile<unknown>[]) => {
      const tiles = items.map((tile) => ({ ...defaultTileConfig, ...tile }));
      if (!this.config().remoteTiles) {
        this.dashboardFacade.setDashboardTiles(this.dashboardId, tiles);
      }
      return tiles;
    },
  });

  ngAfterViewInit(): void {
    this.setupGridViewport();
  }

  private initTabsConfig(config: IccDashboardConfig): void {
    this.dashboardFacade.initDashboardConfig(this.dashboardId, config);
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

  ngOnDestroy(): void {
    this.dashboardFacade.clearDashboardStore(this.dashboardId);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: MouseEvent): void {
    this.setupGridViewport();
  }
}
