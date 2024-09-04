import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IccLabelDirective } from './directive/label.directive';
import { IccLabelWidthDirective } from './directive/label-width.directive';
import { IccFormFieldComponent, IccUnpadFormFieldDirective } from './form-field.component';
import { IccHintDirective } from './directive/hint.directive';
import { IccErrorDirective } from './directive/error.directive';
import { IccSuffix } from './directive/suffix';

const EXPORTED_DECLARATIONS = [
  IccErrorDirective,
  IccHintDirective,
  IccLabelDirective,
  IccLabelWidthDirective,
  IccFormFieldComponent,
  IccUnpadFormFieldDirective,
  IccSuffix,
];

@NgModule({
  imports: [CommonModule],
  declarations: EXPORTED_DECLARATIONS,
  exports: EXPORTED_DECLARATIONS,
})
export class IccFormFieldModule {}
