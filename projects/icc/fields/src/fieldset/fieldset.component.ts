import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IccObjectType } from '@icc/ui/core';
import { IccFieldsetLabelWidthDirective, IccFieldWidthDirective } from '@icc/ui/form-field';
import { TranslatePipe } from '@ngx-translate/core';
import { IccFieldsComponent } from '../fields.component';
import { IccFormField } from '../models/fields.model';
import { defaultFieldsetConfig, IccFieldsetConfig } from './models/fieldset.model';

@Component({
  selector: 'icc-fieldset',
  templateUrl: './fieldset.component.html',
  styleUrls: ['./fieldset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    TranslatePipe,
    IccFieldsComponent,
    IccFieldsetLabelWidthDirective,
    IccFieldWidthDirective,
  ],
})
export class IccFieldsetComponent {
  FieldType = IccObjectType;
  form = input.required<FormGroup>();
  fieldConfig = input.required({
    transform: (fieldConfig: Partial<IccFieldsetConfig>) => {
      const formConfig = { ...defaultFieldsetConfig, ...fieldConfig };
      return formConfig;
    },
  });

  get formFields(): IccFormField[] {
    return this.fieldConfig().formFields;
  }
}
