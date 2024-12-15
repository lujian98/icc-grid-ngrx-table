import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, ElementRef, inject, Injectable, OnDestroy, TemplateRef, Type } from '@angular/core';
import { IccOverlayRef, IccOverlayServiceConfig } from './mapping';
import { take, timer } from 'rxjs';
import { IccRenderableContainer } from './overlay-container.component';
import { IccPosition } from './overlay-position';
import { IccPositionBuilderService, Point } from './overlay-position-builder.service';
import { IccTrigger, IccTriggerStrategy, IccTriggerStrategyBuilderService } from './overlay-trigger';
import { IccOverlayService } from './overlay.service';

@Injectable()
export class IccDynamicOverlayService implements OnDestroy {
  private overlayPositionBuilder = inject(IccPositionBuilderService);
  private overlayService = inject(IccOverlayService);
  private triggerStrategyBuilder = inject(IccTriggerStrategyBuilderService);

  private componentType!: Type<IccRenderableContainer>;
  private context: Object = {};
  private content!: Type<any> | TemplateRef<any> | string;
  private hostElement!: ElementRef;
  private overlayRef!: IccOverlayRef | null;
  private containerRef!: ComponentRef<IccRenderableContainer> | null | undefined;
  private triggerStrategy!: IccTriggerStrategy;
  private overlayServiceConfig!: IccOverlayServiceConfig;
  private isFirsTtime = true;
  build(
    componentType: Type<IccRenderableContainer>,
    hostElement: ElementRef,
    overlayServiceConfig: IccOverlayServiceConfig,
    content: Type<any> | TemplateRef<any> | string,
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
    // console.log(' ttttttttttt6666666666666 this.overlayServiceConfig.trigger=', this.overlayServiceConfig.trigger);
    this.triggerStrategy = this.triggerStrategyBuilder.build(
      this.hostElement.nativeElement,
      // @ts-ignore
      () => this.container(),
      this.overlayServiceConfig.trigger,
    );
    // @ts-ignore
    this.triggerStrategy.show$.subscribe((event: MouseEvent) => {
      this.show(event);
    });
    // @ts-ignore
    this.triggerStrategy.hide$.subscribe((event: MouseEvent) => {
      if (event.type === 'click' || event.type === 'mousemove') {
        // console.log(' 222222 overlays ', this.overlayService.overlays);
        if (this.overlayService.isOverlayColasable(this.overlayServiceConfig.popoverLevel!)) {
          this.hide();
        } else {
          /*
          console.log(' 333333333333 overlayServiceConfig.popoverLevel ', this.overlayServiceConfig.popoverLevel);
          console.log(' 333333333333 overlays ', this.overlayService.overlays);
          if(this.overlayServiceConfig.popoverLevel === 0 && this.overlayService.overlays.length > 1) {


            timer(600)
            .pipe(take(1))
            .subscribe(() => {
              console.log(' 555555555555555555555555 show overlays ', this.overlayService.overlays);
              this.show();
            });

          }*/
        }
      } else {
        this.hide();
        // console.log(' 444444444444 overlays ', this.overlayService.overlays);
      }
    });
    /*
    if (this.overlayServiceConfig.trigger === IccTrigger.HOVERCLICK && this.isFirsTtime) {
      this.isFirsTtime = false;
      // this.show();
    }*/
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

  // @ts-ignore
  private container(): ComponentRef<IccRenderableContainer> | null | undefined {
    return this.containerRef;
  }

  show(event: MouseEvent | null = null): void {
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
    //console.log( 'remove=', this.overlayRef)
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

  ngOnDestroy(): void {
    if (this.triggerStrategy) {
      this.triggerStrategy.destroy();
    }
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
  }
}
