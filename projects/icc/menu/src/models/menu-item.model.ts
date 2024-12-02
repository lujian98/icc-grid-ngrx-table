import { IccIconConfig } from '@icc/ui/icon';
import { Params } from '@angular/router';

export interface IccMenuItem {
  name: string;
  title?: string;
  selected?: boolean;
  hidden?: boolean;
  disabled?: boolean;
  icon?: string | IccIconConfig;
  link?: string;
  queryParams?: Params;
  routerOptions?: any;
  checkbox?: boolean;
  checked?: boolean;
  separator?: boolean;

  children?: IccMenuItem[];
}
