import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IccItemConfig } from './model';
import { CommonModule } from '@angular/common';
import { IccPopoverMenuItemComponent } from './popover-menu-item/popover-menu-item.component';
import { IccPopoverComponent, IccPopoverDirective } from '@icc/ui/popover';
import { IccPosition, IccTrigger, IccDynamicOverlayService } from '@icc/ui/overlay';

@Component({
  selector: 'icc-popover-menu',
  templateUrl: 'popover-menu.component.html',
  styleUrls: ['./popover-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IccPopoverMenuItemComponent, IccPopoverComponent, IccPopoverDirective],
})
export class IccPopoverMenuComponent {
  @Input() menuItemConfig!: IccItemConfig;
  @Input() popoverTrigger: IccTrigger = IccTrigger.CONTEXTMENU;

  @Output() iccItemChangedEvent: EventEmitter<any> = new EventEmitter();

  testMenuItems: IccItemConfig = {
    icon: 'fas fa-ellipsis-v',
    name: 'close',

    children: [
      {
        title: 'Speakers',
        name: 'group',
        children: [
          {
            title: 'Michael Prentice',
            name: 'person',
            children: [
              {
                title: 'Delight your Organization',
                name: 'star_rate',
                //type: 'checkbox'
              },
            ],
          },
          {
            title: 'Stephen Fluin',
            name: 'person',
            children: [
              {
                title: "What's up with the Web?",
                name: 'star_rate',
              },
            ],
          },
          {
            title: 'Mike Brocchi',
            name: 'person',
            children: [
              {
                title: 'My ally, the CLI',
                name: 'star_rate',
              },
              {
                title: 'Become an Angular Tailor',
                name: 'star_rate',
              },
            ],
          },
        ],
      },
      {
        title: 'Sessions',
        name: 'speaker_notes',
        children: [
          {
            title: 'Delight your Organization',
            name: 'star_rate',
          },
          {
            title: "What's up with the Web?",
            name: 'star_rate',
          },
          {
            title: 'My ally, the CLI',
            name: 'star_rate',
          },
          {
            title: 'Become an Angular Tailor',
            name: 'star_rate',
          },
        ],
      },
      {
        title: 'Feedback',
        name: 'feedback',
      },
    ],
  };

  onMenuItemChanged(menuItem: any) {
    if (!menuItem.disabled) {
      this.iccItemChangedEvent.emit(menuItem);
    }
  }
}
