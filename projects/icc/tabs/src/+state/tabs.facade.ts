import { inject, Injectable, Signal } from '@angular/core';
import { IccMenuConfig } from '@icc/ui/menu';
import { Store } from '@ngrx/store';
import { IccTabConfig, IccTabOption, IccTabsConfig, IccTabsSetting } from '../models/tabs.model';
import * as tabsActions from './tabs.actions';
import { selectTabsConfig, selectTabsOptions, selectTabsSetting, selectTabsTabs } from './tabs.selectors';

@Injectable()
export class IccTabsFacade {
  private store = inject(Store);

  initTabsConfig(tabsId: string, tabsConfig: IccTabsConfig): void {
    this.store.dispatch(tabsActions.initTabsConfig({ tabsId, tabsConfig }));
    if (tabsConfig.remoteConfig) {
      this.store.dispatch(tabsActions.loadRemoteTabsConfig({ tabsId, tabsConfig }));
    }
  }

  setTabsConfig(tabsId: string, tabsConfig: IccTabsConfig): void {
    this.store.dispatch(tabsActions.loadTabsConfigSuccess({ tabsId, tabsConfig }));
  }

  setTabsTabs(tabsId: string, tabs: IccTabConfig[]): void {
    this.store.dispatch(tabsActions.loadTabsTabsSuccess({ tabsId, tabs }));
  }

  setTabsOptions(tabsId: string, options: IccTabOption<unknown>[]): void {
    this.store.dispatch(tabsActions.loadTabsOptions({ tabsId, options }));
  }

  setSelectedIndex(tabsId: string, index: number): void {
    this.store.dispatch(tabsActions.setSelectedIndex({ tabsId, index }));
  }

  setAddTab(tabsId: string, tab: IccTabConfig): void {
    this.store.dispatch(tabsActions.setAddTab({ tabsId, tab }));
  }

  setDragDropTab(tabsId: string, previousIndex: number, currentIndex: number): void {
    this.store.dispatch(tabsActions.setDragDropTab({ tabsId, previousIndex, currentIndex }));
  }

  setContextMenuClicked(tabsId: string, menuItem: IccMenuConfig, tab: IccTabConfig, index: number): void {
    this.store.dispatch(tabsActions.setContextMenuClicked({ tabsId, menuItem, tab, index }));
  }

  setCloseTab(tabsId: string, tab: IccTabConfig): void {
    this.store.dispatch(tabsActions.setCloseTab({ tabsId, tab }));
  }

  clearTabsStore(tabsId: string): void {
    this.store.dispatch(tabsActions.clearTabsStore({ tabsId }));
  }

  getSetting(tabsId: string): Signal<IccTabsSetting> {
    return this.store.selectSignal(selectTabsSetting(tabsId));
  }

  getTabsConfig(tabsId: string): Signal<IccTabsConfig> {
    return this.store.selectSignal(selectTabsConfig(tabsId));
  }

  getTabsTabs(tabsId: string): Signal<IccTabConfig[]> {
    return this.store.selectSignal(selectTabsTabs(tabsId));
  }

  getTabsOptions(tabsId: string): Signal<IccTabConfig[]> {
    return this.store.selectSignal(selectTabsOptions(tabsId));
  }
}
