import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  IccLayoutCenterComponent,
  IccLayoutComponent,
  IccLayoutFooterComponent,
  IccLayoutHeaderComponent,
  IccLayoutHorizontalComponent,
  IccLayoutLeftComponent,
  IccLayoutRightComponent,
} from '@icc/ui/layout';
import { IccDialogRef } from '@icc/ui/overlay';
import { AppDialogDemoComponent } from './dialog.component';

@Component({
  selector: 'app-dialog-test',
  templateUrl: './dialog-test.component.html',
  styleUrls: ['./dialog-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    IccLayoutComponent,
    IccLayoutHeaderComponent,
    IccLayoutFooterComponent,
    IccLayoutCenterComponent,
    IccLayoutHorizontalComponent,
    IccLayoutLeftComponent,
    IccLayoutRightComponent,
    AppDialogDemoComponent,
  ],
})
export class AppDialogTestDemoComponent {
  private dialogRef = inject(IccDialogRef<AppDialogTestDemoComponent>);

  dialog: any;

  close(): void {
    this.dialogRef.close('test uujj make love');
  }
}
