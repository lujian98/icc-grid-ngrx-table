import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IccFormComponent, defaultFormConfig } from '@icc/ui/form';
import { IccCheckboxComponent } from '@icc/ui/checkbox';
import { IccCalendarModule } from '@icc/ui/calendar';
import { IccFormFieldComponent, IccLabelDirective, IccSuffixDirective } from '@icc/ui/form-field';
import { IccButtonComponent } from '@icc/ui/button';

import {
  DEFAULT_OVERLAY_SERVICE_CONFIG,
  IccDynamicOverlayService,
  IccOverlayServiceConfig,
  IccPosition,
  IccTrigger,
  IccOverlayModule,
} from '@icc/ui/overlay';
import { IccDialogRef } from '@icc/ui/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    IccButtonComponent,
    IccOverlayModule,
    IccFormComponent,
    ReactiveFormsModule,

    IccCheckboxComponent,
    IccCalendarModule,

    IccFormFieldComponent,
    IccLabelDirective,
    IccSuffixDirective,
  ],
  providers: [IccDynamicOverlayService],
})
export class AppDialogDemoComponent {
  private dynamicOverlayService = inject(IccDynamicOverlayService);
  private dialogRef = inject(IccDialogRef<AppDialogDemoComponent>);

  dialog: any;

  close(): void {
    //console.log('tttttttttttttttttttt close clicked');
    // this.dynamicOverlayService.hide();
    this.dialogRef.close('test uujj make love');
  }
}
