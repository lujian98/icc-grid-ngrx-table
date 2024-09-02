import { IccIconPackParams } from './icon-libraries';

export interface IccIcon {
  getClasses(): string[];
  getContent(): string | null;
}
export class IccSvgIcon implements IccIcon {
  constructor(
    protected name: string,
    protected content: any,
    protected params: IccIconPackParams = {},
  ) {}

  getClasses(): string[] {
    const classes = [];

    if (this.params.packClass) {
      classes.push(this.params.packClass);
    }
    return classes;
  }

  getContent(): string {
    return this.content;
  }
}

export class IccFontIcon implements IccIcon {
  constructor(
    protected name: string,
    protected params: IccIconPackParams = {},
  ) {}

  getClasses(): string[] {
    const classes = [];

    if (this.params.packClass) {
      classes.push(this.params.packClass);
    }

    const name = this.params.iconClassPrefix ? `${this.params.iconClassPrefix}-${this.name}` : this.name;
    classes.push(name);

    return classes;
  }

  getContent(): string | null {
    return null;
  }
}
