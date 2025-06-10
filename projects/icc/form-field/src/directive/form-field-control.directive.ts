import { Directive, input } from '@angular/core';
import { FormControl } from '@angular/forms';

//TODO not used
@Directive({
  selector: 'icc-form-field[iccFormFieldControl] ',
})
export class IccFormFieldControlDirective {
  fieldControl = input<FormControl>(undefined, { alias: 'iccFormFieldControl' });
}
