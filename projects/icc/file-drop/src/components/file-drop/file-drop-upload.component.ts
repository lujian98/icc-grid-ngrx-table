import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IccFileDropComponent } from './file-drop.component';
import { IccFileDropEntry } from './file-drop-entry';

@Component({
  selector: 'icc-file-drop-upload',
  templateUrl: './file-drop-upload.component.html',
  styleUrls: ['./file-drop-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IccFileDropComponent],
})
export class IccFileDropUploadComponent {
  checked = true;
  entries: string[] = [];

  get className(): string {
    return !this.checked ? 'icc-file-drop__drop-zone--disabled' : 'icc-file-drop__drop-zone--enabled';
  }

  dropped(files: IccFileDropEntry[]): void {
    this.entries = files.map((file) => file.relativePath);
    console.log(' this.entries=', this.entries);
  }

  onChange(event: any): void {
    this.checked = event.target.checked;
  }
}
