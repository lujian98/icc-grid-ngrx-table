import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, ElementRef, Injectable, TemplateRef, Type, inject } from '@angular/core';
import { IccOverlayRef, IccOverlayServiceConfig } from './mapping';
import { IccRenderableContainer } from './overlay-container.component';
import { IccPositionBuilderService, Point } from './overlay-position-builder.service';
import { IccOverlayService } from './overlay.service';

@Injectable()
export class IccDynamicOverlayService {
  private overlayPositionBuilder = inject(IccPositionBuilderService);
  private overlayService = inject(IccOverlayService);
  private componentType!: Type<IccRenderableContainer>;
  private hostElement!: ElementRef;
  private overlayServiceConfig!: IccOverlayServiceConfig;
  private context: Object = {};
  private content!: Type<any> | TemplateRef<any> | string;

  private overlayRef!: IccOverlayRef | null;
  private containerRef!: ComponentRef<IccRenderableContainer> | null | undefined;

  build(
    componentType: Type<IccRenderableContainer>,
    hostElement: ElementRef,
    overlayServiceConfig: IccOverlayServiceConfig,
    content: Type<any> | TemplateRef<any> | string,
    context: {},
  ) {
    this.overlayServiceConfig = overlayServiceConfig;
    if (this.overlayServiceConfig.popoverLevel! === 0) {
      this.overlayService.closeAllOverlays(); // TODO delete all condition
    }
    this.componentType = componentType;
    this.hostElement = hostElement;
    this.content = content;
    this.context = context;

    this.show();
    console.log(' popoverLevel=', this.overlayServiceConfig.popoverLevel);
    return this.overlayRef;
  }

  private show(): void {
    if (!this.overlayRef) {
      this.createOverlay();
    }
    this.containerRef = this.overlayRef?.attach(new ComponentPortal(this.componentType, null, null));
    this.updateContext();
  }

  private createOverlay(): void {
    const positionStrategy = this.createPositionStrategy();
    this.overlayRef = this.overlayService.create({
      scrollStrategy: this.overlayService.scrollStrategies.close(),
      positionStrategy,
      //hasBackdrop: true,
      //backdropClass: '',
    });
    this.overlayService.add(this.overlayRef, this.overlayServiceConfig.popoverLevel!);
  }

  private createPositionStrategy() {
    let origin: ElementRef | Point = this.hostElement;
    return this.overlayPositionBuilder.flexibleConnectedTo(origin, this.overlayServiceConfig.position);
  }

  // @ts-ignore
  container() {
    return this.containerRef;
  }

  hide(): void {
    if (this.overlayRef) {
      this.overlayService.destroyOverlay(this.overlayRef);
    }
    this.containerRef = null;
    this.overlayRef = null;
    //console.log(' 2222222222222222 hide= ', this.overlayService.overlays);
  }

  private updateContext(): void {
    // @ts-ignore
    Object.assign(this.containerRef?.instance, {
      content: this.content,
      context: this.context,
      dynamicOverlayService: this,
      customStyle: this.overlayServiceConfig.customStyle,
    });
    this.containerRef?.instance.renderContent();
    this.containerRef?.changeDetectorRef.detectChanges();
  }

  destroy(): void {
    if (this.overlayRef) {
      this.overlayService.destroyOverlay(this.overlayRef);
    }
  }
}
