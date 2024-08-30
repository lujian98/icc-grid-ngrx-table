import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { IccIconModule } from '@icc/ui/icon';
import { IccMenuItem } from '../../models/menu-item.model';

@Component({
  selector: 'icc-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IccIconModule,
  ],
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

  get disabled() {
    return this.menuItem.disabled;
  }

  get title(): string {
    return this.menuItem.title === undefined ? this.menuItem.name : this.menuItem.title;
  }
}
