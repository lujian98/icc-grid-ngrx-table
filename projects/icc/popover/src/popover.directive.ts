import { AfterViewInit, Directive, ElementRef, inject, Input, OnDestroy, TemplateRef, Type } from '@angular/core';
import {
  DEFAULT_OVERLAY_SERVICE_CONFIG,
  IccDynamicOverlayService,
  IccOverlayRef,
  IccPosition,
  IccTrigger,
  IccTriggerStrategy,
  IccTriggerStrategyBuilderService,
  IccOverlayService,
} from '@icc/ui/overlay';
import { IccPopoverComponent } from './popover.component';

@Directive({
  selector: '[iccPopover]',
  exportAs: 'iccPopover',
  standalone: true,
  providers: [IccDynamicOverlayService],
})
export class IccPopoverDirective implements AfterViewInit, OnDestroy {
  private overlayService = inject(IccOverlayService);
  private dynamicOverlayService = inject(IccDynamicOverlayService);
  private elementRef = inject(ElementRef);

  private triggerStrategyBuilder = inject(IccTriggerStrategyBuilderService);
  private triggerStrategy!: IccTriggerStrategy;

  private overlayRef: IccOverlayRef | null = null;
  private isOpened = false;
  private overlays: IccOverlayRef[] = [];

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
    this.triggerStrategy.show$.subscribe((event: MouseEvent) => this.show(event));
    this.triggerStrategy.hide$.subscribe(() => this.hide());
  }

  private container() {
    return this.dynamicOverlayService.container();
  }

  show(event: MouseEvent): void {
    this.isOpened = true;
    console.log(' level =', this.popoverLevel);
    this.buildOverlay(this.elementRef);
    //console.log( ' 22222this.overlays=', this.overlays)
  }

  hide(): void {
    if (this.overlayService.isOverlayClosed(this.overlayRef!, this.trigger, this.popoverLevel)) {
      this.isOpened = false;
      this.dynamicOverlayService.hide();
    }
  }

  private buildOverlay(elementRef: ElementRef): void {
    const overlayServiceConfig = {
      ...DEFAULT_OVERLAY_SERVICE_CONFIG,
      position: this.position,
      popoverLevel: this.popoverLevel,
      customStyle: this.style,
    };
    this.overlayRef = this.dynamicOverlayService.build(
      IccPopoverComponent,
      elementRef,
      overlayServiceConfig,
      this.content,
      this.context,
    );
    //this.overlays.push(this.overlayRef!);
  }

  // for D3 point tooltip with fakeElement
  openPopover(event: MouseEvent): void {
    this.dynamicOverlayService.destroy();
    const fakeElement = this.getFakeElement(event);
    this.buildOverlay(fakeElement);
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

  ngOnDestroy(): void {
    if (this.triggerStrategy) {
      this.triggerStrategy.destroy();
    }
    this.dynamicOverlayService.destroy();
  }
}
