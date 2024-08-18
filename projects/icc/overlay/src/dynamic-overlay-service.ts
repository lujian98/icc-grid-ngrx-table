import { Injectable, ComponentRef, ElementRef, Type, TemplateRef } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';

import { IccOverlayRef } from './mapping';
import { IccTriggerStrategy, IccTrigger, IccTriggerStrategyBuilderService } from './overlay-trigger';
import { IccRenderableContainer } from './overlay-container.component';
import { IccPositionBuilderService, Point } from './overlay-position-builder.service';
import { IccPosition } from './overlay-position';
import { IccOverlayService } from './overlay.service';

@Injectable()
export class IccDynamicOverlayService {
  protected componentType!: Type<IccRenderableContainer>;
  protected context: Object = {};
  protected content!: Type<any> | TemplateRef<any> | string;
  protected hostElement!: ElementRef;
  protected position: IccPosition = IccPosition.BOTTOM;
  protected trigger: IccTrigger = IccTrigger.HOVER;
  protected dynamicOverlayService!: IccDynamicOverlayService;
  protected customStyle: string | undefined;

  protected overlayRef!: IccOverlayRef | null;
  protected containerRef!: ComponentRef<IccRenderableContainer> | null | undefined;
  protected triggerStrategy!: IccTriggerStrategy;

  constructor(
    private overlayPositionBuilder: IccPositionBuilderService,
    private overlayService: IccOverlayService,
    private triggerStrategyBuilder: IccTriggerStrategyBuilderService
  ) {}

  build(
    componentType: Type<IccRenderableContainer>,
    hostElement: ElementRef,
    position: IccPosition,
    trigger: IccTrigger,
    content: Type<any> | TemplateRef<any> | string,
    context: {},
    dynamicOverlayService: IccDynamicOverlayService,
    customStyle?: string
  ) {
    this.componentType = componentType;
    this.hostElement = hostElement;
    this.position = position;
    this.trigger = trigger;
    this.content = content;
    this.context = context;
    this.dynamicOverlayService = dynamicOverlayService;
    this.customStyle = customStyle;

    if (this.triggerStrategy) {
      this.triggerStrategy.destroy();
    }

    this.triggerStrategy = this.triggerStrategyBuilder.build(
      this.hostElement.nativeElement,
      // @ts-ignore
      () => this.container(),
      this.trigger
    );
    // @ts-ignore
    this.triggerStrategy.show$.subscribe((event: MouseEvent) => this.show(event));
    this.triggerStrategy.hide$.subscribe(() => this.hide());
  }

  rebuild(context: {}, content: Type<any> | TemplateRef<any> | string) {
    this.context = context;
    this.content = content;
    if (this.containerRef) {
      this.updateContext();
    }
  }

  destroy() {
    if (this.triggerStrategy) {
      this.triggerStrategy.destroy();
    }
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
  }

  createOverlay(event: MouseEvent | null = null) {
    const positionStrategy = this.createPositionStrategy(event);
    this.overlayRef = this.overlayService.create({
      scrollStrategy: this.overlayService.scrollStrategies.close(),
      positionStrategy,
    });
  }

  createPositionStrategy(event: MouseEvent | null = null) {
    let origin: ElementRef | Point = this.hostElement;
    if (this.trigger === IccTrigger.CONTEXTMENU && event) {
      origin = {
        x: event.clientX,
        y: event.clientY,
      };
      this.position = IccPosition.BOTTOMRIGHT;
    }
    return this.overlayPositionBuilder.flexibleConnectedTo(origin, this.position);
  }

  // @ts-ignore
  container() {
    return this.containerRef;
  }

  show(event: MouseEvent | null = null) {
    if (this.trigger === IccTrigger.CONTEXTMENU && event) {
      this.hide();
      this.overlayRef = null;
    }

    if (this.containerRef) {
      return;
    }

    if (!this.overlayRef) {
      this.createOverlay(event);
    }
    this.containerRef = this.overlayRef?.attach(new ComponentPortal(this.componentType, null, null));
    this.updateContext();
  }

  hide() {
    this.overlayRef?.detach();
    this.containerRef = null;
    this.overlayRef = null;
  }

  private updateContext() {
    // @ts-ignore
    Object.assign(this.containerRef?.instance, {
      content: this.content,
      context: this.context,
      dynamicOverlayService: this.dynamicOverlayService,
      customStyle: this.customStyle,
    });
    this.containerRef?.instance.renderContent();
    this.containerRef?.changeDetectorRef.detectChanges();
  }
}
