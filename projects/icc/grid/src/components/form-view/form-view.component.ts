import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IccObjectType } from '@icc/ui/core';
import { IccFormField } from '@icc/ui/fields';
import { IccFormComponent } from '@icc/ui/form';
import { IccLayoutComponent } from '@icc/ui/layout';
import { IccDialogRef } from '@icc/ui/overlay';
import { IccWindowComponent, IccWindowConfig, defaultWindowConfig } from '@icc/ui/window';

@Component({
  selector: 'icc-grid-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IccLayoutComponent, IccWindowComponent, IccFormComponent],
})
export class IccGridFormViewComponent {
  private readonly dialogRef = inject(IccDialogRef<IccGridFormViewComponent>);

  windowConfig: IccWindowConfig = {
    ...defaultWindowConfig,
    title: 'Window',
    height: '480px',
    //resizeable: false,
    //dragDisabled: true,
  };

  dialog: any;

  close(): void {
    this.dialogRef.close('test uujj make');
  }

  formConfig = {
    labelWidth: 100,
  };

  formFields: IccFormField[] = [
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
      fieldType: IccObjectType.UploadFile,
      fieldName: 'uploadfile',
      fieldLabel: 'Upload File',
      readonly: true,
    },
    {
      fieldType: IccObjectType.RadioGroup,
      fieldName: 'group83',
      fieldLabel: 'Radio Group',
      //readonly: true,
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

  fieldSet: IccFormField[] = [
    {
      fieldType: 'fieldset',
      fieldName: 'fieldset',
      legend: 'Readonly field Demo',
      formFields: this.formFields,
    },
  ];

  values = {
    enabled: true,
    userName: 'user 77 2222',
    loginName: 'test login88',
    email: 'test@email.com',
    password: '',
    age: 18,
    state: { abbr: 'NY', country: 'USA', state: 'New York', description: 'Empire State' },
    createdate: new Date(new Date().setHours(0, 0, 0, 0)),
    notes: 'This is a notes. ',
    group83: 'B',
    uploadfile: '',
  };
}
