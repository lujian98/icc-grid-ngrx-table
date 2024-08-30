import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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
    }))
  }

  itemClicked(event: MouseEvent, item: IccMenuItem) { // if checkbox no emit here
    this.setSelected(item);
  }

  private setSelected(selectedItem: IccMenuItem): void {
    this.items.forEach((item) => item.selected = item.name === selectedItem.name);
  }
}
