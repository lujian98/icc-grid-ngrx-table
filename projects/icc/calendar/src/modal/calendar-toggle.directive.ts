import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { AfterViewInit, Directive, ElementRef, HostListener, Input } from '@angular/core';
import { IccCalendarComponent } from '../calendar.component';

@Directive({
  selector: '[iccCalendarToggle]',
})
export class IccCalendarToggleDirective extends CdkOverlayOrigin implements AfterViewInit {
  @Input() calendarModal!: IccCalendarComponent;
  @Input() disabled!: boolean;

  constructor(elemRef: ElementRef) {
    super(elemRef);
  }

  ngAfterViewInit(): void {
    this.calendarModal.overlayOrigin = this;
  }

  @HostListener('click') toggleOverlay(): void {
    if (!this.disabled) {
      this.calendarModal.toggleOverlay();
    }
  }
}
