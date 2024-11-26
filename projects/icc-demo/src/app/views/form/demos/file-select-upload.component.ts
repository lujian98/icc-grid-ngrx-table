import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IccFileSelectUploadComponent } from '@icc/ui/file-upload';

@Component({
  selector: 'app-file-select-upload',
  template: `<icc-file-select-upload [uploadNumber]="uploadNumber"></icc-file-select-upload>`,
  styles: [':host { width: 100%; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IccFileSelectUploadComponent],
})
export class AppFileSelectUploadComponent {
  uploadNumber = 5;
}
