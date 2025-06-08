import { ChangeDetectionStrategy, Component, OnDestroy, effect, inject, input, signal } from '@angular/core';
import { IccCheckboxComponent } from '@icc/ui/checkbox';
import { IccBUTTONS, IccButtonConfg, IccButtonType } from '@icc/ui/core';
import { IccIconModule } from '@icc/ui/icon';
import { IccLayoutComponent, IccLayoutHeaderComponent } from '@icc/ui/layout';
import { TranslatePipe } from '@ngx-translate/core';
import { IccFileUploadStateModule } from './+state/file-upload-state.module';
import { IccFileUploadFacade } from './+state/file-upload.facade';
import { IccFileDropEntry } from './components/file-drop/file-drop-entry';
import { IccFileDropComponent } from './components/file-drop/file-drop.component';
import { IccFileUploadGridComponent } from './components/file-upload-grid/file-upload-grid.component';
import { IccFileUploadConfig, defaultFileUploadConfig } from './models/file-upload.model';

@Component({
  selector: 'icc-file-drop-upload',
  templateUrl: './file-drop-upload.component.html',
  styleUrls: ['./file-drop-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TranslatePipe,
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
  private readonly fileUploadFacade = inject(IccFileUploadFacade);
  uploadFiles$ = this.fileUploadFacade.getUploadFiles$;
  buttons: IccButtonConfg[] = [IccBUTTONS.UploadFile, IccBUTTONS.Reset];
  enabled = signal<boolean>(true);
  fileUploadConfig = input(defaultFileUploadConfig, {
    transform: (val: Partial<IccFileUploadConfig>) => ({ ...defaultFileUploadConfig, ...val }),
  });

  get className(): string {
    return !this.enabled() ? 'icc-file-drop__drop-zone--disabled' : 'icc-file-drop__drop-zone--enabled';
  }

  constructor() {
    effect(() => {
      if (this.uploadFiles$()) {
        this.setButtonDisabled();
      }
    });
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

  onChange(enabled: boolean): void {
    if (typeof enabled === 'boolean') {
      this.enabled.set(enabled);
    }
  }

  private setButtonDisabled(disabled: boolean = false): void {
    disabled = this.uploadFiles$().length === 0 ? true : disabled;
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
