import { Injectable, ComponentRef, ElementRef, Type, TemplateRef } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';

import { IccOverlayRef } from './mapping';
import { IccTriggerStrategy, IccTrigger, IccTriggerStrategyBuilderService } from './overlay-trigger';

import { DEFAULT_OVERLAY_SERVICE_CONFIG, IccOverlayServiceConfig } from './mapping';

import { IccRenderableContainer } from './overlay-container.component';
import { IccPositionBuilderService, Point } from './overlay-position-builder.service';
import { IccPosition } from './overlay-position';
import { IccOverlayService } from './overlay.service';

@Injectable()
export class IccDynamicOverlayService {
  private componentType!: Type<IccRenderableContainer>;
  private context: Object = {};
  private content!: Type<any> | TemplateRef<any> | string;
  private hostElement!: ElementRef;

  private overlayRef!: IccOverlayRef | null;
  private containerRef!: ComponentRef<IccRenderableContainer> | null | undefined;
  private triggerStrategy!: IccTriggerStrategy;

  private overlayServiceConfig!: IccOverlayServiceConfig;

  constructor(
    private overlayPositionBuilder: IccPositionBuilderService,
    private overlayService: IccOverlayService,
    private triggerStrategyBuilder: IccTriggerStrategyBuilderService,
  ) {}

  build(
    componentType: Type<IccRenderableContainer>,
    hostElement: ElementRef,
    overlayServiceConfig: IccOverlayServiceConfig,
    content: Type<any> | TemplateRef<any> | string,
    context: {},
  ): void {
    this.overlayServiceConfig = overlayServiceConfig;
    this.componentType = componentType;
    this.hostElement = hostElement;
    this.content = content;
    this.context = context;

    if (this.triggerStrategy) {
      this.triggerStrategy.destroy();
    }

    this.triggerStrategy = this.triggerStrategyBuilder.build(
      this.hostElement.nativeElement,
      // @ts-ignore
      () => this.container(),
      this.overlayServiceConfig.trigger,
    );
    // @ts-ignore
    this.triggerStrategy.show$.subscribe((event: MouseEvent) => this.show(event));
    this.triggerStrategy.hide$.subscribe(() => this.hide());
  }

  rebuild(context: {}, content: Type<any> | TemplateRef<any> | string): void {
    this.context = context;
    this.content = content;
    if (this.containerRef) {
      this.updateContext();
    }
  }

  private createOverlay(event: MouseEvent | null = null): void {
    const positionStrategy = this.createPositionStrategy(event);
    this.overlayRef = this.overlayService.create({
      scrollStrategy: this.overlayService.scrollStrategies.close(),
      positionStrategy,
      //hasBackdrop: true,
      //backdropClass: '',
    });
  }

  private createPositionStrategy(event: MouseEvent | null = null) {
    let origin: ElementRef | Point = this.hostElement;
    if (this.overlayServiceConfig.trigger === IccTrigger.CONTEXTMENU && event) {
      origin = {
        x: event.clientX,
        y: event.clientY,
      };
      this.overlayServiceConfig.position = IccPosition.BOTTOMRIGHT;
    }
    return this.overlayPositionBuilder.flexibleConnectedTo(origin, this.overlayServiceConfig.position);
  }

  // @ts-ignore
  private container() {
    return this.containerRef;
  }

  show(event: MouseEvent | null = null): void {
    if (this.overlayServiceConfig.trigger === IccTrigger.CONTEXTMENU && event) {
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

  hide(): void {
    this.overlayRef?.detach();
    this.containerRef = null;
    this.overlayRef = null;
  }

  private updateContext(): void {
    // @ts-ignore
    Object.assign(this.containerRef?.instance, {
      content: this.content,
      context: this.context,
      customStyle: this.overlayServiceConfig.customStyle,
    });
    this.containerRef?.instance.renderContent();
    this.containerRef?.changeDetectorRef.detectChanges();
  }

  destroy(): void {
    if (this.triggerStrategy) {
      this.triggerStrategy.destroy();
    }
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
  }
}
