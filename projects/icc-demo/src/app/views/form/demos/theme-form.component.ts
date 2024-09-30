import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IccFormComponent, defaultFormConfig } from '@icc/ui/form';
import { IccCheckboxComponent } from '@icc/ui/checkbox';
import { IccCalendarModule, IccLocaleDatePipe } from '@icc/ui/calendar';
import { IccFormFieldComponent, IccLabelDirective, IccSuffixDirective } from '@icc/ui/form-field';
import { IccFormField, IccFieldsetConfig } from '@icc/ui/fields';
import {
  IccNumberFieldComponent,
  defaultNumberFieldConfig,
  IccDisplayFieldComponent,
  IccCheckboxFieldComponent,
  IccHiddenFieldComponent,
  IccDateFieldComponent,
  IccDisplayFieldConfig,
  defaultDisplayFieldConfig,
  IccTextFieldComponent,
  IccSelectFieldComponent,
  IccTextareaFieldComponent,
} from '@icc/ui/fields';
import { State, STATES } from '../../../data/states';

@Component({
  selector: 'app-theme-form',
  templateUrl: './theme-form.component.html',
  styleUrls: ['./theme-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    IccFormComponent,
    ReactiveFormsModule,
    IccNumberFieldComponent,
    IccCheckboxFieldComponent,
    IccDateFieldComponent,
    IccDisplayFieldComponent,
    IccHiddenFieldComponent,
    IccCheckboxComponent,
    IccCalendarModule,
    IccSelectFieldComponent,
    IccLocaleDatePipe,
    IccFormFieldComponent,
    IccLabelDirective,
    IccSuffixDirective,
    IccTextFieldComponent,
    IccTextareaFieldComponent,
  ],
})
export class AppThemeFormDemoComponent {
  formConfig = {
    labelWidth: 100,
  };

  fieldSet: IccFormField[] = [
    {
      fieldType: 'radiogroup',
      fieldName: 'group1',
      fieldLabel: 'Radio Group',
      required: true,
      groups: [
        {
          title: 'Group A',
          name: 'A',
        },
        {
          title: 'Group B',
          name: 'B',
        },
        {
          title: 'Group C',
          name: 'C',
        },
      ],
    },
    /*



        {
      fieldType: 'date',
      fieldName: 'createdate',
      fieldLabel: 'Create Date',
      required: true,
    },

        {
      fieldType: 'checkbox',
      fieldName: 'enabled',
      fieldLabel: 'Enabled',
      required: true,
    },
    {
      fieldType: 'select',
      remoteOptions: true,
      urlKey: 'usa',
      fieldName: 'state',
      multiSelection: false,
      fieldLabel: 'State',
      optionLabel: 'state',
      optionKey: 'abbr',
      required: true,
      placeholder: 'Select One or More...',
    },
    {
      fieldType: 'radiogroup',
      fieldName: 'group1',
      fieldLabel: 'Radio Group',
      required: true,
      groups: [
        {
          title: 'Group A',
          name: 'A',
        },
        {
          title: 'Group B',
          name: 'B',
        },
        {
          title: 'Group C',
          name: 'C',
        },
      ],
    },
    {
      fieldType: 'uploadfile',
      fieldName: 'uploadfile',
      fieldLabel: 'Upload File',
      required: true,
    },
    {
      fieldType: 'password',
      fieldName: 'userPassword',
      fieldLabel: 'Password',
      required: true,
      minLength: 4,
      maxLength: 20,
    },
    */
  ];

  values = {
    userName: 'user 77 2222',
    loginName: 'test login88',
    email: 'test@email.com',
    age: 18,
    notes: 'This is a notes. ',
    state: STATES[32],
    display: 'display only',
    createdate: new Date(new Date().setHours(0, 0, 0, 0)),
    enabled: true,
    totalValue: 123892,
    userName2: 'user 77 A33',
    loginName2: 'test login A33',
    group1: 'B',
    uploadfile: '',
    userPassword: '',
  };
}
