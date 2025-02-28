import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IccPopoverDirective } from '@icc/ui/popover';
import { IccPosition, IccTrigger } from '@icc/ui/overlay';
import { IccMenusComponent } from './menus.component';
import { IccMenuConfig } from './models/menu-item.model';
import { IccIconModule } from '@icc/ui/icon';

@Component({
  selector: 'icc-popover-menu',
  templateUrl: 'popover-menu.component.html',
  styleUrls: ['./popover-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IccIconModule, IccMenusComponent, IccPopoverDirective],
})
export class IccPopoverMenuComponent {
  @Input() menuItem!: IccMenuConfig;
  @Input() menuTrigger: IccTrigger = IccTrigger.CLICK;
  @Input() position: IccPosition = IccPosition.BOTTOM;
  @Input() clickToClose = false;

  level = 0;

  @Output() iccItemChangedEvent: EventEmitter<IccMenuConfig> = new EventEmitter();

  onMenuItemChanged(menuItem: IccMenuConfig) {
    if (!menuItem.disabled) {
      this.iccItemChangedEvent.emit(menuItem);
    }
  }
}
