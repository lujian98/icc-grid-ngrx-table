import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { IccCheckboxComponent } from '@icc/ui/checkbox';
import { IccIconModule } from '@icc/ui/icon';
import { TranslateModule } from '@ngx-translate/core';
import { IccMenuItem } from '../../models/menu-item.model';

@Component({
  selector: 'icc-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, IccIconModule, IccCheckboxComponent],
})
export class IccMenuItemComponent {
  @Input() menuItem!: IccMenuItem;
  @Input() menuType!: string;

  @HostBinding('class.menu-item-separator')
  get separator() {
    return this.menuItem.separator;
  }

  @HostBinding('class.selected')
  get selectedClass(): boolean {
    return !!this.menuItem.selected;
  }

  @HostBinding('class.disabled')
  @Input()
  get disabled(): boolean {
    return !!this.menuItem.disabled;
  }

  get title(): string {
    return this.menuItem.title === undefined ? this.menuItem.name : this.menuItem.title;
  }

  @Output() iccMenuItemClick = new EventEmitter<IccMenuItem>(false);

  hasChildItem(item: IccMenuItem): boolean {
    return !item.hidden && !!item.children && item.children.length > 0;
  }

  @HostListener('click', ['$event']) onClick(event: MouseEvent) {
    this.iccMenuItemClick.emit(this.menuItem);
  }
}
