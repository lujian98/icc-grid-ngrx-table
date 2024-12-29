import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IccDialogService } from '@icc/ui/overlay';
import { IccPopoverComponent, IccPopoverDirective } from '@icc/ui/popover';
import { IccConfirmationComponent, IccConfirmationConfig, defaultConfirmationConfig } from '@icc/ui/window';

@Component({
  selector: 'app-confirmation',
  template: `
    <div (click)="openConfirmationWindow($event)">Click to Open Confirmation Window</div>
    <div (click)="openYesNoConfirmationWindow($event)">Click to Open Confirmation Yes/No Window</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IccPopoverComponent, IccPopoverDirective],
})
export class AppConfirmationComponent {
  private dialogService = inject(IccDialogService);

  openConfirmationWindow(event: MouseEvent): void {
    let dialogRef = this.dialogService
      .open(IccConfirmationComponent, {
        context: {
          confirmationConfig: {
            ...defaultConfirmationConfig,
            title: 'Test Confirmation',
            showOkButton: true,
            showCancelButton: true,
            showCloseButton: true,
            message: 'This is confirmation to exit',
          },
        },
        closeOnBackdropClick: false,
      })
      .onClose.subscribe((res) => {
        console.log(' on close res=', res);
      });
  }

  openYesNoConfirmationWindow(event: MouseEvent): void {
    this.dialogService
      .open(IccConfirmationComponent, {
        context: {
          confirmationConfig: {
            ...defaultConfirmationConfig,
            title: 'Test Yes/No Confirmation',
            showOkButton: true,
            ok: 'Yes',
            showCancelButton: true,
            cancel: 'No',
            message: 'This is Yes/No confirmation to close',
          },
        },
        closeOnBackdropClick: false,
      })
      .onClose.subscribe((res) => {
        console.log(' on close res=', res);
      });
  }
}
