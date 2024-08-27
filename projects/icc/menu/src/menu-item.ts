import { IccIconConfig } from '@icc/ui/icon';
import { Params } from '@angular/router';

export type IccMenuTriggerEvent = 'click' | 'hover';

export class IccMenuItem {
  title?: string;
  link?: string;
  queryParams?: Params;
  routerOptions?: any;
  url?: string;
  home?: boolean;
  icon?: string | IccIconConfig;
  class?: string | string[] | Set<string> | { [klass: string]: any };
  children?: IccMenuItem[];
  target?: string;
  selected?: boolean;
  in_progress?: boolean;
  type?: string;
  hidden?: boolean;
  action?: string;
  disabled?: boolean;
  options?: any[];
  value?: string; // value field in the options
  display?: string; // display field in the options
  tooltip?: string;
  separator?: boolean;
  trigger?: IccMenuTriggerEvent;
  data?: any;
  pathMatch?: 'exact' | 'start' = 'exact';

  _expanded?: boolean;
  _parent?: IccMenuItem;

  static getParents(item: IccMenuItem): IccMenuItem[] {
    const parents = [];

    let parent = item._parent;
    while (parent) {
      parents.unshift(parent);
      parent = parent._parent;
    }

    return parents;
  }

  static isParent(item: IccMenuItem, child: IccMenuItem): boolean {
    return child._parent ? child._parent === item || this.isParent(item, child._parent) : false;
  }
}
