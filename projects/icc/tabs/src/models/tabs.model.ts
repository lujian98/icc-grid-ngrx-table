import { IccPortalContent } from '@icc/ui/portal';

export interface IccTabConfig {
  name: string;
  title?: string;
  content?: IccPortalContent<any>;
  context?: {};
}
