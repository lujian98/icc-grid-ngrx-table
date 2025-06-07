import { CdkDragDrop, CdkDropList, DragDropModule } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, inject, input, OnDestroy } from '@angular/core';
import { IccIconModule } from '@icc/ui/icon';
import { IccPosition } from '@icc/ui/overlay';
import { IccPortalComponent } from '@icc/ui/portal';
import { IccTabComponent, IccTabGroupComponent, IccTabLabelDirective } from '@icc/ui/tab-group';
import { IccTabsStateModule } from './+state/tabs-state.module';
import { IccTabsFacade } from './+state/tabs.facade';
import { IccTabsTabComponent } from './components/tabs-tab.component';
import { defaultContextMenu, defaultTabsConfig, IccTabConfig, IccTabOption, IccTabsConfig } from './models/tabs.model';

@Component({
  selector: 'icc-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
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
export class IccTabsComponent implements OnDestroy {
  private readonly tabsFacade = inject(IccTabsFacade);
  private readonly tabsId = `tab-${crypto.randomUUID()}`;
  tabsConfig$ = this.tabsFacade.getTabsConfig(this.tabsId);
  tabsSetting$ = this.tabsFacade.getSetting(this.tabsId);
  tabsTabs$ = this.tabsFacade.getTabsTabs(this.tabsId);
  position: IccPosition = IccPosition.BOTTOMRIGHT;
  menuItem = defaultContextMenu;

  tabsConfig = input.required({
    transform: (value: Partial<IccTabsConfig>) => {
      const config = { ...defaultTabsConfig, ...value };
      this.tabsFacade.setTabsConfig(this.tabsId, config);
      return config;
    },
  });
  options = input([], {
    transform: (options: IccTabOption<unknown>[]) => {
      this.tabsFacade.setTabsOptions(this.tabsId, options);
      return options;
    },
  });
  tabs = input([], {
    transform: (tabs: IccTabConfig[]) => {
      if (this.tabsConfig() && !this.tabsConfig().remoteTabs) {
        this.tabsFacade.setTabsTabs(this.tabsId, tabs);
      }
      return tabs;
    },
  });

  constructor() {
    this.tabsFacade.initTabsConfig(this.tabsId, defaultTabsConfig);
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

  ngOnDestroy(): void {
    this.tabsFacade.clearTabsStore(this.tabsId);
  }
}
