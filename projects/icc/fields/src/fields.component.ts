import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IccObjectType } from '@icc/ui/core';
import { IccCheckboxFieldComponent } from './checkbox-field/checkbox-field.component';
import { IccDateFieldComponent } from './date-field/date-field.component';
import { IccDateRangeFieldComponent } from './date-range-field/date-range-field.component';
import { IccDisplayFieldComponent } from './display-field/display-field.component';
import { IccHiddenFieldComponent } from './hidden-field/hidden-field.component';
import { IccFormField } from './models/fields.model';
import { IccNumberFieldComponent } from './number-field/number-field.component';
import { IccPasswordFieldComponent } from './password-field/password-field.component';
import { IccRadioGroupFieldComponent } from './radio-group-field/radio-group-field.component';
import { IccSelectFieldComponent } from './select-field/select-field.component';
import { IccTextFieldComponent } from './text-field/text-field.component';
import { IccTextareaFieldComponent } from './textarea-field/textarea-field.component';
import { IccUploadFileFieldComponent } from './upload-file-field/upload-file-field.component';

@Component({
  selector: 'icc-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    IccTextFieldComponent,
    IccNumberFieldComponent,
    IccPasswordFieldComponent,
    IccTextareaFieldComponent,
    IccSelectFieldComponent,
    IccDisplayFieldComponent,
    IccDateFieldComponent,
    IccDateRangeFieldComponent,
    IccCheckboxFieldComponent,
    IccRadioGroupFieldComponent,
    IccHiddenFieldComponent,
    IccUploadFileFieldComponent,
  ],
})
export class IccFieldsComponent {
  FieldType = IccObjectType;
  form = input.required<FormGroup>();
  fieldConfig = input.required<Partial<IccFormField>>();
}
