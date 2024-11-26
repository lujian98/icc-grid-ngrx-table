import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IccButtonComponent } from '@icc/ui/button';
import { IccCheckboxComponent } from '@icc/ui/checkbox';
import { IccButtonConfg, IccButtonType } from '@icc/ui/core';
import { IccIconModule } from '@icc/ui/icon';
import { IccPanelComponent, IccPanelTopBarComponent } from '@icc/ui/panel';
import { IccFileUploadStateModule } from './+state/file-upload-state.module';
import { IccFileUploadFacade } from './+state/file-upload.facade';
import { IccFileDropGridComponent } from './components/file-drop-grid/file-drop-grid.component';
import { IccFileDropEntry } from './components/file-drop/file-drop-entry';
import { IccFileDropComponent } from './components/file-drop/file-drop.component';
import { IccFileUpload } from './models/file-upload.model';

@Component({
  selector: 'icc-file-drop-upload',
  templateUrl: './file-drop-upload.component.html',
  styleUrls: ['./file-drop-upload.component.scss'],
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
  ],
})
export class IccFileDropUploadComponent {
  private fileUploadFacade = inject(IccFileUploadFacade);
  uploadFiles$ = this.fileUploadFacade.selectUploadFiles$;

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

  get className(): string {
    return !this.checked ? 'icc-file-drop__drop-zone--disabled' : 'icc-file-drop__drop-zone--enabled';
  }

  dropped(files: IccFileDropEntry[]): void {
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          const newFile: IccFileUpload = {
            fieldName: `filedrop`,
            relativePath: droppedFile.relativePath,
            file: file,
            filename: file.name,
            type: file.type,
            size: file.size,
            lastModified: file.lastModified,
          };
          this.fileUploadFacade.dropUploadFile(newFile);
        });
      }
    }
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
        break;
      case IccButtonType.UploadFile:
        this.fileUploadFacade.uploadFiles('DCR');
        break;
      default:
        break;
    }
  }
}
