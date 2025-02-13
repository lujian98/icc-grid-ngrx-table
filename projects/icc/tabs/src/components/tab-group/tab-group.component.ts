import {
  AfterContentChecked,
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewChild,
  booleanAttribute,
  inject,
  numberAttribute,
  ANIMATION_MODULE_TYPE,
  ViewChildren,
  AfterViewInit,
  NgZone,
} from '@angular/core';
import { ICC_TAB_GROUP, IccTabComponent } from '../tab/tab.component';
import { IccTabHeaderComponent } from '../tab-header/tab-header.component';
import { merge, Subscription } from 'rxjs';
import { ICC_TAB_GROUP_CONFIG, IccTabGroupConfig } from '../../models/tab-group.model';
import { startWith } from 'rxjs/operators';
import { _IdGenerator, CdkMonitorFocus, FocusOrigin } from '@angular/cdk/a11y';
import { IccTabBodyComponent } from '../tab-body/tab-body.component';
import { CdkPortalOutlet } from '@angular/cdk/portal';
import { IccTabLabelWrapperDirective } from '../../directives/tab-label-wrapper.directive';
import { Platform } from '@angular/cdk/platform';

export interface IccTabGroupBaseHeader {
  _alignInkBarToSelectedTab(): void;
  updatePagination(): void;
  focusIndex: number;
}

export type IccTabHeaderPosition = 'above' | 'below';

@Component({
  selector: 'icc-tab-group',
  exportAs: 'iccTabGroup',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: ICC_TAB_GROUP,
      useExisting: IccTabGroupComponent,
    },
  ],
  host: {
    class: 'mat-mdc-tab-group',
    '[class]': '"mat-" + (color || "primary")',
    '[class.mat-mdc-tab-group-dynamic-height]': 'dynamicHeight',
    '[class.mat-mdc-tab-group-inverted-header]': 'headerPosition === "below"',
    '[class.mat-mdc-tab-group-stretch-tabs]': 'stretchTabs',
    '[attr.mat-align-tabs]': 'alignTabs',
    '[style.--mat-tab-animation-duration]': 'animationDuration',
  },
  imports: [IccTabHeaderComponent, IccTabLabelWrapperDirective, CdkMonitorFocus, CdkPortalOutlet, IccTabBodyComponent],
})
export class IccTabGroupComponent implements AfterViewInit, AfterContentInit, AfterContentChecked, OnDestroy {
  readonly _elementRef = inject(ElementRef);
  private _changeDetectorRef = inject(ChangeDetectorRef);
  private _ngZone = inject(NgZone);
  private _tabsSubscription = Subscription.EMPTY;
  private _tabLabelSubscription = Subscription.EMPTY;
  private _tabBodySubscription = Subscription.EMPTY;

  _animationMode = inject(ANIMATION_MODULE_TYPE, { optional: true });

  @ContentChildren(IccTabComponent, { descendants: true }) _allTabs!: QueryList<IccTabComponent>;
  @ViewChildren(IccTabBodyComponent) _tabBodies: QueryList<IccTabBodyComponent> | undefined;
  @ViewChild('tabBodyWrapper') _tabBodyWrapper!: ElementRef;
  @ViewChild('tabHeader') _tabHeader!: IccTabHeaderComponent;

  _tabs: QueryList<IccTabComponent> = new QueryList<IccTabComponent>();
  private _indexToSelect: number | null = 0;
  private _lastFocusedTabIndex: number | null = null;
  private _tabBodyWrapperHeight: number = 0;

  @Input({ transform: booleanAttribute })
  get fitInkBarToContent(): boolean {
    return this._fitInkBarToContent;
  }
  set fitInkBarToContent(value: boolean) {
    this._fitInkBarToContent = value;
    this._changeDetectorRef.markForCheck();
  }
  private _fitInkBarToContent = false;

  @Input({ alias: 'mat-stretch-tabs', transform: booleanAttribute })
  stretchTabs: boolean = true;

  @Input({ alias: 'mat-align-tabs' })
  alignTabs: string | null = null;

  @Input({ transform: booleanAttribute })
  dynamicHeight: boolean = false;

  @Input({ transform: numberAttribute })
  get selectedIndex(): number | null {
    return this._selectedIndex;
  }
  set selectedIndex(value: number) {
    this._indexToSelect = isNaN(value) ? null : value;
  }
  private _selectedIndex: number | null = null;

  @Input() headerPosition: IccTabHeaderPosition = 'above';

  @Input()
  get animationDuration(): string {
    return this._animationDuration;
  }
  set animationDuration(value: string | number) {
    const stringValue = value + '';
    this._animationDuration = /^\d+$/.test(stringValue) ? value + 'ms' : stringValue;
  }
  private _animationDuration!: string;

  @Input({ transform: numberAttribute })
  get contentTabIndex(): number | null {
    return this._contentTabIndex;
  }
  set contentTabIndex(value: number) {
    this._contentTabIndex = isNaN(value) ? null : value;
  }
  private _contentTabIndex!: number | null;

  @Input({ transform: booleanAttribute })
  disablePagination: boolean = false;
  @Input({ transform: booleanAttribute })
  preserveContent: boolean = false;
  @Input('aria-label') ariaLabel!: string;
  @Input('aria-labelledby') ariaLabelledby!: string;
  @Output() readonly selectedIndexChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() readonly focusChange: EventEmitter<IccTabChangeEvent> = new EventEmitter<IccTabChangeEvent>();
  @Output() readonly animationDone: EventEmitter<void> = new EventEmitter<void>();
  @Output() readonly selectedTabChange: EventEmitter<IccTabChangeEvent> = new EventEmitter<IccTabChangeEvent>(true);

  private _groupId: string;
  protected _isServer: boolean = !inject(Platform).isBrowser;
  constructor(...args: unknown[]);

  constructor() {
    const defaultConfig = inject<IccTabGroupConfig>(ICC_TAB_GROUP_CONFIG, { optional: true });

    this._groupId = inject(_IdGenerator).getId('mat-tab-group-');
    this.animationDuration =
      defaultConfig && defaultConfig.animationDuration ? defaultConfig.animationDuration : '500ms';
    this.disablePagination =
      defaultConfig && defaultConfig.disablePagination != null ? defaultConfig.disablePagination : false;
    this.dynamicHeight = defaultConfig && defaultConfig.dynamicHeight != null ? defaultConfig.dynamicHeight : false;
    if (defaultConfig?.contentTabIndex != null) {
      this.contentTabIndex = defaultConfig.contentTabIndex;
    }
    this.preserveContent = !!defaultConfig?.preserveContent;
    this.fitInkBarToContent =
      defaultConfig && defaultConfig.fitInkBarToContent != null ? defaultConfig.fitInkBarToContent : false;
    this.stretchTabs = defaultConfig && defaultConfig.stretchTabs != null ? defaultConfig.stretchTabs : true;
    this.alignTabs = defaultConfig && defaultConfig.alignTabs != null ? defaultConfig.alignTabs : null;
  }

  ngAfterContentChecked() {
    const indexToSelect = (this._indexToSelect = this._clampTabIndex(this._indexToSelect));
    if (this._selectedIndex != indexToSelect) {
      const isFirstRun = this._selectedIndex == null;

      if (!isFirstRun) {
        this.selectedTabChange.emit(this._createChangeEvent(indexToSelect));
        const wrapper = this._tabBodyWrapper.nativeElement;
        wrapper.style.minHeight = wrapper.clientHeight + 'px';
      }

      Promise.resolve().then(() => {
        this._tabs.forEach((tab, index) => (tab.isActive = index === indexToSelect));

        if (!isFirstRun) {
          this.selectedIndexChange.emit(indexToSelect);
          this._tabBodyWrapper.nativeElement.style.minHeight = '';
        }
      });
    }

    this._tabs.forEach((tab: IccTabComponent, index: number) => {
      tab.position = index - indexToSelect;
      if (this._selectedIndex != null && tab.position == 0 && !tab.origin) {
        tab.origin = indexToSelect - this._selectedIndex;
      }
    });

    if (this._selectedIndex !== indexToSelect) {
      this._selectedIndex = indexToSelect;
      this._lastFocusedTabIndex = null;
      this._changeDetectorRef.markForCheck();
    }
  }

  ngAfterContentInit() {
    this._subscribeToAllTabChanges();
    this._subscribeToTabLabels();

    this._tabsSubscription = this._tabs.changes.subscribe(() => {
      const indexToSelect = this._clampTabIndex(this._indexToSelect);
      if (indexToSelect === this._selectedIndex) {
        const tabs = this._tabs.toArray();
        let selectedTab: IccTabComponent | undefined;

        for (let i = 0; i < tabs.length; i++) {
          if (tabs[i].isActive) {
            this._indexToSelect = this._selectedIndex = i;
            this._lastFocusedTabIndex = null;
            selectedTab = tabs[i];
            break;
          }
        }

        if (!selectedTab && tabs[indexToSelect]) {
          Promise.resolve().then(() => {
            tabs[indexToSelect].isActive = true;
            this.selectedTabChange.emit(this._createChangeEvent(indexToSelect));
          });
        }
      }

      this._changeDetectorRef.markForCheck();
    });
  }

  ngAfterViewInit() {
    this._tabBodySubscription = this._tabBodies!.changes.subscribe(() => this._bodyCentered(true));
  }

  private _subscribeToAllTabChanges() {
    this._allTabs.changes.pipe(startWith(this._allTabs)).subscribe((tabs: QueryList<IccTabComponent>) => {
      this._tabs.reset(
        tabs.filter((tab) => {
          return tab._closestTabGroup === this || !tab._closestTabGroup;
        }),
      );
      this._tabs.notifyOnChanges();
    });
  }

  ngOnDestroy() {
    this._tabs.destroy();
    this._tabsSubscription.unsubscribe();
    this._tabLabelSubscription.unsubscribe();
    this._tabBodySubscription.unsubscribe();
  }

  realignInkBar() {
    if (this._tabHeader) {
      this._tabHeader._alignInkBarToSelectedTab();
    }
  }

  updatePagination() {
    if (this._tabHeader) {
      this._tabHeader.updatePagination();
    }
  }

  focusTab(index: number) {
    const header = this._tabHeader;

    if (header) {
      header.focusIndex = index;
    }
  }

  _focusChanged(index: number) {
    this._lastFocusedTabIndex = index;
    this.focusChange.emit(this._createChangeEvent(index));
  }

  private _createChangeEvent(index: number): IccTabChangeEvent {
    const event = new IccTabChangeEvent();
    event.index = index;
    if (this._tabs && this._tabs.length) {
      event.tab = this._tabs.toArray()[index];
    }
    return event;
  }

  private _subscribeToTabLabels() {
    if (this._tabLabelSubscription) {
      this._tabLabelSubscription.unsubscribe();
    }

    this._tabLabelSubscription = merge(...this._tabs.map((tab) => tab._stateChanges)).subscribe(() =>
      this._changeDetectorRef.markForCheck(),
    );
  }

  private _clampTabIndex(index: number | null): number {
    return Math.min(this._tabs.length - 1, Math.max(index || 0, 0));
  }

  _getTabLabelId(i: number): string {
    return `${this._groupId}-label-${i}`;
  }

  _getTabContentId(i: number): string {
    return `${this._groupId}-content-${i}`;
  }

  _setTabBodyWrapperHeight(tabHeight: number): void {
    if (!this.dynamicHeight || !this._tabBodyWrapperHeight) {
      this._tabBodyWrapperHeight = tabHeight;
      return;
    }

    const wrapper: HTMLElement = this._tabBodyWrapper.nativeElement;
    wrapper.style.height = this._tabBodyWrapperHeight + 'px';

    if (this._tabBodyWrapper.nativeElement.offsetHeight) {
      wrapper.style.height = tabHeight + 'px';
    }
  }

  _removeTabBodyWrapperHeight(): void {
    const wrapper = this._tabBodyWrapper.nativeElement;
    this._tabBodyWrapperHeight = wrapper.clientHeight;
    wrapper.style.height = '';
    this._ngZone.run(() => this.animationDone.emit());
  }

  _handleClick(tab: IccTabComponent, tabHeader: IccTabGroupBaseHeader, index: number) {
    tabHeader.focusIndex = index;

    if (!tab.disabled) {
      this.selectedIndex = index;
    }
  }

  _getTabIndex(index: number): number {
    const targetIndex = this._lastFocusedTabIndex ?? this.selectedIndex;
    return index === targetIndex ? 0 : -1;
  }

  _tabFocusChanged(focusOrigin: FocusOrigin, index: number) {
    if (focusOrigin && focusOrigin !== 'mouse' && focusOrigin !== 'touch') {
      this._tabHeader.focusIndex = index;
    }
  }

  protected _bodyCentered(isCenter: boolean) {
    if (isCenter) {
      this._tabBodies?.forEach((body, i) => body._setActiveClass(i === this._selectedIndex));
    }
  }
}

export class IccTabChangeEvent {
  index!: number;
  tab!: IccTabComponent;
}
