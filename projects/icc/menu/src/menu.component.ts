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


  itemClicked(event: MouseEvent, item: IccMenuItem) {
    console.log(' selected change=', item)
    this.setSelected(item);
  }

  private setSelected(selected: IccMenuItem): void {
    this.items.forEach((item) => item.selected = false);
    selected.selected = true;
    if(selected.checkbox) {
      selected.checked = !selected.checked;
    }
    //console.log(' this.items=', this.items)
  }
}
