import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IccButtonComponent } from '@icc/ui/button';
import { IccButtonConfg, IccButtonType, IccUploadFile } from '@icc/ui/core';
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
    //console.log(' this.files=', files);
    const uploadFiles: IccUploadFile[] = [];
    let i = 0;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        //console.log(' droppedFile=', droppedFile);
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          i++;
          // console.log(' file=', file);
          const newFile: IccUploadFile = {
            fieldName: `filedrop_${i}`,
            relativePath: droppedFile.relativePath,
            file: file,
          };
          this.fileDropFacade.dropUploadFile(newFile);
        });
      }
    }

    /*
    timer(100)
      .pipe(take(1))
      .subscribe(() => {
        //console.log( ' uploadFiles=', uploadFiles)
        this.uploadFileService
          .sendUploadFiles('DCR', uploadFiles)
          .pipe(take(1))
          .subscribe((res) => {
            //console.log(' res=', res)
          });
      });
      */
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
