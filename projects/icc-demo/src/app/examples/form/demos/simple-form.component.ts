import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IccFormPanelComponent, defaultFormPanelConfig } from '@icc/ui/form-panel';

@Component({
  selector: 'app-simple-form',
  //styles: [':host {width: 100%; height: 100%; display: flex; flex-direction: column;}'],
  template: `
    <icc-form-panel [formPanelConfig]="formPanelConfig" [formFields]="formFields" [values]="values"></icc-form-panel>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IccFormPanelComponent],
})
export class AppSimpleFromDemoComponent {
  formPanelConfig = {
    ...defaultFormPanelConfig,
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
