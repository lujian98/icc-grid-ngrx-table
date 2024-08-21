import { Directive, HostListener, inject } from '@angular/core';
import { IccColumnResizeDirective } from './column-resize.directive';

@Directive({
  selector: '[iccColumnResizeTrigger]',
  standalone: true,
})
export class IccColumnResizeTriggerDirective {
  private columnResizeDirective = inject(IccColumnResizeDirective);

  @HostListener('mousedown', ['$event'])
  onMousedown(event: MouseEvent) {
    this.columnResizeDirective.onMouseDown(event);
  }
}
