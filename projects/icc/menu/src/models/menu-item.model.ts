import { IsActiveMatchOptions, Params } from '@angular/router';
import { IccIconConfig } from '@icc/ui/icon';

export interface IccMenuConfig {
  name: string;
  title?: string;
  selected?: boolean;
  hidden?: boolean;
  disabled?: boolean;
  icon?: string | IccIconConfig;
  link?: string;
  queryParams?: Params;
  routerOptions?: { exact: boolean } | IsActiveMatchOptions;
  checkbox?: boolean;
  checked?: boolean;
  separator?: boolean; // TODO need menu-item-separator class

  keepOpen?: boolean; // for cdk-menus not fully working
  children?: IccMenuConfig[];
}
