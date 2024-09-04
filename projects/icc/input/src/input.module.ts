import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IccInputDirective } from './input.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [IccInputDirective],
  exports: [IccInputDirective],
})
export class IccInputModule {}
