import { Component, Input, OnInit, TemplateRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IccMenuItem } from './menu-item';
import { IccMenuService } from './menu.service';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'icc-menu',
  templateUrl: './menu.component.html',
})
export class IccMenuComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() items!: IccMenuItem[];
  @Input() menuItemTpl!: TemplateRef<any>;
  @Input() menuType!: string;

  @Input()
  get autoCollapse(): boolean {
    return this._autoCollapse;
  }
  set autoCollapse(value: boolean) {
    this._autoCollapse = coerceBooleanProperty(value);
  }
  protected _autoCollapse: boolean = true;

  protected destroy$ = new Subject<void>();

  constructor(private menuService: IccMenuService, private router: Router) {}

  ngOnInit(): void {
    if (this.items && this.items.length > 0) {
      this.menuService.setParents(this.items);
    }

    this.menuService
      .onNavigateHome()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.navigateHome());

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.menuService.selectFromUrl(this.items, this.autoCollapse);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.menuService.selectFromUrl(this.items, this.autoCollapse));
  }

  onSelectItem(item: IccMenuItem) {
    this.menuService.selectItem(item, this.items, this.autoCollapse);
  }

  itemClicked(event: MouseEvent, item: IccMenuItem) {
    if (item.disabled || (this.menuType === 'nested' && item.children)) {
      event.preventDefault();
      event.stopPropagation();
    } else if (this.menuType === 'nested') {
      // handle nested context menu only
      this.menuService.itemClick(item);
    }
  }

  onToggleSubMenu(item: IccMenuItem) {
    this.menuService.collapseAll(this.items, item);

    item._expanded = !item._expanded;
  }

  private navigateHome() {
    const homeItem = this.getHomeItem(this.items);

    if (homeItem) {
      if (homeItem.link) {
        this.router.navigate([homeItem.link]);
      }

      if (homeItem.url) {
        window.location.href = homeItem.url;
      }
    }
  }

  private getHomeItem(items: IccMenuItem[]): IccMenuItem | null {
    for (const item of items) {
      if (item.home) {
        return item;
      }
    }
    return null;
  }
}
