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
}
