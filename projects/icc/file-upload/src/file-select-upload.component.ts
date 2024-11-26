import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, OnDestroy, ViewChildren, QueryList } from '@angular/core';
import { IccButtonComponent } from '@icc/ui/button';
import { IccCheckboxComponent } from '@icc/ui/checkbox';
import { IccButtonConfg, IccButtonType } from '@icc/ui/core';
import { IccIconModule } from '@icc/ui/icon';
import { IccPanelComponent, IccPanelTopBarComponent } from '@icc/ui/panel';
import { IccFileUploadStateModule } from './+state/file-upload-state.module';
import { IccFileUploadFacade } from './+state/file-upload.facade';
import { IccUploadFileFieldComponent, IccUploadFileFieldConfig } from '@icc/ui/fields';
import { IccFileDropGridComponent } from './components/file-drop-grid/file-drop-grid.component';
import { IccFileDropEntry } from './components/file-drop/file-drop-entry';
import { IccFileDropComponent } from './components/file-drop/file-drop.component';
import { IccFileUpload } from './models/file-upload.model';

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
    IccFileDropGridComponent,
    IccCheckboxComponent,
    IccUploadFileFieldComponent,
  ],
})
export class IccFileSelectUploadComponent implements OnDestroy {
  private fileUploadFacade = inject(IccFileUploadFacade);
  uploadFiles$ = this.fileUploadFacade.selectUploadFiles$;
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
  set uploadNumber(val: number) {
    if (val) {
      this.fieldConfigs = [];
      for (let i = 0; i < val; i++) {
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

  @ViewChildren(IccUploadFileFieldComponent) private uploadFileFields!: QueryList<IccUploadFileFieldComponent>;

  selectUploadFile(fieldConfig: IccUploadFileFieldConfig, file: File): void {
    this.fileUploadFacade.selectUploadFile(fieldConfig.fieldName!, file);
  }

  onChange(checked: boolean): void {
    if (typeof checked === 'boolean') {
      this.checked = checked;
    }
  }

  buttonClick(button: IccButtonConfg): void {
    switch (button.name) {
      case IccButtonType.Reset:
        this.fileUploadFacade.clearUploadFiles();
        this.uploadFileFields.toArray().forEach((field) => field.clearValue());
        break;
      case IccButtonType.UploadFile:
        this.fileUploadFacade.uploadFiles('DCR');
        break;
      default:
        break;
    }
  }

  ngOnDestroy(): void {
    this.fileUploadFacade.clearUploadFiles();
  }
}
