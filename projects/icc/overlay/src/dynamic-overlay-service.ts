import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, ElementRef, Injectable, TemplateRef, Type, inject } from '@angular/core';
import { IccOverlayRef, IccOverlayServiceConfig } from './mapping';
import { IccRenderableContainer } from './overlay-container.component';
import { IccPosition } from './overlay-position';
import { IccPositionBuilderService, Point } from './overlay-position-builder.service';
import { IccTrigger, IccTriggerStrategy, IccTriggerStrategyBuilderService } from './overlay-trigger';
import { IccOverlayService } from './overlay.service';

@Injectable()
export class IccDynamicOverlayService {
  private overlayPositionBuilder = inject(IccPositionBuilderService);
  private overlayService = inject(IccOverlayService);
  private triggerStrategyBuilder = inject(IccTriggerStrategyBuilderService);

  private componentType!: Type<IccRenderableContainer>;
  private hostElement!: ElementRef;
  private overlayServiceConfig!: IccOverlayServiceConfig;
  private context: Object = {};
  private content!: Type<any> | TemplateRef<any> | string;

  private overlays: IccOverlayRef[] = [];
  private overlayRef!: IccOverlayRef | null;
  //public containerRef!: ComponentRef<IccRenderableContainer> | null | undefined;
  public containerRef!: ComponentRef<any> | undefined;
  private triggerStrategy!: IccTriggerStrategy;

  build(
    componentType: Type<IccRenderableContainer>,
    hostElement: ElementRef,
    overlayServiceConfig: IccOverlayServiceConfig,
    content: Type<any> | TemplateRef<any> | string,
    context: {},
    event: MouseEvent,
  ) {
    this.componentType = componentType;
    this.hostElement = hostElement;
    this.overlayServiceConfig = overlayServiceConfig;
    this.content = content;
    this.context = context;

    if (this.overlayServiceConfig.popoverLevel === 0) {
      this.closeAllOverlays();
    }

    /*
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
    */
    this.show(event);

    return this.overlayRef;
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

  rebuild(context: {}, content: Type<any> | TemplateRef<any> | string): void {
    this.context = context;
    this.content = content;
    if (this.containerRef) {
      this.updateContext();
    }
  }

  createOverlay(event: MouseEvent | null = null): void {
    const positionStrategy = this.createPositionStrategy(event);
    this.overlayRef = this.overlayService.create({
      scrollStrategy: this.overlayService.scrollStrategies.close(),
      positionStrategy,
      //hasBackdrop: true,
      //backdropClass: '',
    });
    this.overlays.push(this.overlayRef);
  }

  createPositionStrategy(event: MouseEvent | null = null) {
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
  container() {
    return this.containerRef;
  }

  hide(): void {
    this.overlayRef?.detach();
    //this.containerRef = null;
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
    if (this.triggerStrategy) {
      this.triggerStrategy.destroy();
    }

    if (this.overlayRef) {
      this.destroyOverlay(this.overlayRef);
      //this.overlayRef.dispose();
    }
  }
}
