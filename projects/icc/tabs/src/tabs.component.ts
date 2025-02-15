import { CdkDrag, CdkDragDrop, CdkDropList, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { IccIconModule } from '@icc/ui/icon';
import { IccPortalComponent } from '@icc/ui/portal';
import { take, timer } from 'rxjs';
import { IccTabGroupComponent } from './components/tab-group/tab-group.component';
import { IccTabComponent } from './components/tab/tab.component';
import { IccTabLabelDirective } from './directives/tab-label.directive';
import { defaultTabsConfig, IccTabConfig, IccTabsConfig } from './models/tabs.model';
import { IccMenuItem, IccMenusComponent, IccPopoverMenuComponent, IccMenuPanelComponent } from '@icc/ui/menu';
import { IccPopoverDirective } from '@icc/ui/popover';
import { IccPosition, IccTrigger } from '@icc/ui/overlay';

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
    IccTabLabelDirective,
    IccTabComponent,
    IccTabGroupComponent,
    IccPortalComponent,
    IccIconModule,
    IccMenusComponent,
    IccPopoverDirective,
  ],
})
export class IccTabsComponent {
  private changeDetectorRef = inject(ChangeDetectorRef);
  private _tabsConfig: IccTabsConfig = defaultTabsConfig;

  menuTrigger: IccTrigger = IccTrigger.CONTEXTMENU;
  position: IccPosition = IccPosition.BOTTOMRIGHT;

  menuItem = [
    {
      title: 'Delight your Organization',
      name: 'star_rate',
    },
    {
      title: "What's up with the Web?",
      name: 'star_rate',
    },
    {
      title: 'My ally, the CLI',
      name: 'star_rate',
    },
    {
      title: 'Become an Angular Tailor',
      name: 'star_rate',
    },
  ];

  popoverContext = {
    gridId: 'test',
    menuItems: this.menuItem,
    values: [],
  };

  onMenuItemChanged(menuItem: IccMenuItem) {
    console.log(' click menu=', menuItem);
    if (!menuItem.disabled) {
      // this.iccItemChangedEvent.emit(menuItem);
    }
  }

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

  dragDisabled(tab: IccTabConfig): boolean {
    return !this.tabsConfig.tabReorder;
  }

  closeable(tab: IccTabConfig): boolean {
    return this.tabsConfig.closeable && !!tab.closeable;
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

  removeTab(event: MouseEvent, tab: IccTabConfig, index: number): void {
    event.stopPropagation();
    const prevActive = this.tabs[this.selectedTabIndex];
    this.tabs = [...this.tabs].filter((item) => item.name !== tab.name);
    if (index === this.selectedTabIndex) {
      if (this.selectedTabIndex === 0) {
        this.selectedTabIndex = -1;
        timer(10)
          .pipe(take(1))
          .subscribe(() => {
            this.selectedTabIndex = 0;
            this.changeDetectorRef.markForCheck();
          });
      } else {
        this.selectedTabIndex = 0;
      }
    } else {
      this.selectedTabIndex = this.tabs.findIndex((item) => item.name === prevActive.name);
    }
  }
}
