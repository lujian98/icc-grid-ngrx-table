import { Injectable } from '@angular/core';
import { ScrollStrategyOptions } from '@angular/cdk/overlay';

import { IccOverlay, IccOverlayConfig, IccOverlayRef } from './mapping';

@Injectable()
export class IccOverlayService {
  constructor(protected overlay: IccOverlay) {}

  get scrollStrategies(): ScrollStrategyOptions {
    return this.overlay.scrollStrategies;
  }

  create(config?: IccOverlayConfig): IccOverlayRef {
    const overlayRef = this.overlay.create(config);
    return overlayRef;
  }
}
