import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { Injectable, TemplateRef, Type } from '@angular/core';
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
  clickToClose: boolean;
  //shouldCloseOnBackdropClick?: boolean;
  customStyle?: string | undefined;
  event?: MouseEvent;
}

export const DEFAULT_OVERLAY_SERVICE_CONFIG: IccOverlayServiceConfig = {
  position: IccPosition.BOTTOM,
  popoverLevel: 0,
  trigger: IccTrigger.CLICK,
  clickToClose: false,
  //shouldCloseOnBackdropClick: true,
};

export interface IccOverlayItem {
  level: number;
  overlayRef: IccOverlayRef;
}

export type IccPortalContent<T> = string | TemplateRef<T> | Type<T>;

export interface IccRenderableContainer {
  // @ts-ignore
  renderContent();
}
