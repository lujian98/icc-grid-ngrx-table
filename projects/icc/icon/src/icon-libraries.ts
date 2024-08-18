import { Injectable } from '@angular/core';

import { IccIcon, IccFontIcon, IccSvgIcon } from './icon';

export interface IccIcons {
  [key: string]: IccIcon | string;
}

export interface IccIconPack {
  name: string;
  icons: Map<string, IccIcon | string>;
  params: IccIconPackParams;
  type: IccIconPackType;
}

export enum IccIconPackType {
  SVG = 'svg',
  FONT = 'font',
}

export interface IccIconPackParams {
  packClass?: string;
  [name: string]: any;
  iconClassPrefix?: string;
}

export class IccIconDefinition {
  name!: string;
  pack!: string;
  icon!: IccIcon;
}

@Injectable({ providedIn: 'root' })
export class IccIconLibraries {
  protected packs: Map<string, IccIconPack> = new Map();
  protected defaultPack!: IccIconPack | undefined;

  registerSvgPack(name: string, icons: IccIcons, params: IccIconPackParams = {}) {
    this.packs.set(name, {
      name,
      icons: new Map(Object.entries(icons)),
      params,
      type: IccIconPackType.SVG,
    });
  }

  registerFontPack(name: string, params: IccIconPackParams = {}) {
    this.packs.set(name, {
      name,
      icons: new Map(),
      params,
      type: IccIconPackType.FONT,
    });
  }

  setDefaultPack(name: string) {
    this.defaultPack = this.packs.get(name);
  }

  getSvgIcon(name: string, pack?: string): IccIconDefinition | null {
    const iconPack = pack ? this.packs.get(pack) : this.defaultPack;
    if (iconPack) {
      const icon = iconPack.icons.has(name) ? iconPack.icons.get(name) : null;

      if (!icon) {
        return null;
      }

      return {
        name,
        pack: iconPack.name,
        icon: new IccSvgIcon(name, icon, iconPack.params),
      };
    }
    return null;
  }

  getFontIcon(name: string, pack?: string): IccIconDefinition | null {
    const iconsPack = pack ? this.packs.get(pack) : this.defaultPack;
    if (iconsPack) {
      return {
        name,
        pack: iconsPack.name,
        icon: new IccFontIcon(name, iconsPack.params),
      };
    }
    return null;
  }

  getIcon(name: string, pack?: string): IccIconDefinition | null {
    const iconPack = pack ? this.packs.get(pack) : this.defaultPack;
    if (iconPack) {
      if (iconPack.type === IccIconPackType.SVG) {
        return this.getSvgIcon(name, pack);
      }
    }

    return this.getFontIcon(name, pack);
  }
}
