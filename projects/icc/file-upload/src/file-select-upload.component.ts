import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { IccButtonComponent } from '@icc/ui/button';
import { IccCheckboxComponent } from '@icc/ui/checkbox';
import { IccButtonConfg, IccButtonType } from '@icc/ui/core';
import { IccUploadFileFieldComponent, IccUploadFileFieldConfig } from '@icc/ui/fields';
import { IccIconModule } from '@icc/ui/icon';
import { IccPanelComponent, IccPanelTopBarComponent } from '@icc/ui/panel';
import { IccFileUploadStateModule } from './+state/file-upload-state.module';
import { IccFileUploadFacade } from './+state/file-upload.facade';
import { IccFileDropComponent } from './components/file-drop/file-drop.component';
import { IccFileUploadGridComponent } from './components/file-upload-grid/file-upload-grid.component';
import { IccFileUploadConfig, defaultFileUploadConfig, IccFileUpload } from './models/file-upload.model';

@Component({
  selector: 'icc-file-select-upload',
  templateUrl: './file-select-upload.component.html',
  styleUrls: ['./file-select-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    IccFileUploadStateModule,
    IccIconModule,
    IccPanelComponent,
    IccPanelTopBarComponent,
    IccButtonComponent,
    IccFileDropComponent,
    IccFileUploadGridComponent,
    IccCheckboxComponent,
    IccUploadFileFieldComponent,
  ],
})
export class IccFileSelectUploadComponent implements OnDestroy {
  private fileUploadFacade = inject(IccFileUploadFacade);
  uploadFiles$ = this.fileUploadFacade.selectUploadFiles$;
  private _fileUploadConfig!: IccFileUploadConfig;
  fieldConfigs: IccUploadFileFieldConfig[] = [];

  buttons: IccButtonConfg[] = [
    {
      name: IccButtonType.UploadFile,
      title: 'UploadFile',
      icon: 'pen-to-square',
    },
    {
      name: IccButtonType.Reset,
      title: 'Reset',
      icon: 'right-left',
    },
  ];

  checked = true;

  @Input()
  set fileUploadConfig(val: Partial<IccFileUploadConfig>) {
    this._fileUploadConfig = { ...defaultFileUploadConfig, ...val };
    if (this._fileUploadConfig.maxSelectUploads) {
      this.fieldConfigs = [];
      for (let i = 0; i < this._fileUploadConfig.maxSelectUploads; i++) {
        this.fieldConfigs.push({
          fieldType: 'uploadfile',
          labelWidth: 60,
          fieldName: `file_select_upload_${i + 1}`,
          fieldLabel: `File ${i + 1}`,
          editable: this.checked,
          clearValue: true,
        });
      }
    }
  }
  get fileUploadConfig(): IccFileUploadConfig {
    return this._fileUploadConfig;
  }

  @ViewChildren(IccUploadFileFieldComponent) private uploadFileFields!: QueryList<IccUploadFileFieldComponent>;

  selectUploadFile(fieldConfig: IccUploadFileFieldConfig, file: File): void {
    this.fileUploadFacade.selectUploadFile(fieldConfig.fieldName!, file);
  }

  onChange(checked: boolean): void {
    if (typeof checked === 'boolean') {
      this.checked = checked;
      this.fieldConfigs = [...this.fieldConfigs].map((config) => {
        return {
          ...config,
          editable: this.checked,
        };
      });
    }
  }

  buttonVisible(uploadFiles: IccFileUpload[]): boolean {
    if (uploadFiles.length === 0) {
      this.uploadFileFields?.toArray().forEach((field) => field.clearValue());
    }
    return uploadFiles.length === 0;
  }

  buttonClick(button: IccButtonConfg): void {
    switch (button.name) {
      case IccButtonType.Reset:
        this.fileUploadFacade.clearUploadFiles();
        //this.uploadFileFields.toArray().forEach((field) => field.clearValue());
        break;
      case IccButtonType.UploadFile:
        this.fileUploadFacade.uploadFiles(this.fileUploadConfig);
        break;
      default:
        break;
    }
  }

  ngOnDestroy(): void {
    this.fileUploadFacade.clearUploadFiles();
  }
}
