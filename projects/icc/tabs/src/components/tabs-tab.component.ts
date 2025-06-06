import { CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { IccDisabled } from '@icc/ui/core';
import { IccIconModule } from '@icc/ui/icon';
import { IccMenuConfig, IccMenusComponent } from '@icc/ui/menu';
import { IccPosition, IccTrigger } from '@icc/ui/overlay';
import { IccPopoverDirective } from '@icc/ui/popover';
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
  contextMenu = defaultContextMenu;

  tabsConfig = input.required<IccTabsConfig>();
  tabsSetting = input.required<IccTabsSetting>();
  tab = input.required<IccTabConfig>();
  tabs = input.required<IccTabConfig[]>();
  index = input.required<number>();

  get contextMenuTrigger(): IccTrigger {
    return this.tabsConfig().enableContextMenu ? IccTrigger.CONTEXTMENU : IccTrigger.NOOP;
  }

  dragDisabled(tab: IccTabConfig): boolean {
    return !this.tabsConfig().tabReorder;
  }

  closeable(tab: IccTabConfig): boolean {
    return this.tabsConfig().closeable && !!tab.closeable;
  }

  getTabLabel(tab: IccTabConfig): string {
    return tab.title || tab.name;
  }

  getDisabled(tab: IccTabConfig): IccDisabled[] {
    return [...defaultContextMenu].map((menu) => ({
      name: menu.name,
      disabled: this.menuItemDisabled(menu.name, tab, this.index()),
    }));
  }

  private menuItemDisabled(name: IccContextMenuType, tab: IccTabConfig, index: number): boolean {
    switch (name) {
      case IccContextMenuType.CLOSE:
        return !tab.closeable;
      case IccContextMenuType.CLOSE_OTHER_TABS:
        return [...this.tabs()].filter((item) => item.name === tab.name || !item.closeable).length === this.tabs.length;
      case IccContextMenuType.CLOSE_TABS_TO_THE_RIGHT:
        return [...this.tabs()].filter((item, idx) => idx < index + 1 || !item.closeable).length === this.tabs.length;
      case IccContextMenuType.CLOSE_TABS_TO_THE_LEFT:
        const right = [...this.tabs()].slice(index);
        const notCloseable = [...this.tabs()].slice(0, index).filter((item) => !item.closeable);
        return [...notCloseable, ...right].length === this.tabs.length;
      case IccContextMenuType.CLOSE_ALL_TABS:
        return [...this.tabs()].filter((item) => item.closeable).length === 0;
    }
  }

  onContextMenuClicked(menuItem: IccMenuConfig, tab: IccTabConfig): void {
    this.tabsFacade.setContextMenuClicked(this.tabsSetting().tabsId, menuItem, tab, this.index());
  }

  closeTab(event: MouseEvent, tab: IccTabConfig): void {
    event.stopPropagation();
    this.tabsFacade.setCloseTab(this.tabsSetting().tabsId, tab);
  }
}
