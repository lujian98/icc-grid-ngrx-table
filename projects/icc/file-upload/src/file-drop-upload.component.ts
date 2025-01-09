import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnDestroy, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IccCheckboxComponent } from '@icc/ui/checkbox';
import { IccButtonConfg, IccButtonType, IccBUTTONS } from '@icc/ui/core';
import { map } from 'rxjs';
import { IccIconModule } from '@icc/ui/icon';
import { IccFileUploadStateModule } from './+state/file-upload-state.module';
import { IccFileUploadFacade } from './+state/file-upload.facade';
import { IccFileDropEntry } from './components/file-drop/file-drop-entry';
import { IccFileDropComponent } from './components/file-drop/file-drop.component';
import { IccFileUploadGridComponent } from './components/file-upload-grid/file-upload-grid.component';
import { IccFileUploadConfig, defaultFileUploadConfig, IccFileUpload } from './models/file-upload.model';
import { IccLayoutComponent, IccLayoutHeaderComponent } from '@icc/ui/layout';

@Component({
  selector: 'icc-file-drop-upload',
  templateUrl: './file-drop-upload.component.html',
  styleUrls: ['./file-drop-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TranslateModule,
    IccFileUploadStateModule,
    IccIconModule,
    IccLayoutComponent,
    IccLayoutHeaderComponent,
    IccFileDropComponent,
    IccFileUploadGridComponent,
    IccCheckboxComponent,
  ],
})
export class IccFileDropUploadComponent implements OnDestroy {
  private fileUploadFacade = inject(IccFileUploadFacade);
  private uploadFiles: IccFileUpload[] = [];

  uploadFiles$ = this.fileUploadFacade.selectUploadFiles$.pipe(
    map((uploadFiles) => {
      this.uploadFiles = uploadFiles;
      this.setButtonDisabled();
      return uploadFiles;
    }),
  );
  private _fileUploadConfig!: IccFileUploadConfig;

  @Input()
  set fileUploadConfig(val: Partial<IccFileUploadConfig>) {
    this._fileUploadConfig = { ...defaultFileUploadConfig, ...val };
  }
  get fileUploadConfig(): IccFileUploadConfig {
    return this._fileUploadConfig;
  }

  buttons: IccButtonConfg[] = [IccBUTTONS.UploadFile, IccBUTTONS.Reset];

  checked = true;

  get className(): string {
    return !this.checked ? 'icc-file-drop__drop-zone--disabled' : 'icc-file-drop__drop-zone--enabled';
  }

  dropped(files: IccFileDropEntry[]): void {
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.fileUploadFacade.dropUploadFile(droppedFile.relativePath, file);
        });
      }
    }
  }

  onChange(checked: boolean): void {
    if (typeof checked === 'boolean') {
      this.checked = checked;
      this.setButtonDisabled(!this.checked);
    }
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
