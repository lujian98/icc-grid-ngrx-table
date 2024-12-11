import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IccPopoverMenuComponent, IccMenusComponent, IccMenuItem } from '@icc/ui/menu';
import { IccPopoverComponent, IccPopoverDirective } from '@icc/ui/popover';
import { IccTrigger } from '@icc/ui/overlay';

@Component({
  selector: 'app-simple-menu',
  templateUrl: './simple-menu.component.html',
  styleUrls: ['./simple-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IccMenusComponent, IccPopoverMenuComponent, IccPopoverComponent, IccPopoverDirective],
})
export class AppSimpleMenuComponent implements OnInit {
  contextmenu: IccTrigger = IccTrigger.CONTEXTMENU;

  menuItems: any;
  testMenuItems: IccMenuItem = {
    icon: 'ellipsis-v',
    name: 'group0',
    //title: 'Group',
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
                //type: 'checkbox',
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

  ngOnInit() {
    this.menuItems = [this.testMenuItems];
  }

  menuItemClick(item: IccMenuItem): void {
    console.log(' 999999 end  iccMenuItemClick=', item);
  }
}
