import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IccPopoverMenuComponent, IccPopoverMenuItemComponent } from '@icc/ui/menu';
import { IccPopoverComponent, IccPopoverDirective } from '@icc/ui/popover';
import { IccPosition, IccTrigger, IccDynamicOverlayService } from '@icc/ui/overlay';

@Component({
  selector: 'app-simple-menu',
  templateUrl: './simple-menu.component.html',
  styleUrls: ['./simple-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    IccPopoverMenuComponent,
    IccPopoverMenuItemComponent,
    IccPopoverComponent,
    IccPopoverDirective,
  ],
})
export class AppSimpleMenuComponent implements OnInit {
  menuItemComponent = IccPopoverMenuItemComponent;

  contextmenu: IccTrigger = IccTrigger.CONTEXTMENU;

  cMenuItems: any;
  testMenuItems = {
    icon: 'fas fa-ellipsis-v',
    title: 'Group',
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
                type: 'checkbox',
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
    this.cMenuItems = {
      menuItemConfigs: this.testMenuItems.children,
    };
  }

  onMenuItemChanged(event: any) {
    console.log(' ppppppppppppp menu clicked=', event);
  }
}
