import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, ElementRef, ViewChild } from '@angular/core';
import { IccMenuItem, IccMenusComponent, IccPopoverMenuComponent, IccMenuPanelComponent } from '@icc/ui/menu';
import {
  DEFAULT_OVERLAY_SERVICE_CONFIG,
  IccDynamicOverlayService,
  IccOverlayServiceConfig,
  IccPosition,
  IccTrigger,
} from '@icc/ui/overlay';
import { IccPopoverComponent } from '@icc/ui/popover';

@Component({
  selector: 'app-simple-menu',
  templateUrl: './simple-menu.component.html',
  styleUrls: ['./simple-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IccMenusComponent, IccPopoverMenuComponent],
  providers: [IccDynamicOverlayService],
})
export class AppSimpleMenuComponent implements OnInit {
  private dynamicOverlayService = inject(IccDynamicOverlayService);
  private elementRef = inject(ElementRef);
  contextmenu: IccTrigger = IccTrigger.CONTEXTMENU;

  menuItems: any;
  testMenuItems: IccMenuItem = {
    icon: 'ellipsis-v',
    name: 'group0',
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

  @ViewChild('menuPanelEl') private menuPanelEl!: ElementRef;

  openMenuPanel(event: MouseEvent): void {
    console.log(' openMenuPanel=', this.menuPanelEl);
    const popoverContext = {
      menuItems: this.testMenuItems.children,
    };

    const overlayServiceConfig: IccOverlayServiceConfig = {
      ...DEFAULT_OVERLAY_SERVICE_CONFIG,
      trigger: IccTrigger.HOVER,
      position: IccPosition.BOTTOM_END,
      event,
    };
    this.dynamicOverlayService.build(
      IccPopoverComponent,
      this.menuPanelEl,
      overlayServiceConfig,
      IccMenuPanelComponent,
      popoverContext,
    );
    this.showMenu();
  }

  private showMenu(): void {
    this.hideMenu();
    this.dynamicOverlayService.show();
  }

  private hideMenu() {
    this.dynamicOverlayService.hide();
  }
}
