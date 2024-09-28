import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isEqual, confirmationValidator } from '@icc/ui/core';
import { IccFormComponent, defaultFormConfig } from '@icc/ui/form';
import { IccFormField, IccFieldsetConfig } from '@icc/ui/fields';
import { IccSelectFieldConfig, IccSelectFieldComponent, defaultSelectFieldConfig } from '@icc/ui/fields';
import { State, STATES } from '../../../data/states';

@Component({
  selector: 'app-password-page',
  templateUrl: './password-page.component.html',
  styleUrls: ['./password-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IccFormComponent],
})
export class AppPasswordPageDemoComponent {
  formConfig = {
    labelWidth: 150,
    validators: [confirmationValidator('userPassword', 'userPasswordConfirmation')],
  };

  formFields = [
    {
      fieldType: 'password',
      fieldName: 'userPassword',
      fieldLabel: 'User Password',
      //readonly: true,
      required: true,
      minLength: 4,
      maxLength: 20,
    },
    {
      fieldType: 'password',
      fieldName: 'userPasswordConfirmation',
      fieldLabel: 'User Password Confirmation',
      //readonly: true,
      required: true,
      minLength: 4,
      maxLength: 20,
    },
  ];

  fieldSet: IccFormField[] = [
    {
      fieldType: 'fieldset',
      legend: 'Password Demo',
      formFields: this.formFields,
    },
  ];

  values = {
    userPassword: '',
    userPasswordConfirmation: '',
  };

  formConfig2 = {
    labelWidth: 100,
  };

  formFields2: IccFormField[] = [
    {
      fieldType: 'checkbox',
      fieldName: 'enabled',
      fieldLabel: 'Enabled',
      required: true,
      requiredFields: [
        'userName',
        'loginName',
        'password',
        'email',
        'age',
        'state',
        'notes',
        'createdate',
        'uploadfile',
        'group88',
      ],
    },
    {
      fieldType: 'text',
      fieldName: 'userName',
      fieldLabel: 'User Name',
      //required: true,
      minLength: 4,
      maxLength: 20,
      clearValue: true,
    },
    {
      fieldType: 'text',
      fieldName: 'loginName',
      fieldLabel: 'Login Name',
      //required: true,
    },
    {
      fieldType: 'number',
      fieldName: 'age',
      fieldLabel: 'Age',
      //required: true,
      minValue: 0,
      maxValue: 100,
      clearValue: true,
    },
    {
      fieldType: 'password',
      fieldName: 'password',
      fieldLabel: 'User Password',
      //required: true,
      minLength: 4,
      maxLength: 20,
    },
    {
      fieldType: 'text',
      fieldName: 'email',
      fieldLabel: 'Email Address',
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
      placeholder: 'Select One or More...',
    },
    {
      fieldType: 'textarea',
      fieldName: 'notes',
      fieldLabel: 'Notes',
      //required: true,
      minLength: 4,
      maxLength: 20,
      clearValue: true,
    },
    {
      fieldType: 'date',
      fieldName: 'createdate',
      fieldLabel: 'Create Date',
      //required: true,
    },
    {
      fieldType: 'uploadfile',
      fieldName: 'uploadfile',
      fieldLabel: 'Upload File',
      //required: true,
    },
    {
      fieldType: 'radiogroup',
      fieldName: 'group88',
      fieldLabel: 'Radio Group',
      //required: true,
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
  ];

  fieldSet2: IccFormField[] = [
    {
      fieldType: 'fieldset',
      legend: 'Checkbox enable required Demo',
      formFields: this.formFields2,
    },
  ];

  values2 = {
    enabled: true,
    userName: 'user 77 2222',
    loginName: 'test login88',
    email: 'test@email.com',
    password: '',
    age: 18,
    state: STATES[32],
    createdate: new Date(new Date().setHours(0, 0, 0, 0)),
    notes: 'This is a notes. ',
    group88: 'B',
    uploadfile: '',
  };

  formFields3: IccFormField[] = [
    {
      fieldType: 'checkbox',
      fieldName: 'enabled',
      fieldLabel: 'Enabled',
      readonly: true,
      required: true,
    },
    {
      fieldType: 'text',
      fieldName: 'userName',
      fieldLabel: 'User Name',
      readonly: true,
      required: true,
      minLength: 4,
      maxLength: 20,
      clearValue: true,
    },
    {
      fieldType: 'text',
      fieldName: 'loginName',
      fieldLabel: 'Login Name',
      readonly: true,
    },
    {
      fieldType: 'number',
      fieldName: 'age',
      fieldLabel: 'Age',
      readonly: true,
      minValue: 0,
      maxValue: 100,
      clearValue: true,
    },
    {
      fieldType: 'password',
      fieldName: 'password',
      fieldLabel: 'User Password',
      readonly: true,
      minLength: 4,
      maxLength: 20,
    },
    {
      fieldType: 'text',
      fieldName: 'email',
      fieldLabel: 'Email Address',
      readonly: true,
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
      readonly: true,
      placeholder: 'Select One or More...',
    },
    {
      fieldType: 'textarea',
      fieldName: 'notes',
      fieldLabel: 'Notes',
      readonly: true,
      clearValue: true,
    },
    {
      fieldType: 'date',
      fieldName: 'createdate',
      fieldLabel: 'Create Date',
      readonly: true,
    },
    {
      fieldType: 'uploadfile',
      fieldName: 'uploadfile',
      fieldLabel: 'Upload File',
      readonly: true,
    },
    {
      fieldType: 'radiogroup',
      fieldName: 'group88',
      fieldLabel: 'Radio Group',
      readonly: true,
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
  ];

  fieldSet3: IccFormField[] = [
    {
      fieldType: 'fieldset',
      legend: 'Readonly field Demo',
      formFields: this.formFields3,
    },
  ];

  values3 = {
    enabled: true,
    userName: 'user 77 2222',
    loginName: 'test login88',
    email: 'test@email.com',
    password: '',
    age: 18,
    state: STATES[32],
    createdate: new Date(new Date().setHours(0, 0, 0, 0)),
    notes: 'This is a notes. ',
    group88: 'B',
    uploadfile: '',
  };

  formFields4: IccFormField[] = [
    {
      fieldType: 'checkbox',
      fieldName: 'enabled',
      fieldLabel: 'Enabled',
      //required: true,
      readonlyFields: [
        'userName',
        'loginName',
        'password',
        'email',
        'age',
        'state',
        'notes',
        'createdate',
        'uploadfile',
        'group88',
      ],
    },
    {
      fieldType: 'text',
      fieldName: 'userName',
      fieldLabel: 'User Name',
      required: true,
      minLength: 4,
      maxLength: 20,
      clearValue: true,
    },
    {
      fieldType: 'text',
      fieldName: 'loginName',
      fieldLabel: 'Login Name',
      required: true,
    },
    {
      fieldType: 'number',
      fieldName: 'age',
      fieldLabel: 'Age',
      //required: true,
      minValue: 0,
      maxValue: 100,
      clearValue: true,
    },
    {
      fieldType: 'password',
      fieldName: 'password',
      fieldLabel: 'User Password',
      //required: true,
      minLength: 4,
      maxLength: 20,
    },
    {
      fieldType: 'text',
      fieldName: 'email',
      fieldLabel: 'Email Address',
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
      placeholder: 'Select One or More...',
    },
    {
      fieldType: 'textarea',
      fieldName: 'notes',
      fieldLabel: 'Notes',
      //required: true,
      minLength: 4,
      maxLength: 20,
      clearValue: true,
    },
    {
      fieldType: 'date',
      fieldName: 'createdate',
      fieldLabel: 'Create Date',
      //required: true,
    },
    {
      fieldType: 'uploadfile',
      fieldName: 'uploadfile',
      fieldLabel: 'Upload File',
      //required: true,
    },
    {
      fieldType: 'radiogroup',
      fieldName: 'group88',
      fieldLabel: 'Radio Group',
      //required: true,
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
  ];

  fieldSet4: IccFormField[] = [
    {
      fieldType: 'fieldset',
      legend: 'Checkbox enable edit/readonly Demo',
      formFields: this.formFields4,
    },
  ];

  values4 = {
    enabled: true,
    userName: 'user 77 2222',
    loginName: 'test login88',
    email: 'test@email.com',
    password: '',
    age: 18,
    state: STATES[32],
    createdate: new Date(new Date().setHours(0, 0, 0, 0)),
    notes: 'This is a notes. ',
    group88: 'B',
    uploadfile: '',
  };
}
