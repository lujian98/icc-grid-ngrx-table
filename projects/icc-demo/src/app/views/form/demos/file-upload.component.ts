import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IccFormComponent, defaultFormConfig, IccFormButtonType } from '@icc/ui/form';
import { IccFormField, IccFieldsetConfig } from '@icc/ui/fields';
import { IccSelectFieldConfig, IccSelectFieldComponent, IccUploadFileFieldComponent } from '@icc/ui/fields';
import { IccPanelComponent, IccPanelTopBarComponent } from '@icc/ui/panel';
import { IccButtonComponent } from '@icc/ui/button';
import { IccIconModule } from '@icc/ui/icon';

import { IccFormButtonConfg } from '@icc/ui/fields';

export const buttons: IccFormButtonConfg[] = [
  {
    name: IccFormButtonType.Edit,
    title: 'Edit',
    icon: 'pen-to-square',
  },
  {
    name: IccFormButtonType.UploadFile,
    title: 'UploadFile',
    icon: 'pen-to-square',
  },
  {
    name: IccFormButtonType.Reset,
    title: 'Reset',
    icon: 'right-left',
  },
];

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    IccFormComponent,
    IccUploadFileFieldComponent,
    IccPanelComponent,
    IccPanelTopBarComponent,
    IccButtonComponent,
    IccIconModule,
  ],
})
export class AppFileUploadDemoComponent {
  formConfig = {
    ...defaultFormConfig,
    title: 'Upload File',
    labelWidth: 100,
    urlKey: 'DCR',
    buttons: buttons,
    editable: false,
  };

  fieldConfig = {
    fieldName: 'fileUpload',
    fieldLabel: 'Upload File1',
    editable: true,
  };

  formFields: IccFormField[] = [
    {
      fieldType: 'uploadfile',
      fieldName: 'testuploadfile',
      fieldLabel: 'Upload File',
      editable: true,
    },
  ];

  values = {
    uploadfile: '',
  };
}
