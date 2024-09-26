import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IccFormComponent, defaultFormConfig } from '@icc/ui/form';
import { IccFormField, IccFieldsetConfig } from '@icc/ui/fields';
import { IccSelectFieldConfig, IccSelectFieldComponent, defaultSelectFieldConfig } from '@icc/ui/fields';
import { State, STATES } from '../../../data/states';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IccFormComponent],
})
export class AppFromPageDemoComponent {
  formConfig = {
    labelWidth: 100,
  };

  formFields2: IccFormField[] = [
    {
      fieldType: 'text',
      fieldName: 'userName2',
      fieldLabel: 'User Name2',
    },
    {
      fieldType: 'text',
      fieldName: 'loginName2',
      fieldLabel: 'Login Name2',
    },
  ];

  formFields = [
    {
      fieldType: 'text',
      fieldName: 'userName',
      fieldLabel: 'User Name',
      clearValue: true,
    },
    {
      fieldType: 'text',
      fieldName: 'loginName',
      fieldLabel: 'Login Name',
    },
    {
      fieldType: 'fieldset',
      flexDirection: 'row',
      formFields: this.formFields2,
    },
  ];

  fieldSet: IccFormField[] = [
    {
      fieldType: 'fieldset',
      fieldName: 'test',
      legend: 'Local form config, fields and values',
      //flexDirection: 'row',
      formFields: this.formFields,
    },
    {
      fieldType: 'number',
      fieldName: 'age',
      fieldLabel: 'Age',
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
      clearValue: false,
    },
    {
      fieldType: 'display',
      fieldName: 'display',
      fieldLabel: 'display',
    },
    {
      fieldType: 'date',
      fieldName: 'createdate',
      fieldLabel: 'Create Date',
    },
    {
      fieldType: 'hidden',
      fieldName: 'totalValue',
    },
    {
      fieldType: 'checkbox',
      fieldName: 'enabled',
      fieldLabel: 'Enabled',
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
  ];

  values = {
    userName: 'user 77 2222',
    loginName: 'test login88',
    email: 'test@email.com',
    age: 18,
    notes: 'This is a notes. ',
    state: [STATES[32]],
    display: 'display only',
    createdate: new Date(),
    enabled: false,
    totalValue: 123892,
    userName2: 'user 77 A33',
    loginName2: 'test login A33',
  };
}
