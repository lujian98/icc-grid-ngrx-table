import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IccPanelComponent } from '@icc/ui/panel';
import { IccUploadFile, IccUploadFileService } from '@icc/ui/core';
import { take, timer } from 'rxjs';
import { IccFileDropComponent } from './components/file-drop/file-drop.component';
import { IccFileDropEntry } from './components/file-drop/file-drop-entry';

@Component({
  selector: 'icc-file-drop-upload',
  templateUrl: './file-drop-upload.component.html',
  styleUrls: ['./file-drop-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IccPanelComponent, IccFileDropComponent],
})
export class IccFileDropUploadComponent {
  private uploadFileService = inject(IccUploadFileService);
  checked = true;
  entries: string[] = [];

  get className(): string {
    return !this.checked ? 'icc-file-drop__drop-zone--disabled' : 'icc-file-drop__drop-zone--enabled';
  }

  dropped(files: IccFileDropEntry[]): void {
    console.log(' this.files=', files);
    const uploadFiles: IccUploadFile[] = [];
    let i = 0;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        console.log(' droppedFile=', droppedFile);
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          i++;
          console.log(' file=', file);
          const newfile: IccUploadFile = {
            fieldName: `filedrop_${i}`,
            relativePath: droppedFile.relativePath,
            file: file,
          };
          uploadFiles.push(newfile);
        });
      }
    }

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
  }

  onChange(event: any): void {
    this.checked = event.target.checked;
  }
}
