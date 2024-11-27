export enum IccButtonType {
  Edit = 'Edit',
  Refresh = 'Refresh',
  Reset = 'Reset',
  View = 'View',
  Save = 'Save',
  UploadFile = 'UploadFile',
}

export interface IccButtonConfg {
  name: string;
  title: string;
  icon?: string;
}

export const IccBUTTONS = {
  Edit: {
    name: IccButtonType.Edit,
    title: 'ICC.UI.ACTIONS.EDIT',
    icon: 'pen-to-square',
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
    icon: 'pen-to-square',
  },
  View: {
    name: IccButtonType.View,
    title: 'ICC.UI.ACTIONS.VIEW',
    icon: 'glasses',
  },
};
