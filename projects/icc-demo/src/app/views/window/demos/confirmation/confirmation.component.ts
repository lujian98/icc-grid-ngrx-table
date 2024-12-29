import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IccDialogService } from '@icc/ui/overlay';
import { IccPopoverComponent, IccPopoverDirective } from '@icc/ui/popover';
import { IccConfirmationComponent, IccConfirmationConfig, defaultConfirmationConfig } from '@icc/ui/window';

@Component({
  selector: 'app-confirmation',
  template: `<div (click)="openConfirmationWindow($event)">Click to Open Confirmation Window</div>`,
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
}
