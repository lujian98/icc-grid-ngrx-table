import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IccPopoverModule, IccPortalModule } from '@icc/ui/tooltip';

import { IccDrawServie } from './service';
import { IccD3Component } from './d3.component';
import { IccD3PopoverComponent } from './popover/popover.component';
import { IccD3LegendComponent } from './legend/legend.component';

@NgModule({
  imports: [CommonModule, IccPopoverModule, IccPortalModule, IccD3LegendComponent],
  declarations: [IccD3Component, IccD3PopoverComponent],
  exports: [IccD3Component, IccD3PopoverComponent],
  providers: [IccDrawServie],
})
export class IccD3Module {}
