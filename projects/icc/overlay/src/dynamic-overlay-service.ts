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

  private overlays: IccOverlayRef[] = [];
  private overlayRef!: IccOverlayRef | null;
  private containerRef!: ComponentRef<IccRenderableContainer> | null | undefined;

  build(
    componentType: Type<IccRenderableContainer>,
    hostElement: ElementRef,
    overlayServiceConfig: IccOverlayServiceConfig,
    content: Type<any> | TemplateRef<any> | string,
    context: {},
  ) {
    this.componentType = componentType;
    this.hostElement = hostElement;
    this.overlayServiceConfig = overlayServiceConfig;
    this.content = content;
    this.context = context;

    if (this.overlayServiceConfig.popoverLevel === 0) {
      this.closeAllOverlays();
    }

    this.show();
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
    this.overlays.push(this.overlayRef);
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
    //console.log(' 2222222222222222 hide');
    this.overlayRef?.detach();
    this.containerRef = null;
    this.overlayRef = null;
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

  public closeAllOverlays(): void {
    if (this.overlays && this.overlays.length > 0) {
      this.overlays.forEach((overlay, index) => {
        this.destroyOverlay(overlay, false);
      });
    }
    this.overlays = [];
  }

  public isOverlayClosed(overlayRef: IccOverlayRef, popoverType: string, popoverLevel: number): boolean {
    const index = this.overlays.indexOf(overlayRef);
    // if (popoverType !== 'hover' || (popoverType === 'hover' && index === this.overlays.length - 1)) {
    if (index === this.overlays.length - 1) {
      this.destroyOverlay(overlayRef);
      return true;
    }
    return false;
  }

  destroyOverlay(overlayRef: IccOverlayRef, removeIndex = true) {
    if (overlayRef) {
      if (removeIndex) {
        const index = this.overlays.indexOf(overlayRef);
        this.overlays.splice(index, 1);
      }
      overlayRef.detach();
      overlayRef.dispose();
    }
  }

  destroy(): void {
    if (this.overlayRef) {
      this.destroyOverlay(this.overlayRef);
      //this.overlayRef.dispose();
    }
  }
}
