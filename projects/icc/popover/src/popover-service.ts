import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, ElementRef, inject, Injectable, OnDestroy, TemplateRef, Type } from '@angular/core';
import {
  IccOverlayRef,
  IccOverlayService,
  IccOverlayServiceConfig,
  IccPosition,
  IccPositionBuilderService,
  IccTrigger,
  IccTriggerStrategy,
  IccTriggerStrategyBuilderService,
  Point,
} from '@icc/ui/overlay';
import { IccPopoverContainer } from './popover.model';

@Injectable()
export class IccPopoverService<T> implements OnDestroy {
  private overlayPositionBuilder = inject(IccPositionBuilderService);
  private overlayService = inject(IccOverlayService);
  private triggerStrategyBuilder = inject(IccTriggerStrategyBuilderService);
  private componentType!: Type<IccPopoverContainer>;
  private context: Object = {};
  private content!: Type<T> | TemplateRef<T> | string;
  private hostElement!: ElementRef;
  private overlayRef!: IccOverlayRef | null;
  private containerRef!: ComponentRef<IccPopoverContainer> | null | undefined;
  private triggerStrategy!: IccTriggerStrategy;
  private overlayServiceConfig!: IccOverlayServiceConfig;

  build(
    componentType: Type<IccPopoverContainer>,
    hostElement: ElementRef,
    overlayServiceConfig: IccOverlayServiceConfig,
    content: Type<T> | TemplateRef<T> | string,
    context: {},
  ): void {
    this.componentType = componentType;
    this.overlayServiceConfig = overlayServiceConfig;

    this.hostElement =
      overlayServiceConfig?.event && overlayServiceConfig.trigger === IccTrigger.POINT
        ? this.getFakeElement(overlayServiceConfig?.event)
        : hostElement;

    this.content = content;
    this.context = context;

    if (this.triggerStrategy) {
      this.triggerStrategy.destroy();
    }
    this.triggerStrategy = this.triggerStrategyBuilder.build(
      this.hostElement.nativeElement,
      () => this.container()!,
      this.overlayServiceConfig.trigger,
    );
    this.triggerStrategy.clickToClose = this.overlayServiceConfig.clickToClose;
    this.triggerStrategy.show$.subscribe((event: Event) => {
      this.show(event);
    });
    this.triggerStrategy.hide$.subscribe((event: Event) => {
      if (this.canOverlayClose(event)) {
        this.hide();
      }
    });
  }

  private canOverlayClose(event: Event): boolean {
    if (event.type === 'click' || event.type === 'mousemove') {
      if (this.overlayServiceConfig.clickToClose) {
        return true;
      }
      return this.overlayService.isOverlayColasable(this.overlayServiceConfig.popoverLevel!) ? true : false;
    }
    return true;
  }

  rebuild(context: {}, content: Type<T> | TemplateRef<T> | string): void {
    this.context = context;
    this.content = content;
    if (this.containerRef) {
      this.updateContext();
    }
  }

  private createOverlay(event: Event | null = null): void {
    const positionStrategy = this.createPositionStrategy(event as MouseEvent);
    this.overlayRef = this.overlayService.create({
      scrollStrategy: this.overlayService.scrollStrategies.close(),
      positionStrategy,
    });
    this.overlayService.add(this.overlayRef, this.overlayServiceConfig.popoverLevel!);
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

  private createPositionStrategy(event: MouseEvent | null = null) {
    let origin: ElementRef | Point = this.hostElement;
    if (this.overlayServiceConfig?.trigger === IccTrigger.CONTEXTMENU && event) {
      origin = {
        x: event.clientX,
        y: event.clientY,
      };
      this.overlayServiceConfig.position = IccPosition.BOTTOMRIGHT;
    }
    return this.overlayPositionBuilder.flexibleConnectedTo(origin, this.overlayServiceConfig.position);
  }

  private container(): ComponentRef<IccPopoverContainer> {
    return this.containerRef!;
  }

  show(event: Event | null = null): void {
    if (this.overlayServiceConfig?.trigger === IccTrigger.CONTEXTMENU && event) {
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
    this.overlayService.remove(this.overlayRef);
    this.overlayRef?.detach();
    this.containerRef = null;
    this.overlayRef = null;
  }

  private updateContext(): void {
    if (this.containerRef?.instance) {
      Object.assign(this.containerRef.instance, {
        content: this.content,
        context: this.context,
        customStyle: this.overlayServiceConfig.customStyle,
      });
      this.containerRef.instance.renderContent();
      this.containerRef.changeDetectorRef.detectChanges();
    }
  }

  ngOnDestroy(): void {
    if (this.triggerStrategy) {
      this.triggerStrategy.destroy();
    }
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
  }
}
