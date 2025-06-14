import { Directive, HostListener, inject } from '@angular/core';
import { IccColumnResizeDirective } from './column-resize.directive';

@Directive({
  selector: '[iccColumnResizeTrigger]',
})
export class IccColumnResizeTriggerDirective {
  private readonly columnResizeDirective = inject(IccColumnResizeDirective);

  @HostListener('mousedown', ['$event'])
  onMousedown(event: MouseEvent): void {
    this.columnResizeDirective.onMouseDown(event);
  }
}
