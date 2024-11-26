import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IccButtonComponent } from '@icc/ui/button';
import { IccButtonConfg, IccButtonType } from '@icc/ui/core';
import { IccFileDropUpload } from './models/file-drop-upload.model';
import { IccIconModule } from '@icc/ui/icon';
import { IccPanelComponent, IccPanelTopBarComponent } from '@icc/ui/panel';
import { IccFileDropStateModule } from './+state/file-drop-state.module';
import { IccFileDropFacade } from './+state/file-drop.facade';
import { IccFileDropEntry } from './components/file-drop/file-drop-entry';
import { IccFileDropComponent } from './components/file-drop/file-drop.component';

@Component({
  selector: 'icc-file-drop-upload',
  templateUrl: './file-drop-upload.component.html',
  styleUrls: ['./file-drop-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    IccFileDropStateModule,
    IccIconModule,
    IccPanelComponent,
    IccPanelTopBarComponent,
    IccButtonComponent,
    IccFileDropComponent,
  ],
})
export class IccFileDropUploadComponent {
  private fileDropFacade = inject(IccFileDropFacade);
  uploadFiles$ = this.fileDropFacade.selectUploadFiles$;

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
          const newFile: IccFileDropUpload = {
            fieldName: `filedrop`,
            relativePath: droppedFile.relativePath,
            file: file,
            filename: file.name,
            type: file.type,
            size: file.size,
            lastModified: file.lastModified,
          };
          this.fileDropFacade.dropUploadFile(newFile);
        });
      }
    }
  }

  onChange(event: any): void {
    this.checked = event.target.checked;
  }

  buttonClick(button: IccButtonConfg): void {
    switch (button.name) {
      case IccButtonType.Reset:
        this.fileDropFacade.clearUploadFiles();
        break;
      case IccButtonType.UploadFile:
        this.fileDropFacade.uploadFiles('DCR');
        break;
      default:
        break;
    }
  }
}
