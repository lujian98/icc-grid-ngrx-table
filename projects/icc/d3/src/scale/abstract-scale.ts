import { IccScale, IccD3ChartConfig } from '../model';

export abstract class IccAbstractScale<T> {
  abstract getScale(range: number[], reverse: boolean): IccScale;
  abstract updateRange(scale: IccScale, range: number[], reverse: boolean): void;
  abstract setXDomain(scale: IccScale, data: T[], type: string): void;
  abstract setYDomain(scale: IccScale, data: T[], type: string): void;

  constructor(protected configs: IccD3ChartConfig) {}
}
