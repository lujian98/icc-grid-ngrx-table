import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IccMenuItem } from './models/menu-item.model';
import { IccMenuItemComponent } from './components/menu-item/menu-item.component';

@Component({
  selector: 'icc-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IccMenuItemComponent],
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
