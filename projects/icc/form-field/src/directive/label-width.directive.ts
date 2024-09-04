import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'form[iccLabelWidth], fieldset[iccLabelWidth], icc-form-field[iccLabelWidth]',
})
export class IccLabelWidthDirective {
  @Input('iccLabelWidth') width!: number;
}
