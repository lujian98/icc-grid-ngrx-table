import { CdkDrag, CdkDragDrop, CdkDropList, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { IccDisabled } from '@icc/ui/core';
import { IccIconModule } from '@icc/ui/icon';
import { IccMenusComponent, IccMenuConfig } from '@icc/ui/menu';
import { IccPosition, IccTrigger } from '@icc/ui/overlay';
import { IccPopoverDirective } from '@icc/ui/popover';
import { IccPortalComponent } from '@icc/ui/portal';
import { take, timer } from 'rxjs';
import { IccTabGroupComponent } from './components/tab-group/tab-group.component';
import { IccTabComponent } from './components/tab/tab.component';
import { IccTabLabelDirective } from './directives/tab-label.directive';
import {
  defaultContextMenu,
  defaultTabsConfig,
  IccContextMenuType,
  IccTabConfig,
  IccTabsConfig,
} from './models/tabs.model';

@Component({
  selector: 'icc-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    DragDropModule,
    CdkDrag,
    CdkDropList,
    IccMenusComponent,
    IccPopoverDirective,
    IccTabLabelDirective,
    IccTabComponent,
    IccTabGroupComponent,
    IccPortalComponent,
    IccIconModule,
  ],
})
export class IccTabsComponent {
  private changeDetectorRef = inject(ChangeDetectorRef);
  private _tabsConfig: IccTabsConfig = defaultTabsConfig;
  position: IccPosition = IccPosition.BOTTOMRIGHT;
  menuItem = defaultContextMenu;

  @Input()
  set tabsConfig(value: Partial<IccTabsConfig>) {
    this._tabsConfig = { ...defaultTabsConfig, ...value };
    this.changeDetectorRef.detectChanges();
  }
  get tabsConfig(): IccTabsConfig {
    return this._tabsConfig;
  }

  @Input() selectedTabIndex = 0;
  @Input() tabs!: IccTabConfig[];

  get contextMenuTrigger(): IccTrigger {
    return this.tabsConfig.enableContextMenu ? IccTrigger.CONTEXTMENU : IccTrigger.NOOP;
  }

  dragDisabled(tab: IccTabConfig): boolean {
    return !this.tabsConfig.tabReorder;
  }

  closeable(tab: IccTabConfig): boolean {
    return this.tabsConfig.closeable && !!tab.closeable;
  }

  getDisabled(tab: IccTabConfig, index: number): IccDisabled[] {
    return [...defaultContextMenu].map((menu) => ({
      name: menu.name,
      disabled: this.menuItemDisabled(menu.name, tab, index),
    }));
  }

  getTabLabel(tab: IccTabConfig): string {
    return tab.title || tab.name;
  }

  onSelectedIndexChange(index: number): void {
    this.selectedTabIndex = index;
  }

  drop(event: CdkDragDrop<IccTabConfig>): void {
    const prevActive = this.tabs[this.selectedTabIndex];
    moveItemInArray(this.tabs, event.previousIndex, event.currentIndex);
    this.selectedTabIndex = this.tabs.indexOf(prevActive);
  }

  onMenuItemClicked(menuItem: IccMenuConfig, tab: IccTabConfig, index: number): void {
    const prevActive = this.tabs[this.selectedTabIndex];
    switch (menuItem.name) {
      case IccContextMenuType.CLOSE:
        this.tabs = [...this.tabs].filter((item) => item.name !== tab.name || !item.closeable);
        break;
      case IccContextMenuType.CLOSE_OTHER_TABS:
        this.tabs = [...this.tabs].filter((item) => item.name === tab.name || !item.closeable);
        break;
      case IccContextMenuType.CLOSE_TABS_TO_THE_RIGHT:
        this.tabs = [...this.tabs].filter((item, idx) => idx < index + 1 || !item.closeable);
        break;
      case IccContextMenuType.CLOSE_TABS_TO_THE_LEFT:
        const right = [...this.tabs].slice(index);
        const notCloseable = [...this.tabs].slice(0, index).filter((item) => !item.closeable);
        this.tabs = [...notCloseable, ...right];
        break;
      case IccContextMenuType.CLOSE_ALL_TABS:
        this.tabs = [...this.tabs].filter((item) => !item.closeable);
        break;
    }
    this.checkSelectedTab(prevActive, index);
    this.changeDetectorRef.markForCheck();
  }

  closeTab(event: MouseEvent, tab: IccTabConfig, index: number): void {
    event.stopPropagation();
    const prevActive = this.tabs[this.selectedTabIndex];
    this.tabs = [...this.tabs].filter((item) => item.name !== tab.name);
    this.checkSelectedTab(prevActive, index);
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

  private checkSelectedTab(prevActive: IccTabConfig, index: number): void {
    const findPrevActive = this.tabs.findIndex((item) => item.name === prevActive.name);
    if (this.tabs.length === 0) {
      this.selectedTabIndex = -1;
    } else if (findPrevActive === -1 || findPrevActive !== this.selectedTabIndex) {
      this.selectedTabIndex = -1;
      timer(10)
        .pipe(take(1))
        .subscribe(() => {
          this.selectedTabIndex = 0;
          this.changeDetectorRef.markForCheck();
        });
    }
  }
}
