import { Directive, ElementRef, Input, booleanAttribute, inject } from '@angular/core';
import { InkBarItem } from './ink-bar';

// used in tab-groups.ts and tab-header.ts

@Directive({
  selector: '[iccTabLabelWrapper]',
  host: {
    '[class.icc-mdc-tab-disabled]': 'disabled',
    '[attr.aria-disabled]': '!!disabled',
  },
})
export class IccTabLabelWrapper extends InkBarItem {
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
