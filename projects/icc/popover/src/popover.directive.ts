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
  IccPosition,
  IccTrigger,
  IccDynamicOverlayService,
  DEFAULT_OVERLAY_SERVICE_CONFIG,
  IccOverlayRef,
  IccTriggerStrategy,
  IccTriggerStrategyBuilderService,
} from '@icc/ui/overlay';

@Directive({
  selector: '[iccPopover]',
  exportAs: 'iccPopover',
  standalone: true,
  providers: [IccDynamicOverlayService],
})
export class IccPopoverDirective implements AfterViewInit, OnChanges, OnDestroy {
  private dynamicOverlayService = inject(IccDynamicOverlayService);
  private elementRef = inject(ElementRef);

  private triggerStrategyBuilder = inject(IccTriggerStrategyBuilderService);
  private triggerStrategy!: IccTriggerStrategy;

  private overlayRef: IccOverlayRef | null = null;
  private isOpened = false;

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
    if (this.triggerStrategy) {
      this.triggerStrategy.destroy();
    }

    this.triggerStrategy = this.triggerStrategyBuilder.build(
      this.elementRef.nativeElement,
      // @ts-ignore
      () => this.container(),
      this.trigger,
    );
    // @ts-ignore
    this.triggerStrategy.show$.subscribe((event: MouseEvent) => this.openPopover2(event));
    this.triggerStrategy.hide$.subscribe(() => this.hide());
  }

  container() {
    return this.dynamicOverlayService.containerRef;
  }

  openPopover2(event: MouseEvent) {
    //if (!this.isOpened) {
    this.isOpened = true;
    const overlayServiceConfig = {
      ...DEFAULT_OVERLAY_SERVICE_CONFIG,
      trigger: this.trigger,
      position: this.position,
      popoverLevel: this.popoverLevel,
      customStyle: this.style,
    };
    this.overlayRef = this.dynamicOverlayService.build(
      IccPopoverComponent,
      this.elementRef,
      overlayServiceConfig,
      this.content,
      this.context,
      event,
    );
    //}
  }

  closePopover() {
    console.log(' closePopover 666666666666666666666');
    // TODO check overlay closeable
    //if (this.overlayService.isOverlayClosed(this.overlayRef, this.popoverType, this.popoverLevel)) {
    this.isOpened = false;

    this.dynamicOverlayService.hide();
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
    const overlayServiceConfig = {
      ...DEFAULT_OVERLAY_SERVICE_CONFIG,
      trigger: this.trigger,
      position: this.position,
      popoverLevel: this.popoverLevel,
      customStyle: this.style,
    };
    this.dynamicOverlayService.build(
      IccPopoverComponent,
      fakeElement,
      overlayServiceConfig,
      this.content,
      this.context,
      mouseEvent,
    );
  }

  openPopover(mouseEvent: MouseEvent): void {
    this.rebuildPopover(mouseEvent);
  }

  show() {
    this.dynamicOverlayService.rebuild(this.context, this.content);
  }

  hide() {
    this.dynamicOverlayService.hide();
  }
}
