import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { IccPopoverDirective2 } from './popover.directive';

@NgModule({
  imports: [CommonModule, OverlayModule, PortalModule],
  declarations: [IccPopoverDirective2],
  exports: [IccPopoverDirective2],
  providers: [],
})
export class IccPopoverModule {}
