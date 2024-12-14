import { Injectable, inject } from '@angular/core';
import { ScrollStrategyOptions } from '@angular/cdk/overlay';
import { IccOverlay, IccOverlayConfig, IccOverlayRef, IccOverlayItem } from './mapping';
import { IccTrigger } from './overlay-trigger';

@Injectable()
export class IccOverlayService {
  private _overlays: IccOverlayItem[] = [];
  private overlay = inject(IccOverlay);

  get scrollStrategies(): ScrollStrategyOptions {
    return this.overlay.scrollStrategies;
  }

  create(config?: IccOverlayConfig): IccOverlayRef {
    const overlayRef = this.overlay.create(config);
    return overlayRef;
  }

  set overlays(val: IccOverlayItem[]) {
    this._overlays = val;
  }
  get overlays(): IccOverlayItem[] {
    return this._overlays;
  }
  add(overlayRef: IccOverlayRef, level: number): void {
    const overlay = { level, overlayRef };
    /*
    this.overlays.forEach((item, index) => {
      if (index + 1 >= level) {
      }
    });
    */
    this.overlays = level < 1 ? [overlay] : [...this.overlays, overlay];
    console.log(' eeeeeeeee this.overlays=', this.overlays);
  }

  /*
  closeAllOverlays(): void {
    if (this.overlays && this.overlays.length > 0) {
      this.overlays.forEach((overlay, index) => {
        this.destroyOverlay(overlay, false);
      });
    }
    this.overlays = [];
  }

  public isOverlayClosed(overlayRef: IccOverlayRef, trigger: IccTrigger, popoverLevel: number): boolean {
    const index = this.overlays.indexOf(overlayRef);
    if (trigger !== IccTrigger.HOVER || (trigger === IccTrigger.HOVER && index === this.overlays.length - 1)) {
      //this.destroyOverlay(overlayRef);
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
  }*/
}
