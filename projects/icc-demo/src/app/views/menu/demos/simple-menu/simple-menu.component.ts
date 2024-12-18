import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { IccMenuItem, IccMenusComponent, IccPopoverMenuComponent } from '@icc/ui/menu';
import { IccDialogService, IccTrigger } from '@icc/ui/overlay';
import { IccPopoverComponent, IccPopoverDirective } from '@icc/ui/popover';
import { AppDialogTestDemoComponent } from './dialog-test.component';

@Component({
  selector: 'app-simple-menu',
  templateUrl: './simple-menu.component.html',
  styleUrls: ['./simple-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IccMenusComponent, IccPopoverMenuComponent, IccPopoverComponent, IccPopoverDirective],
})
export class AppSimpleMenuComponent implements OnInit {
  private dialogService = inject(IccDialogService);
  openDialogTrigger = IccTrigger.CLICK;

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
          {
            title: 'James Brocchi',
            name: 'person',
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

  openDialog(event: MouseEvent): void {
    let dialogRef = this.dialogService
      .open(AppDialogTestDemoComponent, {
        context: {
          dialog: {
            title: 'APPLIANCE_SERVICES.APPLIANCE_MAINTENANCE.SHUTDOWN',
            content: 'APPLIANCE_SERVICES.APPLIANCE_MAINTENANCE.SHUTDOWN_WARNING',
          },
        },
        closeOnBackdropClick: false,
      })
      .onClose.subscribe((res) => {
        console.log(' on close res=', res);
      });
  }
}
