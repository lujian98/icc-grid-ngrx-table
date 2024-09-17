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
    remoteValues: true,
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

  values = {
    userName: 'user 77 2222',
    loginName: 'test login88',
  };
}
