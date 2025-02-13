import { IccPortalContent } from '@icc/ui/portal';

export interface IccTabConfig<T> {
  name: string;
  title?: string;
  content?: IccPortalContent<T>;
  context?: {};
}
