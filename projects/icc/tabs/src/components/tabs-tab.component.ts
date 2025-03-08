import { CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { IccDisabled } from '@icc/ui/core';
import { IccIconModule } from '@icc/ui/icon';
import { IccMenuConfig, IccMenusComponent } from '@icc/ui/menu';
import { IccPosition, IccTrigger } from '@icc/ui/overlay';
import { IccPopoverDirective } from '@icc/ui/popover';
import { take, timer } from 'rxjs';
import { IccTabsStateModule } from '../+state/tabs-state.module';
import { IccTabsFacade } from '../+state/tabs.facade';
import {
  defaultContextMenu,
  IccContextMenuType,
  IccTabConfig,
  IccTabsConfig,
  IccTabsSetting,
} from '../models/tabs.model';

@Component({
  selector: 'icc-tabs-tab',
  templateUrl: './tabs-tab.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    DragDropModule,
    CdkDrag,
    IccMenusComponent,
    IccPopoverDirective,
    IccIconModule,
    IccTabsStateModule,
  ],
})
export class IccTabsTabComponent {
  private tabsFacade = inject(IccTabsFacade);
  position: IccPosition = IccPosition.BOTTOMRIGHT;
  menuItem = defaultContextMenu;

  @Input() tabsConfig!: IccTabsConfig;
  @Input() tabsSetting!: IccTabsSetting;
  @Input() tab!: IccTabConfig;
  @Input() tabs!: IccTabConfig[];
  @Input() index!: number;

  get contextMenuTrigger(): IccTrigger {
    return this.tabsConfig.enableContextMenu ? IccTrigger.CONTEXTMENU : IccTrigger.NOOP;
  }

  dragDisabled(tab: IccTabConfig): boolean {
    return !this.tabsConfig.tabReorder;
  }

  closeable(tab: IccTabConfig): boolean {
    return this.tabsConfig.closeable && !!tab.closeable;
  }

  getDisabled(tab: IccTabConfig): IccDisabled[] {
    return [...defaultContextMenu].map((menu) => ({
      name: menu.name,
      disabled: this.menuItemDisabled(menu.name, tab, this.index),
    }));
  }

  getTabLabel(tab: IccTabConfig): string {
    return tab.title || tab.name;
  }

  private menuItemDisabled(name: IccContextMenuType, tab: IccTabConfig, index: number): boolean {
    switch (name) {
      case IccContextMenuType.CLOSE:
        return !tab.closeable;
      case IccContextMenuType.CLOSE_OTHER_TABS:
        return [...this.tabs].filter((item) => item.name === tab.name || !item.closeable).length === this.tabs.length;
      case IccContextMenuType.CLOSE_TABS_TO_THE_RIGHT:
        return [...this.tabs].filter((item, idx) => idx < index + 1 || !item.closeable).length === this.tabs.length;
      case IccContextMenuType.CLOSE_TABS_TO_THE_LEFT:
        const right = [...this.tabs].slice(index);
        const notCloseable = [...this.tabs].slice(0, index).filter((item) => !item.closeable);
        return [...notCloseable, ...right].length === this.tabs.length;
      case IccContextMenuType.CLOSE_ALL_TABS:
        return [...this.tabs].filter((item) => item.closeable).length === 0;
    }
  }

  onContextMenuClicked(menuItem: IccMenuConfig, tab: IccTabConfig): void {
    const selectedTabIndex = this.tabsConfig.selectedTabIndex;
    const prevActive = this.tabs[selectedTabIndex];
    const tabs = this.contextMenuClicked(menuItem, this.tabs, tab);
    this.tabsFacade.setTabsTabs(this.tabsSetting.tabsId, tabs);
    this.checkSelectedTab(tabs, prevActive, selectedTabIndex);
  }

  private contextMenuClicked(menu: IccMenuConfig, tabs: IccTabConfig[], tab: IccTabConfig): IccTabConfig[] {
    switch (menu.name) {
      case IccContextMenuType.CLOSE:
        return [...tabs].filter((item) => item.name !== tab.name || !item.closeable);
      case IccContextMenuType.CLOSE_OTHER_TABS:
        return [...tabs].filter((item) => item.name === tab.name || !item.closeable);
      case IccContextMenuType.CLOSE_TABS_TO_THE_RIGHT:
        return [...tabs].filter((item, idx) => idx < this.index + 1 || !item.closeable);
      case IccContextMenuType.CLOSE_TABS_TO_THE_LEFT:
        const right = [...tabs].slice(this.index);
        const notCloseable = [...tabs].slice(0, this.index).filter((item) => !item.closeable);
        return [...notCloseable, ...right];
      case IccContextMenuType.CLOSE_ALL_TABS:
        return [...tabs].filter((item) => !item.closeable);
    }
    return [...tabs];
  }

  closeTab(event: MouseEvent, tab: IccTabConfig): void {
    event.stopPropagation();
    const selectedTabIndex = this.tabsConfig.selectedTabIndex;
    const prevActive = this.tabs[selectedTabIndex];
    const tabs = [...this.tabs].filter((item) => item.name !== tab.name);
    this.tabsFacade.setTabsTabs(this.tabsSetting.tabsId, tabs);
    this.checkSelectedTab(tabs, prevActive, selectedTabIndex);
  }

  private checkSelectedTab(tabs: IccTabConfig[], prevActive: IccTabConfig, selectedTabIndex: number): void {
    const findPrevActive = tabs.findIndex((item) => item.name === prevActive.name);
    if (this.tabs.length === 0) {
      this.tabsFacade.setSelectedIndex(this.tabsSetting.tabsId, -1);
    } else if (findPrevActive === -1 || findPrevActive !== selectedTabIndex) {
      this.tabsFacade.setSelectedIndex(this.tabsSetting.tabsId, -1);
      timer(10)
        .pipe(take(1))
        .subscribe(() => {
          this.tabsFacade.setSelectedIndex(this.tabsSetting.tabsId, 0);
        });
    }
  }
}
