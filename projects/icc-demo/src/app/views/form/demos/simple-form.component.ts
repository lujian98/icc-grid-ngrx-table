import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IccFormComponent, defaultFormConfig } from '@icc/ui/form';

@Component({
  selector: 'app-simple-form',
  templateUrl: './simple-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IccFormComponent],
})
export class AppSimpleFromDemoComponent {
  formConfig = {
    ...defaultFormConfig,
  };

  remoteFormFields = {
    ...defaultFormConfig,
    urlKey: 'DCR',
    remoteFieldsConfig: true,
  };

  remoteFormFieldsAndValues = {
    ...defaultFormConfig,
    urlKey: 'DCR',
    remoteFieldsConfig: true,
    remoteFormData: true,
  };

  allRemotes = {
    ...defaultFormConfig,
    urlKey: 'DCR',
    remoteFormConfig: true,
  };

  formFields = [
    {
      fieldType: 'text',
      fieldName: 'userName',
      fieldLabel: 'User Name',
    },
    {
      fieldType: 'text',
      fieldName: 'loginName',
      fieldLabel: 'Login Name',
    },
  ];

  fieldSet1 = [
    {
      fieldType: 'fieldset',
      legend: 'Test field set 1234',
      formFields: this.formFields,
    },
    {
      fieldType: 'text',
      fieldName: 'email',
      fieldLabel: 'Email Address',
    },
  ];
  values = {
    userName: 'user 77 2222',
    loginName: 'test login88',
    email: 'test@email.com',
  };
}
