import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IccOptionComponent } from './option.component';

@NgModule({
  declarations: [IccOptionComponent],
  exports: [IccOptionComponent],
  imports: [CommonModule],
})
export class IccOptionModule {}
