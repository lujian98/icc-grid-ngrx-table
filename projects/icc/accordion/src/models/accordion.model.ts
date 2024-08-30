import { IccMenuItem } from '@icc/ui/menu';

export interface IccAccordion {
  name: string;
  title?: string;
  items: IccMenuItem[];
}
