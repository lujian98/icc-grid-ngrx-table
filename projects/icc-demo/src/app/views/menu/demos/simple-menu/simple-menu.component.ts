import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, ElementRef } from '@angular/core';
import { IccPopoverMenuComponent, IccMenusComponent, IccMenuItem } from '@icc/ui/menu';
import { IccPopoverComponent, IccPopoverDirective } from '@icc/ui/popover';
import { AppDialogDemoComponent } from './dialog.component';
import {
  DEFAULT_OVERLAY_SERVICE_CONFIG,
  IccDynamicOverlayService,
  IccOverlayServiceConfig,
  IccPosition,
  IccTrigger,
  IccOverlayModule,
} from '@icc/ui/overlay';
import { IccDialogService, IccDialogModule } from '@icc/ui/dialog';

@Component({
  selector: 'app-simple-menu',
  templateUrl: './simple-menu.component.html',
  styleUrls: ['./simple-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    IccMenusComponent,
    IccDialogModule, //.forRoot(),
    IccPopoverMenuComponent,
    IccPopoverComponent,
    IccPopoverDirective,
    AppDialogDemoComponent,
  ],
  providers: [IccDynamicOverlayService, IccDialogService],
})
export class AppSimpleMenuComponent implements OnInit {
  private dynamicOverlayService = inject(IccDynamicOverlayService);
  private dialogService = inject(IccDialogService);
  private elementRef = inject(ElementRef);
  dialog = AppDialogDemoComponent;
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
    let dialogRef = this.dialogService.open(AppDialogDemoComponent, {
      context: {
        dialog: {
          title: 'APPLIANCE_SERVICES.APPLIANCE_MAINTENANCE.SHUTDOWN',
          content: 'APPLIANCE_SERVICES.APPLIANCE_MAINTENANCE.SHUTDOWN_WARNING',
        },
      },
      closeOnBackdropClick: false,
    });
  }

  openDialog2(event: MouseEvent): void {
    const dialogContext = {};
    const overlayServiceConfig: IccOverlayServiceConfig = {
      ...DEFAULT_OVERLAY_SERVICE_CONFIG,
      trigger: IccTrigger.NOOP,
      position: IccPosition.BOTTOM_END,
      event,
    };
    this.dynamicOverlayService.build(
      IccPopoverComponent,
      this.elementRef,
      overlayServiceConfig,
      this.dialog,
      dialogContext,
    );
    console.log(' oppppppppppppppppppppppppppppppp');
    this.showMenu();
  }

  private showMenu(): void {
    //this.hideMenu();
    this.dynamicOverlayService.show();
  }

  private hideMenu() {
    this.dynamicOverlayService.hide();
  }
}
