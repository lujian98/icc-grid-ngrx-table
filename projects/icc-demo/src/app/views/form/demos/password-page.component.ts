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
      required: true,
      minLength: 4,
      maxLength: 20,
    },
    {
      fieldType: 'password',
      fieldName: 'userPasswordConfirmation',
      fieldLabel: 'User Password Confirmation',
      required: true,
      minLength: 4,
      maxLength: 20,
    },
  ];

  values = {
    userPassword: '',
    userPasswordConfirmation: '',
  };

  formConfig2 = {
    labelWidth: 120,
  };

  formFields2: IccFormField[] = [
    {
      fieldType: 'checkbox',
      fieldName: 'enabled',
      fieldLabel: 'Enabled',
      required: true,
      requiredFields: ['userName', 'loginName', 'password', 'email', 'age'],
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
  ];

  values2 = {
    enabled: false,
    userName: 'user 77 2222',
    loginName: 'test login88',
    email: 'test@email.com',
    password: '',
    age: 18,
    createdate: new Date(new Date().setHours(0, 0, 0, 0)),
    notes: 'This is a notes. ',
  };
}
