import { IccTabConfig } from '../models/tabs.model';

export function getSelectedTabIndex(tabs: IccTabConfig[], prevActive: IccTabConfig, selectedIndex: number): number {
  if (tabs.length === 0) {
    return 0;
  }
  const findPrevActive = tabs.findIndex((item) => item.name === prevActive.name);
  if (findPrevActive === -1 || findPrevActive !== selectedIndex) {
    return 0;
  }
  return findPrevActive;
}
