import { Injectable, ElementRef, Injector } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { provideNativeDateAdapter } from '@angular/material/core';
import { IccCalendarOverlayConfig, ICC_CALENDAR_OVERLAY_CONFIG } from '../model/model';
import { takeWhile } from 'rxjs/operators';
import { IccDatePickerOverlayComponent } from '../picker-overlay/date-picker-overlay.component';
import { IccDateRangePickerOverlayComponent } from '../picker-overlay/date-range-picker-overlay.component';

const DEFAULT_CONFIG: IccCalendarOverlayConfig = {
  panelClass: 'icc-date-range-overlay',
  hasBackdrop: true,
  backdropClass: 'icc-date-range-overlay-backdrop',
  shouldCloseOnBackdropClick: true,
};

@Injectable()
export class IccCalendarOverlayService {
  private hostElemRef!: ElementRef;

  constructor(
    private overlay: Overlay,
    private injector: Injector,
  ) {}

  open(config: IccCalendarOverlayConfig = {}, hostElemRef: ElementRef, portal: string): OverlayRef {
    this.hostElemRef = hostElemRef;
    const overlayConfig = { ...DEFAULT_CONFIG, ...config };
    const overlayRef = this.createOverlay(overlayConfig);
    const portalInjector = this.createInjector(overlayRef, overlayConfig);

    if (portal === 'date-range-picker') {
      const dateRangePortal = new ComponentPortal(IccDateRangePickerOverlayComponent, null, portalInjector);
      overlayRef.attach(dateRangePortal);
    } else {
      const datePortal = new ComponentPortal(IccDatePickerOverlayComponent, null, portalInjector);
      overlayRef.attach(datePortal);
    }
    overlayRef
      .backdropClick()
      .pipe(takeWhile(() => !!overlayConfig.shouldCloseOnBackdropClick))
      .subscribe(() => overlayRef.dispose());

    return overlayRef;
  }

  private createOverlay(config: IccCalendarOverlayConfig): OverlayRef {
    const overlayConfig = this.getOverlayConfig(config);
    return this.overlay.create(overlayConfig);
  }

  private getOverlayConfig(config: IccCalendarOverlayConfig): OverlayConfig {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.hostElemRef)
      .withFlexibleDimensions(false)
      .withViewportMargin(8)
      .withDefaultOffsetY(12)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
        },
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
        },
        {
          originX: 'end',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'bottom',
        },
      ]);

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy,
    });

    return overlayConfig;
  }

  private createInjector(overlayRef: OverlayRef, overlayConfig: IccCalendarOverlayConfig): Injector {
    return Injector.create({
      parent: this.injector,
      providers: [
        { provide: OverlayRef, useValue: overlayRef },
        { provide: ICC_CALENDAR_OVERLAY_CONFIG, useValue: overlayConfig },
        provideNativeDateAdapter(),
      ],
    });
  }
}
