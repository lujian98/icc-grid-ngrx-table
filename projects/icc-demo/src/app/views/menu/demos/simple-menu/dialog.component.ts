import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IccButtonComponent } from '@icc/ui/button';
import { IccCalendarModule } from '@icc/ui/calendar';
import { IccCheckboxComponent } from '@icc/ui/checkbox';
import { IccFormComponent } from '@icc/ui/form';
import { IccFormFieldComponent, IccLabelDirective, IccSuffixDirective } from '@icc/ui/form-field';

import { IccDialogRef, IccDynamicOverlayService, IccOverlayModule } from '@icc/ui/overlay';

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
  private dialogRef = inject(IccDialogRef<AppDialogDemoComponent>);

  dialog: any;

  close(): void {
    //console.log('tttttttttttttttttttt close clicked');
    // this.dynamicOverlayService.hide();
    this.dialogRef.close('test uujj make love');
  }
}
