import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IccTrigger } from '@icc/ui/overlay';
import { IccPopoverComponent, IccPopoverDirective } from '@icc/ui/popover';
import { IccMenuComponent } from '../../menu.component';
import { IccMenuItem } from '../../models/menu-item.model';

@Component({
  selector: 'icc-popover-menu',
  templateUrl: 'popover-menu.component.html',
  styleUrls: ['./popover-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IccMenuComponent, IccPopoverComponent, IccPopoverDirective],
})
export class IccPopoverMenuComponent {
  @Input() menuItem!: IccMenuItem;
  @Input() menuTrigger: IccTrigger = IccTrigger.CLICK;

  level = 0;

  @Output() iccItemChangedEvent: EventEmitter<any> = new EventEmitter();

  onMenuItemChanged(menuItem: any) {
    if (!menuItem.disabled) {
      this.iccItemChangedEvent.emit(menuItem);
    }
  }
}
