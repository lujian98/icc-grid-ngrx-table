export enum IccButtonType {
  Add = 'Add',
  ClearAllFilters = 'ClearAllFilters',
  CollapseAll = 'CollapseAll',
  Edit = 'Edit',
  ExpandAll = 'ExpandAll',
  Refresh = 'Refresh',
  Remove = 'Remove',
  Reset = 'Reset',
  View = 'View',
  Save = 'Save',
  UploadFile = 'UploadFile',
}

export interface IccButtonConfg {
  name: string;
  title: string;
  icon?: string;
  disabled?: boolean;
  hidden?: boolean;
  link?: string;
}

export const IccBUTTONS = {
  Add: {
    name: IccButtonType.Add,
    title: 'ICC.UI.ACTIONS.ADD',
    icon: 'plus',
  },
  ClearAllFilters: {
    name: IccButtonType.ClearAllFilters,
    title: 'ICC.UI.ACTIONS.CLEAR_ALL_FILTERS',
    icon: 'pen-to-square', // TODO icon
  },
  CollapseAll: {
    name: IccButtonType.CollapseAll,
    title: 'Collapse All',
    icon: 'plus',
  },
  Edit: {
    name: IccButtonType.Edit,
    title: 'ICC.UI.ACTIONS.EDIT',
    icon: 'pen-to-square',
  },
  ExpandAll: {
    name: IccButtonType.ExpandAll,
    title: 'Expand All',
    icon: 'plus',
  },
  Remove: {
    name: IccButtonType.Remove,
    title: 'ICC.UI.ACTIONS.REMOVE',
    icon: 'trash',
  },
  Refresh: {
    name: IccButtonType.Refresh,
    title: 'ICC.UI.ACTIONS.REFRESH',
    icon: 'refresh',
  },
  Reset: {
    name: IccButtonType.Reset,
    title: 'ICC.UI.ACTIONS.RESET',
    icon: 'right-left',
  },
  Save: {
    name: IccButtonType.Save,
    title: 'ICC.UI.ACTIONS.SAVE',
    icon: 'floppy-disk',
  },
  UploadFile: {
    name: IccButtonType.UploadFile,
    title: 'ICC.UI.ACTIONS.UPLOAD_FILE',
    icon: 'pen-to-square', // TODO icon
  },
  View: {
    name: IccButtonType.View,
    title: 'ICC.UI.ACTIONS.VIEW',
    icon: 'glasses',
  },
};
