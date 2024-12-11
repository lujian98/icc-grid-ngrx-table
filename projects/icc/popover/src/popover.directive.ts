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
  inject,
} from '@angular/core';

import { IccPopoverComponent } from './popover.component';
import { IccPosition, IccTrigger, IccDynamicOverlayService } from '@icc/ui/overlay';

@Directive({
  selector: '[iccPopover]',
  exportAs: 'iccPopover',
  standalone: true,
  providers: [IccDynamicOverlayService],
})
export class IccPopoverDirective implements AfterViewInit, OnChanges, OnDestroy {
  private dynamicOverlayService = inject(IccDynamicOverlayService);
  private elementRef = inject(ElementRef);

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

  @Input() popoverLevel = 0;

  ngAfterViewInit() {
    this.dynamicOverlayService.build(
      IccPopoverComponent,
      this.elementRef,
      this.position,
      this.trigger,
      this.content,
      this.context,
      this.style,
    );
  }

  private getFakeElement(event: MouseEvent): ElementRef {
    return new ElementRef({
      getBoundingClientRect: () => ({
        bottom: event.clientY,
        height: 0,
        left: event.clientX,
        right: event.clientX,
        top: event.clientY,
        width: 0,
      }),
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // @ts-ignore
    if (changes.context) {
      this.dynamicOverlayService.rebuild(this.context, this.content);
    }
  }

  ngOnDestroy() {
    this.dynamicOverlayService.destroy();
  }

  private rebuildPopover(mouseEvent: MouseEvent): void {
    this.dynamicOverlayService.destroy();
    const fakeElement = this.getFakeElement(mouseEvent);
    this.dynamicOverlayService.build(
      IccPopoverComponent,
      fakeElement,
      this.position,
      this.trigger,
      this.content,
      this.context,
      this.style,
    );
  }

  openPopover(mouseEvent: MouseEvent): void {
    this.rebuildPopover(mouseEvent);
    this.dynamicOverlayService.show();
  }

  show() {
    this.dynamicOverlayService.rebuild(this.context, this.content);
    this.dynamicOverlayService.show();
  }

  hide() {
    this.dynamicOverlayService.hide();
  }
}
