import { IccMenuConfig } from '@icc/ui/menu';
import { IccContextMenuType, IccTabConfig } from '../models/tabs.model';

export function contextClickedTabs(
  menu: IccMenuConfig,
  tabs: IccTabConfig[],
  tab: IccTabConfig,
  index: number,
): IccTabConfig[] {
  switch (menu.name) {
    case IccContextMenuType.CLOSE:
      return [...tabs].filter((item) => item.name !== tab.name || !item.closeable);
    case IccContextMenuType.CLOSE_OTHER_TABS:
      return [...tabs].filter((item) => item.name === tab.name || !item.closeable);
    case IccContextMenuType.CLOSE_TABS_TO_THE_RIGHT:
      return [...tabs].filter((item, idx) => idx < index + 1 || !item.closeable);
    case IccContextMenuType.CLOSE_TABS_TO_THE_LEFT:
      const right = [...tabs].slice(index);
      const notCloseable = [...tabs].slice(0, index).filter((item) => !item.closeable);
      return [...notCloseable, ...right];
    case IccContextMenuType.CLOSE_ALL_TABS:
      return [...tabs].filter((item) => !item.closeable);
  }
  return [...tabs];
}
