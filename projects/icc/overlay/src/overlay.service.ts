import { Injectable, inject } from '@angular/core';
import { ScrollStrategyOptions } from '@angular/cdk/overlay';
import { IccOverlay, IccOverlayConfig, IccOverlayRef, IccOverlayItem } from './mapping';

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
    this.overlays = [...this.overlays].filter((item) => item.level < level);
    const overlay = { level, overlayRef };
    this.overlays = level < 1 ? [overlay] : [...this.overlays, overlay];
  }

  remove(overlayRef: IccOverlayRef | null): void {
    if (overlayRef) {
      this.overlays = this.overlays.filter((item) => item.overlayRef !== overlayRef);
    }
  }

  isOverlayColasable(popoverLevel: number): boolean {
    const find = this.overlays.filter((item) => item.level > popoverLevel).length;
    //console.log(' find closedable ', find === 0 ? true : false);
    return find === 0 ? true : false;
  }
}
