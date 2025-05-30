import {
  ConnectionPositionPair,
  FlexibleConnectedPositionStrategy,
  GlobalPositionStrategy,
  OverlayPositionBuilder,
} from '@angular/cdk/overlay';
import { ElementRef, Inject, Injectable } from '@angular/core';
import { ICC_DOCUMENT } from '@icc/ui/theme';
import { IccPosition } from './overlay-position';

export interface Point {
  x: number;
  y: number;
}

const POSITIONS = {
  [IccPosition.TOP](offset: number): ConnectionPositionPair {
    return {
      originX: 'center',
      originY: 'top',
      overlayX: 'center',
      overlayY: 'bottom',
      offsetY: -offset,
    };
  },
  [IccPosition.BOTTOM](offset: number): ConnectionPositionPair {
    return {
      originX: 'center',
      originY: 'bottom',
      overlayX: 'center',
      overlayY: 'top',
      offsetY: offset,
    };
  },
  [IccPosition.LEFT](offset: number): ConnectionPositionPair {
    return {
      originX: 'start',
      originY: 'center',
      overlayX: 'end',
      overlayY: 'center',
      offsetX: -offset,
    };
  },
  [IccPosition.RIGHT](offset: number): ConnectionPositionPair {
    return {
      originX: 'end',
      originY: 'center',
      overlayX: 'start',
      overlayY: 'center',
      offsetX: offset,
    };
  },
  [IccPosition.BOTTOM_END](offset: number): ConnectionPositionPair {
    return {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
      offsetY: offset,
    };
  },
  [IccPosition.BOTTOMRIGHT](offset: number): ConnectionPositionPair {
    return {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
      offsetX: offset,
      offsetY: offset - 6,
    };
  },
  [IccPosition.RIGHTBOTTOM](offset: number): ConnectionPositionPair {
    return {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
      offsetX: offset - 10,
      offsetY: -3 * offset,
    };
  },
};

@Injectable()
export class IccPositionBuilderService {
  constructor(
    @Inject(ICC_DOCUMENT) protected document: Document,
    protected overlayPositionBuilder: OverlayPositionBuilder,
  ) {}

  global(): GlobalPositionStrategy {
    return new GlobalPositionStrategy();
  }

  flexibleConnectedTo(
    elementRef: ElementRef | Point,
    position: IccPosition,
    offset: number = 8,
  ): FlexibleConnectedPositionStrategy {
    const connectedPosition = POSITIONS[position](offset);
    const positions = [];
    positions.push(connectedPosition);
    return this.overlayPositionBuilder.flexibleConnectedTo(elementRef).withPositions(positions);
  }
}
