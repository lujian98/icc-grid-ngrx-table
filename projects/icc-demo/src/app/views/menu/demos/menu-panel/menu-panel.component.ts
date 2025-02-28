import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject } from '@angular/core';
import { IccButtonComponent } from '@icc/ui/button';
import { IccIconModule } from '@icc/ui/icon';
import { IccCheckboxComponent } from '@icc/ui/checkbox';
import { IccMenuPanelComponent } from '@icc/ui/menu';
import {
  DEFAULT_OVERLAY_SERVICE_CONFIG,
  IccDynamicOverlayService,
  IccOverlayServiceConfig,
  IccPosition,
  IccTrigger,
} from '@icc/ui/overlay';
import { IccPopoverComponent } from '@icc/ui/popover';
import { defaultContextMenu } from '@icc/ui/tabs';
import {
  CdkMenuItemRadio,
  CdkMenuItemCheckbox,
  CdkMenuGroup,
  CdkMenuTrigger,
  CdkMenuItem,
  CdkMenu,
  CdkMenuBar,
} from './menu';

/*
import {
  CdkMenuItemRadio,
  CdkMenuItemCheckbox,
  CdkMenuGroup,
  CdkMenu,
  CdkMenuTrigger,
  CdkMenuItem,
  CdkMenuBar,
}  from '@angular/cdk/menu';
*/

@Component({
  selector: 'app-menu-panel',
  templateUrl: './menu-panel.component.html',
  styleUrls: ['./menu-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    IccButtonComponent,
    IccIconModule,
    IccCheckboxComponent,
    CdkMenuItemRadio,
    CdkMenuItemCheckbox,
    CdkMenuGroup,
    CdkMenu,
    CdkMenuTrigger,
    CdkMenuItem,
    CdkMenuBar,
  ],
  providers: [IccDynamicOverlayService],
})
export class AppMenuPanelComponent {
  private dynamicOverlayService = inject(IccDynamicOverlayService);
  private elementRef = inject(ElementRef);

  isChecked = false;

  toggleCheck() {
    this.isChecked = !this.isChecked;
  }

  onMenuItemTriggered(event: any) {
    console.log(' kkkkkkkkkkkkkkkk options=', event);
    // Handle menu item logic here
    // The menu will stay open because keepOpen is true
  }

  openMenuPanel(event: MouseEvent): void {
    const overlayServiceConfig: IccOverlayServiceConfig = {
      ...DEFAULT_OVERLAY_SERVICE_CONFIG,
      trigger: IccTrigger.POINT,
      position: IccPosition.BOTTOM_END,
      clickToClose: true,
      event,
    };

    const popoverContext = {
      menuItems: defaultContextMenu,
    };

    this.dynamicOverlayService.build(
      IccPopoverComponent,
      this.elementRef,
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

  private hideMenu(): void {
    this.dynamicOverlayService.hide();
  }
}
