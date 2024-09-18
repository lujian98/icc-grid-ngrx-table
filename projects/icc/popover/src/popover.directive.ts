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
  standalone: true,
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

  private getFakeElement(event: MouseEvent): ElementRef {
    return new ElementRef({
      // @ts-ignore
      getBoundingClientRect: (): ClientRect => ({
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
      this.dyanmicOverlayService.rebuild(this.context, this.content);
    }
  }

  ngOnDestroy() {
    this.dyanmicOverlayService.destroy();
  }

  private rebuildPopover(mouseEvent: MouseEvent): void {
    this.dyanmicOverlayService.destroy();
    const fakeElement = this.getFakeElement(mouseEvent);
    this.dyanmicOverlayService.build(
      IccPopoverComponent,
      fakeElement,
      this.position,
      this.trigger,
      this.content,
      this.context,
      this.dyanmicOverlayService,
      this.style,
    );
  }

  openPopover(mouseEvent: MouseEvent): void {
    console.log(' openoooooooooooooooooooooooooo this.context=', this.context);
    //this.dyanmicOverlayService.rebuild(this.context, this.content);
    this.rebuildPopover(mouseEvent);
    this.dyanmicOverlayService.show();
  }

  closePopover(): void {
    console.log(' close iiiiiiiiiiiiiiiiii');
    this.dyanmicOverlayService.hide();
  }

  show() {
    this.dyanmicOverlayService.show();
  }

  hide() {
    this.dyanmicOverlayService.hide();
  }
}
