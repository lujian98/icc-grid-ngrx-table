import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { IccErrorDirective } from '@icc/ui/form-field';
import { IccIconModule } from '@icc/ui/icon';
import { TranslateModule } from '@ngx-translate/core';
import { IccFormFieldError } from './models/field-errors.model';

@Component({
  selector: 'icc-field-errors',
  templateUrl: './field-errors.component.html',
  styleUrls: ['./field-errors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TranslateModule, IccIconModule, IccErrorDirective],
})
export class IccFieldsErrorsComponent {
  private _errors!: IccFormFieldError[];

  @Input()
  set errors(errors: ValidationErrors) {
    //console.log(' errors=', errors);
    this._errors = Object.keys(errors).map((key) => ({ type: key, ...errors[key] }));
    //console.log(' mmm=', this._errors);
  }
  get errors(): IccFormFieldError[] {
    return this._errors;
  }

  trackByIndex(index: number): number {
    return index;
  }
}
