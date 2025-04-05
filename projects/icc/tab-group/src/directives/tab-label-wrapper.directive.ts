import { Directive, ElementRef, Input, booleanAttribute, inject } from '@angular/core';
import { IccInkBarItemDirective } from './ink-bar.directive';

@Directive({
  selector: '[iccTabLabelWrapper]',
  host: {
    '[class.icc-mdc-tab-disabled]': 'disabled',
    '[attr.aria-disabled]': '!!disabled',
  },
})
export class IccTabLabelWrapperDirective extends IccInkBarItemDirective {
  elementRef = inject(ElementRef);

  @Input({ transform: booleanAttribute })
  disabled: boolean = false;

  focus(): void {
    this.elementRef.nativeElement.focus();
  }

  getOffsetLeft(): number {
    return this.elementRef.nativeElement.offsetLeft;
  }

  getOffsetWidth(): number {
    return this.elementRef.nativeElement.offsetWidth;
  }
}
