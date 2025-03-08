import { CdkDragDrop, CdkDropList, DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { isEqual, uniqueId } from '@icc/ui/core';
import { IccIconModule } from '@icc/ui/icon';
import { IccPosition } from '@icc/ui/overlay';
import { IccPortalComponent } from '@icc/ui/portal';
import { Observable } from 'rxjs';
import { IccTabsStateModule } from './+state/tabs-state.module';
import { IccTabsFacade } from './+state/tabs.facade';
import { IccTabGroupComponent } from './components/tab-group/tab-group.component';
import { IccTabComponent } from './components/tab/tab.component';
import { IccTabsTabComponent } from './components/tabs-tab.component';
import { IccTabLabelDirective } from './directives/tab-label.directive';
import {
  defaultContextMenu,
  defaultTabsConfig,
  IccTabConfig,
  IccTabsConfig,
  IccTabsSetting,
} from './models/tabs.model';

@Component({
  selector: 'icc-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    DragDropModule,
    CdkDropList,
    IccTabLabelDirective,
    IccTabComponent,
    IccTabGroupComponent,
    IccPortalComponent,
    IccIconModule,
    IccTabsStateModule,
    IccTabsTabComponent,
  ],
})
export class IccTabsComponent {
  private tabsFacade = inject(IccTabsFacade);
  private tabsId = uniqueId(16);
  private _tabsConfig: IccTabsConfig = defaultTabsConfig;
  private _options: IccTabConfig[] = [];
  private _tabs: IccTabConfig[] = [];
  tabsConfig$!: Observable<IccTabsConfig>;
  tabsSetting$!: Observable<IccTabsSetting>;
  tabsTabs$!: Observable<IccTabConfig[]>;
  position: IccPosition = IccPosition.BOTTOMRIGHT;
  menuItem = defaultContextMenu;

  @Input()
  set tabsConfig(value: Partial<IccTabsConfig>) {
    const config = { ...defaultTabsConfig, ...value };
    if (!isEqual(config, this.tabsConfig)) {
      this._tabsConfig = config;
      this.tabsFacade.setTabsConfig(this.tabsId, this.tabsConfig);
    }
  }
  get tabsConfig(): IccTabsConfig {
    return this._tabsConfig;
  }

  @Input()
  set options(options: IccTabConfig[]) {
    this._options = [...options];
    if (!this.tabsConfig.remoteOptions) {
      this.tabsFacade.setTabsOptions(this.tabsId, this.options);
    }
  }
  get options(): IccTabConfig[] {
    return this._options;
  }

  @Input()
  set tabs(tabs: IccTabConfig[]) {
    this._tabs = [...tabs];
    if (!this.tabsConfig.remoteTabs) {
      this.tabsFacade.setTabsTabs(this.tabsId, this.tabs);
    }
  }
  get tabs(): IccTabConfig[] {
    return this._tabs;
  }

  constructor() {
    this.initTabsConfig();
  }

  private initTabsConfig(): void {
    this.tabsConfig$ = this.tabsFacade.selectTabsConfig(this.tabsId);
    this.tabsSetting$ = this.tabsFacade.selectSetting(this.tabsId);
    this.tabsTabs$ = this.tabsFacade.selectTabsTabs(this.tabsId);
    this.tabsFacade.initTabsConfig(this.tabsId, this.tabsConfig);
  }

  onSelectedIndexChange(index: number): void {
    this.tabsFacade.setSelectedIndex(this.tabsId, index);
  }

  drop(event: CdkDragDrop<IccTabConfig>): void {
    this.tabsFacade.setDragDropTab(this.tabsId, event.previousIndex, event.currentIndex);
  }

  // add tab from left side menu
  addTab(tabItem: IccTabConfig): void {
    this.tabsFacade.setAddTab(this.tabsId, tabItem);
  }
}
