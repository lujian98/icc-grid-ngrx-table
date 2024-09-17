import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IccFormComponent, defaultFormConfig } from '@icc/ui/form';

@Component({
  selector: 'app-simple-form',
  //styles: [':host {width: 100%; height: 100%; display: flex; flex-direction: column;}'],
  template: ` <icc-form [formFields]="formFields" [values]="values"></icc-form> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IccFormComponent],
})
export class AppSimpleFromDemoComponent {
  formConfig = {
    ...defaultFormConfig,
  }; //[formConfig]="formConfig"
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
