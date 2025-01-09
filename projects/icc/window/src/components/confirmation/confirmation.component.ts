import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { IccButtonComponent } from '@icc/ui/button';
import {
  IccLayoutCenterComponent,
  IccLayoutComponent,
  IccLayoutFooterComponent,
  IccLayoutHeaderComponent,
  IccLayoutHorizontalComponent,
} from '@icc/ui/layout';
import { IccDialogRef } from '@icc/ui/overlay';
import { TranslateModule } from '@ngx-translate/core';
import { defaultConfirmationConfig, IccConfirmationConfig } from '../../models/confirmation.model';
import { IccWindowComponent } from '../../window.component';

@Component({
  selector: 'icc-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TranslateModule,
    IccLayoutComponent,
    IccLayoutHeaderComponent,
    IccLayoutFooterComponent,
    IccLayoutCenterComponent,
    IccLayoutHorizontalComponent,
    IccButtonComponent,
    IccWindowComponent,
  ],
})
export class IccConfirmationComponent {
  private dialogRef = inject(IccDialogRef<IccConfirmationComponent>);
  private changeDetectorRef = inject(ChangeDetectorRef);
  private _confirmationConfig: IccConfirmationConfig = defaultConfirmationConfig;

  @Input()
  set confirmationConfig(val: IccConfirmationConfig) {
    this._confirmationConfig = { ...defaultConfirmationConfig, ...val };
    this.changeDetectorRef.markForCheck();
  }
  get confirmationConfig(): IccConfirmationConfig {
    return this._confirmationConfig;
  }

  ok(): void {
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  close(): void {
    this.dialogRef.close();
  }
}
