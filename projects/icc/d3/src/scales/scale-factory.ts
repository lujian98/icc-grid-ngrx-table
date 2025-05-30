import { IccAbstractScale } from './abstract-scale';
import { IccLinearScale } from './linear-scale';
import { IccTimeScale } from './time-scale';
import { IccBandScale } from './band-scale';
import { IccScale, IccD3ChartConfig } from '../models';

export class IccScaleFactory<T> {
  componentMapper = {
    linear: IccLinearScale,
    time: IccTimeScale,
    band: IccBandScale,
  };

  componentRef!: IccAbstractScale<T>;

  constructor(
    private scaleType: string,
    private configs: IccD3ChartConfig,
  ) {
    this.setComponentRef();
  }

  setComponentRef(): void {
    // @ts-ignore
    let component = this.componentMapper[this.scaleType];
    if (!component) {
      component = this.componentMapper.linear;
    }
    this.componentRef = new component(this.configs);
  }

  getScale(range: number[], reverse = false): IccScale {
    return this.componentRef.getScale(range, reverse);
  }

  updateRange(scale: IccScale, range: number[], reverse = false): void {
    this.componentRef.updateRange(scale, range, reverse);
  }

  // @ts-ignore
  setXDomain(scale: IccScale, data: T[], type: string = null): void {
    this.componentRef.setXDomain(scale, data, type);
  }

  // @ts-ignore
  setYDomain(scale: IccScale, data: T[], type: string = null): void {
    this.componentRef.setYDomain(scale, data, type);
  }
}
