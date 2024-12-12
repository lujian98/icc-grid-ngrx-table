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

import {
  DEFAULT_OVERLAY_SERVICE_CONFIG,
  IccDynamicOverlayService,
  IccOverlayServiceConfig,
  IccPosition,
  IccTrigger,
} from '@icc/ui/overlay';

@Directive({
  selector: '[iccPopover]',
  exportAs: 'iccPopover',
  standalone: true,
  providers: [IccDynamicOverlayService],
})
export class IccPopoverDirective implements AfterViewInit, OnChanges, OnDestroy {
  private elementRef = inject(ElementRef);
  private dynamicOverlayService = inject(IccDynamicOverlayService);

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

  ngAfterViewInit(): void {
    const overlayServiceConfig: IccOverlayServiceConfig = {
      ...DEFAULT_OVERLAY_SERVICE_CONFIG,
      trigger: this.trigger,
      position: this.position,
    };

    this.dynamicOverlayService.build(
      IccPopoverComponent,
      this.elementRef,
      overlayServiceConfig,
      this.content,
      this.context,
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

  ngOnChanges(changes: SimpleChanges): void {
    // @ts-ignore
    if (changes.context) {
      this.dynamicOverlayService.rebuild(this.context, this.content);
    }
  }

  private rebuildPopover(mouseEvent: MouseEvent): void {
    this.dynamicOverlayService.destroy();
    const fakeElement = this.getFakeElement(mouseEvent);

    const overlayServiceConfig: IccOverlayServiceConfig = {
      ...DEFAULT_OVERLAY_SERVICE_CONFIG,
      trigger: this.trigger,
      position: this.position,
    };

    this.dynamicOverlayService.build(
      IccPopoverComponent,
      fakeElement,
      overlayServiceConfig,
      this.content,
      this.context,
    );
  }

  openPopover(mouseEvent: MouseEvent): void {
    this.rebuildPopover(mouseEvent);
    this.dynamicOverlayService.show();
  }

  show(): void {
    this.dynamicOverlayService.rebuild(this.context, this.content);
    this.dynamicOverlayService.show();
  }

  hide(): void {
    this.dynamicOverlayService.hide();
  }

  ngOnDestroy(): void {
    this.dynamicOverlayService.destroy();
  }
}
