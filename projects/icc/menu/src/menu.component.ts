import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { IccMenuItem } from './models/menu-item.model';

@Component({
  selector: 'icc-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IccMenuComponent {
  private _items: IccMenuItem[] = [];
  // @Input() menuType!: string;
  private selected: IccMenuItem | undefined;

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

  @Output() iccMenuItemChange = new EventEmitter<IccMenuItem>(true);

  onCheckboxChange(selectedItem: IccMenuItem): void {
    //checkbox emit here
    this.items = [...this.items].map((item) => {
      return item.name === selectedItem.name
        ? {
            ...selectedItem,
            selected: true,
          }
        : {
            ...item,
            selected: false,
          };
    });
    this.selected = selectedItem;
    this.iccMenuItemChange.emit(selectedItem);
  }

  itemClicked(event: MouseEvent, selectedItem: IccMenuItem): void {
    if (selectedItem.disabled) {
      event.stopPropagation();
    } else {
      this.setSelected(selectedItem);
      this.iccMenuItemChange.emit(selectedItem);
    }
  }

  private setSelected(selectedItem: IccMenuItem): void {
    this.items.forEach((item) => (item.selected = item.name === selectedItem.name));
    this.selected = selectedItem;
  }
}
