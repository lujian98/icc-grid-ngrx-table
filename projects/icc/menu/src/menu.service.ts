import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { share } from 'rxjs/operators';
import { IccMenuItem } from './menu-item';

@Injectable({
  providedIn: 'root',
})
export class IccMenuService {
  private navigateHome$ = new ReplaySubject(1);
  private itemClick$ = new Subject<IccMenuItem>();

  constructor(private location: Location) {}

  collapseAll(items: IccMenuItem[], except?: IccMenuItem) {
    this.collapseItems(items, except);
  }

  navigateHome() {
    this.navigateHome$.next(null);
  }

  onNavigateHome(): Observable<any> {
    return this.navigateHome$.pipe(share());
  }

  onItemClick() {
    return this.itemClick$;
  }

  itemClick(item: IccMenuItem) {
    this.itemClick$.next(item);
  }

  selectFromUrl(items: IccMenuItem[], autoCollapse: boolean = false): void {
    const selectedItem = this.findItemByUrl(items);
    if (selectedItem) {
      this.selectItem(selectedItem, items, autoCollapse);
    }
  }

  selectItem(item: IccMenuItem, items: IccMenuItem[], autoCollapse: boolean = false): void {
    this.resetSelection(items);
    this.collapseItems(items);

    for (const parent of IccMenuItem.getParents(item)) {
      if (!autoCollapse) {
        parent._expanded = true;
      }
      parent.selected = true;
    }

    item.selected = true;
  }

  setParents(items: IccMenuItem[]): void {
    items.forEach((item) => {
      this.setParent(item);
    });
  }

  private collapseItems(items: IccMenuItem[], except?: IccMenuItem): void {
    for (const item of items) {
      if (except && (item === except || IccMenuItem.isParent(item, except))) {
        continue;
      }

      item._expanded = false;

      if (item.children) {
        this.collapseItems(item.children);
      }
    }
  }

  private findItemByUrl(items: IccMenuItem[]): IccMenuItem | null {
    let selectedItem: IccMenuItem | null = null;

    items?.some((item) => {
      if (item.children) {
        selectedItem = this.findItemByUrl(item.children);
      }
      if (!selectedItem && this.isSelectedInUrl(item)) {
        selectedItem = item;
      }

      return selectedItem;
    });

    return selectedItem;
  }

  private isSelectedInUrl(item: IccMenuItem): boolean {
    const start: boolean = item.pathMatch === 'start';
    const link = item?.link as string;

    const isSelectedInPath = start ? this.location.path().startsWith(link) : this.location.path() === link;

    return isSelectedInPath;
  }

  private resetSelection(items: IccMenuItem[]) {
    for (const item of items) {
      item.selected = false;

      if (item.children) {
        this.resetSelection(item.children);
      }
    }
  }

  private setParent(item: IccMenuItem) {
    item.children?.forEach((child) => {
      child._parent = item;
      this.setParent(child);
    });
  }
}
