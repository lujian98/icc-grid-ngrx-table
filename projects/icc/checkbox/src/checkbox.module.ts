import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GhostCheckboxDirective, IccCheckboxComponent } from './checkbox.component';
import { IccIconModule } from '@icc/ui/icon';

@NgModule({
  imports: [CommonModule, IccIconModule],
  declarations: [IccCheckboxComponent, GhostCheckboxDirective],
  exports: [IccCheckboxComponent, GhostCheckboxDirective],
})
export class IccCheckboxModule {}
