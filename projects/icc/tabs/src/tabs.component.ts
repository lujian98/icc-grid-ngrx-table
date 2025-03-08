import { CdkDragDrop, CdkDropList, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  OnInit,
} from '@angular/core';
import { uniqueId } from '@icc/ui/core';
import { IccIconModule } from '@icc/ui/icon';
import { IccPosition, IccTrigger } from '@icc/ui/overlay';
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
  IccTabMenuConfig,
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
  private changeDetectorRef = inject(ChangeDetectorRef);
  private _tabsConfig: IccTabsConfig = defaultTabsConfig;
  private tabsFacade = inject(IccTabsFacade);
  private tabsId = uniqueId(16);
  private _options: IccTabConfig[] = [];
  private _tabs: IccTabConfig[] = [];
  private initialized: boolean = false;
  tabsConfig$!: Observable<IccTabsConfig>;
  tabsSetting$!: Observable<IccTabsSetting>;
  tabsTabs$!: Observable<IccTabConfig[]>;

  position: IccPosition = IccPosition.BOTTOMRIGHT;
  menuItem = defaultContextMenu;

  @Input()
  set tabsConfig(value: Partial<IccTabsConfig>) {
    this._tabsConfig = { ...defaultTabsConfig, ...value };
    this.initTabsConfig();
  }
  get tabsConfig(): IccTabsConfig {
    return this._tabsConfig;
  }

  private initTabsConfig(): void {
    if (!this.initialized) {
      this.tabsConfig$ = this.tabsFacade.selectTabsConfig(this.tabsId);
      this.tabsSetting$ = this.tabsFacade.selectSetting(this.tabsId);
      this.tabsTabs$ = this.tabsFacade.selectTabsTabs(this.tabsId);
      this.tabsFacade.initTabsConfig(this.tabsId, this.tabsConfig);
      this.initialized = true;
    }
  }

  @Input()
  set options(options: IccTabConfig[]) {
    this._options = [...options];
    if (!this.tabsConfig.remoteOptions) {
      this.initTabsConfig();
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
      this.initTabsConfig();
      this.tabsFacade.setTabsTabs(this.tabsId, this.tabs);
    }
  }
  get tabs(): IccTabConfig[] {
    return this._tabs;
  }

  get contextMenuTrigger(): IccTrigger {
    return this.tabsConfig.enableContextMenu ? IccTrigger.CONTEXTMENU : IccTrigger.NOOP;
  }

  @Output() iccTabsChange = new EventEmitter<IccTabConfig[]>(false);

  addTab(tabItem: IccTabMenuConfig): void {
    this.tabsFacade.setAddTab(this.tabsId, tabItem);
  }

  private setSelectedIndex(index: number): void {
    this.tabsConfig = {
      ...this.tabsConfig,
      selectedTabIndex: index,
    };
    this.changeDetectorRef.markForCheck();
  }

  onSelectedIndexChange(index: number): void {
    this.tabsFacade.setSelectedIndex(this.tabsId, index);
  }

  drop(event: CdkDragDrop<IccTabConfig>): void {
    const prevActive = this.tabs[this.tabsConfig.selectedTabIndex];
    moveItemInArray(this.tabs, event.previousIndex, event.currentIndex);
    this.setSelectedIndex(this.tabs.indexOf(prevActive));
    this.iccTabsChange.emit(this.tabs);
  }
}
