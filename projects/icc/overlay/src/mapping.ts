import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { IccPosition } from './overlay-position';
import { IccTrigger } from './overlay-trigger';

@Injectable()
export class IccOverlay extends Overlay {}

export type IccOverlayRef = OverlayRef;
export type IccOverlayConfig = OverlayConfig;

export interface IccOverlayServiceConfig {
  position: IccPosition;
  popoverLevel?: number;
  trigger: IccTrigger;
  //shouldCloseOnBackdropClick?: boolean;
  customStyle?: string | undefined;
}

export const DEFAULT_OVERLAY_SERVICE_CONFIG: IccOverlayServiceConfig = {
  position: IccPosition.BOTTOM,
  popoverLevel: 0,
  trigger: IccTrigger.CLICK,
  //shouldCloseOnBackdropClick: true,
};
