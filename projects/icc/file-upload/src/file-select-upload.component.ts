import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  OnDestroy,
  QueryList,
  signal,
  ViewChildren,
} from '@angular/core';
import { IccCheckboxComponent } from '@icc/ui/checkbox';
import { IccButtonConfg, IccBUTTONS, IccButtonType, IccObjectType } from '@icc/ui/core';
import { IccUploadFileFieldComponent, IccUploadFileFieldConfig } from '@icc/ui/fields';
import { IccIconModule } from '@icc/ui/icon';
import { IccLayoutComponent, IccLayoutHeaderComponent } from '@icc/ui/layout';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { IccFileUploadStateModule } from './+state/file-upload-state.module';
import { IccFileUploadFacade } from './+state/file-upload.facade';
import { IccFileUploadGridComponent } from './components/file-upload-grid/file-upload-grid.component';
import { defaultFileUploadConfig, IccFileUploadConfig } from './models/file-upload.model';

@Component({
  selector: 'icc-file-select-upload',
  templateUrl: './file-select-upload.component.html',
  styleUrls: ['./file-select-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TranslatePipe,
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
  private readonly fileUploadFacade = inject(IccFileUploadFacade);
  private readonly translateService = inject(TranslateService);
  private buttons: IccButtonConfg[] = [IccBUTTONS.UploadFile, IccBUTTONS.Reset];
  uploadFiles$ = this.fileUploadFacade.getUploadFiles$;
  enabled = signal<boolean>(true);
  fileUploadConfig = input(defaultFileUploadConfig, {
    transform: (val: Partial<IccFileUploadConfig>) => ({ ...defaultFileUploadConfig, ...val }),
  });

  fieldConfigs = computed(() => {
    const fieldConfigs = [];
    if (this.fileUploadConfig().maxSelectUploads) {
      const fileI18n = this.translateService.instant('ICC.UI.FILE.FILE');
      for (let i = 0; i < this.fileUploadConfig().maxSelectUploads; i++) {
        fieldConfigs.push({
          fieldType: IccObjectType.UploadFile,
          labelWidth: 60,
          fieldName: `file_select_upload_${i + 1}`,
          fieldLabel: `${fileI18n} ${i + 1}`,
          editable: this.enabled(),
          clearValue: true,
        });
      }
    }
    return fieldConfigs;
  });

  buttons$ = computed(() => {
    const disabled = this.uploadFiles$().length === 0 ? true : false;
    return [...this.buttons].map((button) => {
      return {
        ...button,
        disabled: disabled,
      };
    });
  });

  @ViewChildren(IccUploadFileFieldComponent) private uploadFileFields!: QueryList<IccUploadFileFieldComponent>;

  selectUploadFile(fieldConfig: IccUploadFileFieldConfig, file: File | null): void {
    this.fileUploadFacade.selectUploadFile(fieldConfig.fieldName!, file);
  }

  onChange(enabled: boolean): void {
    if (typeof enabled === 'boolean') {
      this.enabled.set(enabled);
    }
  }

  private clearUploadFileFields(): void {
    this.uploadFileFields?.toArray().forEach((field) => field.clearValue());
  }

  buttonClick(button: IccButtonConfg): void {
    switch (button.name) {
      case IccButtonType.Reset:
        this.fileUploadFacade.clearUploadFiles();
        this.clearUploadFileFields();
        break;
      case IccButtonType.UploadFile:
        this.fileUploadFacade.uploadFiles(this.fileUploadConfig());
        break;
      default:
        break;
    }
  }

  ngOnDestroy(): void {
    this.fileUploadFacade.clearUploadFiles();
  }
}
