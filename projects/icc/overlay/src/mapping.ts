import { Injectable } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { IccTrigger } from './overlay-trigger';
import { IccPosition } from './overlay-position';

@Injectable()
export class IccOverlay extends Overlay {}

export type IccOverlayRef = OverlayRef;
export type IccOverlayConfig = OverlayConfig;

export interface IccOverlayServiceConfig {
  trigger: IccTrigger;
  position: IccPosition;
  popoverLevel?: number;
  shouldCloseOnBackdropClick?: boolean;
  customStyle?: string | undefined;
}

export const DEFAULT_OVERLAY_SERVICE_CONFIG: IccOverlayServiceConfig = {
  trigger: IccTrigger.CLICK,
  position: IccPosition.BOTTOM,
  popoverLevel: 0,
  shouldCloseOnBackdropClick: true,
};
