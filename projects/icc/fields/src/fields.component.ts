import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IccTextFieldComponent } from './text-field/text-field.component';
import { IccNumberFieldComponent } from './number-field/number-field.component';
import { IccTextareaFieldComponent } from './textarea-field/textarea-field.component';
import { IccSelectFieldComponent } from './select-field/select-field.component';
import { IccDisplayFieldComponent } from './display-field/display-field.component';
import { IccDateFieldComponent } from './date-field/date-field.component';
import { IccCheckboxFieldComponent } from './checkbox-field/checkbox-field.component';
import { IccHiddenFieldComponent } from './hidden-field/hidden-field.component';
import { IccFieldsetComponent } from './fieldset/fieldset.component';

import { IccFormField } from './models/fields.model';

@Component({
  selector: 'icc-fields',
  templateUrl: './fields.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IccTextFieldComponent,
    IccNumberFieldComponent,
    IccTextareaFieldComponent,
    IccSelectFieldComponent,
    IccDisplayFieldComponent,
    IccDateFieldComponent,
    IccCheckboxFieldComponent,
    IccHiddenFieldComponent,
    IccFieldsetComponent,
  ],
})
export class IccFieldsComponent {
  private _fieldConfig!: Partial<IccFormField>;

  @Input() form!: FormGroup;

  @Input()
  set fieldConfig(val: Partial<IccFormField>) {
    this._fieldConfig = { ...val };
  }
  get fieldConfig(): Partial<IccFormField> {
    return this._fieldConfig;
  }
}
