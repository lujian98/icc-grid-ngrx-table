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
  IccOverlayServiceConfig,
  DEFAULT_OVERLAY_SERVICE_CONFIG,
  IccOverlayRef,
  //IccClickTriggerStrategy,
} from '@icc/ui/overlay';

import {
  IccBasePopoverStrategy,
  IccPopoverClickStrategy,
  IccPopoverHoverStrategy,
  IccPopoverContextmenuStrategy,
} from './popover.strategy';

@Directive({
  selector: '[iccPopover]',
  exportAs: 'iccPopover',
  standalone: true,
  providers: [IccDynamicOverlayService],
})
export class IccPopoverDirective implements AfterViewInit, OnChanges, OnDestroy {
  private dynamicOverlayService = inject(IccDynamicOverlayService);
  private elementRef = inject(ElementRef);

  private popoverStrategy!: IccBasePopoverStrategy;
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
    this.popoverStrategy = new IccPopoverClickStrategy(document, this.elementRef.nativeElement);

    this.popoverStrategy.show$.subscribe((event: any) => this.openPopover2(event));
    this.popoverStrategy.hide$.subscribe(() => this.closePopover());

    /*
    const overlayServiceConfig = {
      ...DEFAULT_OVERLAY_SERVICE_CONFIG,
      trigger: this.trigger,
      position: this.position,
      popoverLevel: this.popoverLevel,
      customStyle: this.style,
    };
    this.dynamicOverlayService.build(
      IccPopoverComponent,
      this.elementRef,
      overlayServiceConfig,
      this.content,
      this.context,
    );
    */
  }

  openPopover2(event: MouseEvent) {
    if (!this.isOpened) {
      //let origin = this.elementRef.nativeElement;
      let origin = this.elementRef;
      if (this.trigger === IccTrigger.CONTEXTMENU) {
        /*
        const fakeElement = {
          getBoundingClientRect: (): ClientRect => ({
            bottom: mouseEvent.clientY,
            height: 0,
            left: mouseEvent.clientX,
            right: mouseEvent.clientX,
            top: mouseEvent.clientY,
            width: 0,
          })
        };*/
        const fakeElement = this.getFakeElement(event);
        origin = new ElementRef(fakeElement);
      }

      this.isOpened = true;
      /*
      const overlayConfig: IccOverlayConfig = {
        position: this.popoverPosition,
        width: this.width,
        height: this.height,
        popoverType: this.popoverType,
        popoverLevel: this.popoverLevel,
      }; */

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
        //origin,
        overlayServiceConfig,
        this.content,
        this.context,
        event,

        /*
        origin,
        IccPortalComponent,
        overlayConfig,
        this.content,
        this.context
        */
      );
      this.popoverStrategy.isOpened = this.isOpened;
      this.popoverStrategy.overlayRef = this.overlayRef!;
      this.popoverStrategy.containerRef = this.dynamicOverlayService.containerRef!;

      /*
      this.overlayService.overlayComponentRef.afterClosed$
        .pipe(takeWhile(() => this.isOpened))
        .subscribe(() => {
          this.closePopover();
        });

      this.overlayService.overlayComponentRef.isComponentAttached$
        .pipe(takeWhile(() => this.isOpened))
        .subscribe(() => {
          this.setPortalComponentEvent();
        });
        */
    }
  }

  closePopover() {
    // TODO check overlay closeable
    //if (this.overlayService.isOverlayClosed(this.overlayRef, this.popoverType, this.popoverLevel)) {
    this.isOpened = false;
    this.popoverStrategy.isOpened = this.isOpened;
    //this.popoverStrategy.overlayRef = null;
    //this.popoverStrategy.containerRef = null;
    //}

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
    //this.dynamicOverlayService.show();
  }

  show() {
    this.dynamicOverlayService.rebuild(this.context, this.content);
    //this.dynamicOverlayService.show();
  }

  hide() {
    this.dynamicOverlayService.hide();
  }
}
