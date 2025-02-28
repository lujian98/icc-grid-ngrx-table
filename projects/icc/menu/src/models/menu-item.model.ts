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
  separator?: boolean;

  children?: IccMenuConfig[];
}
