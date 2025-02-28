import { IccMenuConfig } from '@icc/ui/menu';

export interface IccAccordion {
  name: string;
  title?: string;
  items?: IccMenuConfig[];
  expanded?: boolean;
}
