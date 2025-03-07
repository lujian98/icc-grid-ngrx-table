import { CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
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
  defaultTabsConfig,
  IccContextMenuType,
  IccTabConfig,
  IccTabMenuConfig,
  IccTabsConfig,
} from '../models/tabs.model';

@Component({
  selector: 'icc-tabs-view',
  templateUrl: './tabs-view.component.html',
  styleUrls: ['./tabs-view.component.scss'],
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
export class IccTabsViewComponent {
  private changeDetectorRef = inject(ChangeDetectorRef);
  private _tabsConfig: IccTabsConfig = defaultTabsConfig;
  private tabsFacade = inject(IccTabsFacade);
  position: IccPosition = IccPosition.BOTTOMRIGHT;
  menuItem = defaultContextMenu;

  @Input()
  set tabsConfig(value: IccTabsConfig) {
    this._tabsConfig = value;
  }
  get tabsConfig(): IccTabsConfig {
    return this._tabsConfig;
  }

  @Input() tab!: IccTabConfig;
  @Input() tabs!: IccTabConfig[];
  @Input() index!: number;

  get contextMenuTrigger(): IccTrigger {
    return this.tabsConfig.enableContextMenu ? IccTrigger.CONTEXTMENU : IccTrigger.NOOP;
  }

  @Output() iccTabsChange = new EventEmitter<IccTabConfig[]>(false);

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

  private setSelectedIndex(index: number): void {
    this.tabsConfig = {
      ...this.tabsConfig,
      selectedTabIndex: index,
    };
    this.changeDetectorRef.markForCheck();
  }

  onMenuItemClicked(menuItem: IccMenuConfig, tab: IccTabConfig): void {
    const index = this.index;
    const prevActive = this.tabs[this.tabsConfig.selectedTabIndex];
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
    this.iccTabsChange.emit(this.tabs);
  }

  closeTab(event: MouseEvent, tab: IccTabConfig): void {
    const index = this.index;
    event.stopPropagation();
    const prevActive = this.tabs[this.tabsConfig.selectedTabIndex];
    this.tabs = [...this.tabs].filter((item) => item.name !== tab.name);
    this.checkSelectedTab(prevActive, index);
    this.iccTabsChange.emit(this.tabs);
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
      this.setSelectedIndex(-1);
    } else if (findPrevActive === -1 || findPrevActive !== this.tabsConfig.selectedTabIndex) {
      this.setSelectedIndex(-1);
      timer(10)
        .pipe(take(1))
        .subscribe(() => {
          this.setSelectedIndex(0);
          this.changeDetectorRef.markForCheck();
        });
    }
  }
}
