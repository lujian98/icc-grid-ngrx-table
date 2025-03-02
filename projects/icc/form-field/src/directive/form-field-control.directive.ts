import { Directive, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
  selector: 'icc-form-field[iccFormFieldControl] ',
})
export class IccFormFieldControlDirective {
  @Input('iccFormFieldControl') fieldControl!: FormControl;
}
