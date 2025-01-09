import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { IccCheckboxComponent } from '@icc/ui/checkbox';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { IccButtonConfg, IccButtonType, IccBUTTONS } from '@icc/ui/core';
import { map } from 'rxjs';
import { IccUploadFileFieldComponent, IccUploadFileFieldConfig } from '@icc/ui/fields';
import { IccIconModule } from '@icc/ui/icon';
import { IccFileUploadStateModule } from './+state/file-upload-state.module';
import { IccFileUploadFacade } from './+state/file-upload.facade';
import { IccFileUploadGridComponent } from './components/file-upload-grid/file-upload-grid.component';
import { IccFileUploadConfig, defaultFileUploadConfig, IccFileUpload } from './models/file-upload.model';
import { IccLayoutComponent, IccLayoutHeaderComponent } from '@icc/ui/layout';

@Component({
  selector: 'icc-file-select-upload',
  templateUrl: './file-select-upload.component.html',
  styleUrls: ['./file-select-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TranslateModule,
    IccFileUploadStateModule,
    IccIconModule,
    IccLayoutComponent,
    IccLayoutHeaderComponent,
    IccFileUploadGridComponent,
    IccCheckboxComponent,
    IccUploadFileFieldComponent,
  ],
})
export class IccFileSelectUploadComponent implements OnDestroy {
  private fileUploadFacade = inject(IccFileUploadFacade);
  private translateService = inject(TranslateService);
  private uploadFiles: IccFileUpload[] = [];

  uploadFiles$ = this.fileUploadFacade.selectUploadFiles$.pipe(
    map((uploadFiles) => {
      this.uploadFiles = uploadFiles;
      this.setButtonDisabled();
      return uploadFiles;
    }),
  );
  private _fileUploadConfig!: IccFileUploadConfig;
  fieldConfigs: IccUploadFileFieldConfig[] = [];

  buttons: IccButtonConfg[] = [IccBUTTONS.UploadFile, IccBUTTONS.Reset];

  checked = true;

  @Input()
  set fileUploadConfig(val: Partial<IccFileUploadConfig>) {
    this._fileUploadConfig = { ...defaultFileUploadConfig, ...val };
    if (this._fileUploadConfig.maxSelectUploads) {
      const fileI18n = this.translateService.instant('ICC.UI.FILE.FILE');
      this.fieldConfigs = [];
      for (let i = 0; i < this._fileUploadConfig.maxSelectUploads; i++) {
        this.fieldConfigs.push({
          fieldType: 'uploadfile',
          labelWidth: 60,
          fieldName: `file_select_upload_${i + 1}`,
          fieldLabel: `${fileI18n} ${i + 1}`,
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
      this.setButtonDisabled(!this.checked);
      this.fieldConfigs = [...this.fieldConfigs].map((config) => {
        return {
          ...config,
          editable: this.checked,
        };
      });
    }
  }

  private clearUploadFileFields(): void {
    this.uploadFileFields?.toArray().forEach((field) => field.clearValue());
  }

  private setButtonDisabled(disabled: boolean = false): void {
    disabled = this.uploadFiles.length === 0 ? true : disabled;
    this.buttons = [...this.buttons].map((button) => {
      return {
        ...button,
        disabled: disabled,
      };
    });
  }

  buttonClick(button: IccButtonConfg): void {
    switch (button.name) {
      case IccButtonType.Reset:
        this.fileUploadFacade.clearUploadFiles();
        this.clearUploadFileFields();
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
