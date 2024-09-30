import { Directive, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
  selector: 'icc-form-field[iccFieldControl] ', // tslint:disable-line: directive-selector
  standalone: true,
})
export class IccFieldControlDirective {
  @Input('iccFieldControl') fieldControl!: FormControl;
}
