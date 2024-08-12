import { Directive, HostListener } from '@angular/core';
import { IccColumnResizeDirective } from './column-resize.directive';

@Directive({
  selector: '[iccColumnResizeTrigger]',
  standalone: true,
})
export class IccColumnResizeTriggerDirective {

  constructor(
    private columnResizeDirective: IccColumnResizeDirective
  ) {
  }

  @HostListener('mousedown', ['$event'])
  onMousedown(event: MouseEvent) {
    this.columnResizeDirective.onMouseDown(event);
  }
}
