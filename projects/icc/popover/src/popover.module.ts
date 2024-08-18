import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IccPopoverDirective } from './popover.directive';
import { IccPopoverComponent } from './popover.component';
import { IccOverlayModule } from '@icc/ui/overlay';

@NgModule({
  declarations: [IccPopoverDirective, IccPopoverComponent],
  exports: [IccPopoverDirective, IccPopoverComponent],
  imports: [CommonModule, IccOverlayModule],
})
export class IccPopoverModule {}
