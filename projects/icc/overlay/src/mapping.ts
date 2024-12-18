import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { IccPosition } from './overlay/overlay-position';
import { IccTrigger } from './overlay/overlay-trigger';

@Injectable()
export class IccOverlay extends Overlay {}

export type IccOverlayRef = OverlayRef;
export type IccOverlayConfig = OverlayConfig;

export interface IccOverlayServiceConfig {
  position: IccPosition;
  popoverLevel?: number;
  trigger: IccTrigger;
  clickToClose: boolean;
  customStyle?: string | undefined;
  event?: MouseEvent;
}

export const DEFAULT_OVERLAY_SERVICE_CONFIG: IccOverlayServiceConfig = {
  position: IccPosition.BOTTOM,
  popoverLevel: 0,
  trigger: IccTrigger.CLICK,
  clickToClose: false,
};

export interface IccOverlayItem {
  level: number;
  overlayRef: IccOverlayRef;
}
