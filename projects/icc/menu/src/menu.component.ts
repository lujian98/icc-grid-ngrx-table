import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { IccMenuItem } from './models/menu-item.model';

@Component({
  selector: 'icc-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IccMenuComponent {
  @Input() items: IccMenuItem[] = [];
  // @Input() menuType!: string;

  @Output() iccMenuItemChange = new EventEmitter<IccMenuItem>(true);

  onCheckboxChange(selectedItem: IccMenuItem): void { //checkbox emit here
    this.items = [...this.items].map(((item) => {
      return (item.name === selectedItem.name) ?
        {
          ...selectedItem,
          selected: true,
        } :
        {
          ...item,
          selected: false,
        }
    }));
    this.iccMenuItemChange.emit(selectedItem);
  }

  itemClicked(selectedItem: IccMenuItem) {
    this.setSelected(selectedItem);
    this.iccMenuItemChange.emit(selectedItem);
  }

  private setSelected(selectedItem: IccMenuItem): void {
    this.items.forEach((item) => item.selected = item.name === selectedItem.name);
  }
}
