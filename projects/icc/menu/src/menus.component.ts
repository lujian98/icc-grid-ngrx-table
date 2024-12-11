import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IccTrigger, IccPosition } from '@icc/ui/overlay';
import { IccPopoverDirective } from '@icc/ui/popover';
import { IccMenuItemComponent } from './components/menu-item/menu-item.component';
import { IccMenuItem } from './models/menu-item.model';
import { IccButtonComponent } from '@icc/ui/button';
import { IccIconModule } from '@icc/ui/icon';

@Component({
  selector: 'icc-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IccIconModule, IccMenuItemComponent, IccPopoverDirective, IccButtonComponent],
})
export class IccMenusComponent {
  private _items: IccMenuItem[] = [];
  private selected: IccMenuItem | undefined;
  bottom = IccPosition.BOTTOM;
  rightBottom = IccPosition.RIGHTBOTTOM;
  @Input()
  set items(val: IccMenuItem[]) {
    this._items = val;
    if (this.selected) {
      this.items.forEach((item) => (item.selected = item.name === this.selected!.name));
    }
  }
  get items(): IccMenuItem[] {
    return this._items;
  }

  @Input() level = 0;

  @Input() menuTrigger: IccTrigger = IccTrigger.CLICK;

  get popoverTrigger(): IccTrigger {
    return IccTrigger.HOVER;
    //return this.level === 0 ? this.menuTrigger : IccTrigger.HOVER;
  }

  @Output() iccMenuItemChange = new EventEmitter<IccMenuItem>(true);
  @Output() iccMenuItemClick = new EventEmitter<IccMenuItem>(false);

  menuItemClick(item: IccMenuItem): void {
    //console.log( ' 1111 iccMenuItemClick=', item)
    this.iccMenuItemClick.emit(item);
  }

  isLeafMenu(item: IccMenuItem): boolean {
    return !item.hidden && (!item.children || item.children.length === 0);
  }

  hasChildItem(item: IccMenuItem): boolean {
    return !item.hidden && !!item.children && item.children.length > 0;
  }

  itemClicked(event: MouseEvent, selectedItem: IccMenuItem): void {
    if (selectedItem.disabled) {
      event.stopPropagation();
    } else {
      if (selectedItem.checkbox) {
        selectedItem = {
          ...selectedItem,
          checked: !selectedItem.checked,
        };
      }
      this.setSelected(selectedItem);
      this.iccMenuItemChange.emit(selectedItem);
    }
  }

  private setSelected(selectedItem: IccMenuItem): void {
    this.items.forEach((item) => (item.selected = item.name === selectedItem.name));
    this.selected = selectedItem;
  }
}
