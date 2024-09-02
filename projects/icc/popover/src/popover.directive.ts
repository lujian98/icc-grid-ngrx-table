import {
  Directive,
  Input,
  ElementRef,
  OnDestroy,
  TemplateRef,
  Type,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { IccPopoverComponent } from './popover.component';
import { IccPosition, IccTrigger, IccDynamicOverlayService } from '@icc/ui/overlay';

@Directive({
  selector: '[iccPopover]',
  exportAs: 'iccPopover',
  providers: [IccDynamicOverlayService],
})
export class IccPopoverDirective implements AfterViewInit, OnChanges, OnDestroy {
  @Input('iccPopover')
  content!: Type<any> | TemplateRef<any>;

  @Input('iccPopoverContext')
  context: Object = {};

  @Input('iccPopoverPosition')
  position: IccPosition = IccPosition.BOTTOM;

  @Input('iccPopoverTrigger')
  trigger: IccTrigger = IccTrigger.HOVER;

  @Input('iccPopoverStyle')
  style: string | undefined;

  constructor(
    protected elementRef: ElementRef,
    protected dyanmicOverlayService: IccDynamicOverlayService,
  ) {}

  ngAfterViewInit() {
    this.dyanmicOverlayService.build(
      IccPopoverComponent,
      this.elementRef,
      this.position,
      this.trigger,
      this.content,
      this.context,
      this.dyanmicOverlayService,
      this.style,
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    // @ts-ignore
    if (changes.context) {
      this.dyanmicOverlayService.rebuild(this.context, this.content);
    }
  }

  ngOnDestroy() {
    this.dyanmicOverlayService.destroy();
  }

  show() {
    this.dyanmicOverlayService.show();
  }

  hide() {
    this.dyanmicOverlayService.hide();
  }
}
