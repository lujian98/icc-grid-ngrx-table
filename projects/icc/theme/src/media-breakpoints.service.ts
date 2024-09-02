import { Injectable } from '@angular/core';

export interface IccMediaBreakpoint {
  name: string;
  width: number;
}

export const DEFAULT_MEDIA_BREAKPOINTS = [
  {
    name: 'xs',
    width: 0,
  },
  {
    name: 'sm',
    width: 640,
  },
  {
    name: 'md',
    width: 768,
  },
  {
    name: 'lg',
    width: 1024,
  },
  {
    name: 'xl',
    width: 1280,
  },
  {
    name: 'xxl',
    width: 1640,
  },
];

@Injectable()
export class IccMediaBreakpointsService {
  private breakpointsMap: { [breakpoint: string]: number };

  constructor() {
    this.breakpointsMap = DEFAULT_MEDIA_BREAKPOINTS.reduce(
      (res: any, b: IccMediaBreakpoint) => {
        res[b.name] = b.width;
        return res;
      },
      {},
    );
  }

  getByWidth(width: number): IccMediaBreakpoint {
    const unknown = { name: 'unknown', width: width };
    const breakpoints = DEFAULT_MEDIA_BREAKPOINTS;

    return (
      breakpoints.find((breakpoint: IccMediaBreakpoint, index: number) => {
        const next = breakpoints[index + 1];
        return width >= breakpoint.width && (!next || width < next.width);
      }) || unknown
    );
  }

  getBreakpointsMap(): { [breakpoint: string]: number } {
    return this.breakpointsMap;
  }
}
