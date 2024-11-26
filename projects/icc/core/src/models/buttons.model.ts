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
  UploadFile: {
    name: IccButtonType.UploadFile,
    title: 'ICC.UI.ACTIONS.UPLOAD_FILE',
    icon: 'pen-to-square',
  },
  Reset: {
    name: IccButtonType.Reset,
    title: 'ICC.UI.ACTIONS.RESET',
    icon: 'right-left',
  },
};

export const buttons: IccButtonConfg[] = [
  {
    name: IccButtonType.Edit,
    title: 'Edit',
    icon: 'pen-to-square',
  },
  {
    name: IccButtonType.Refresh,
    title: 'Refresh',
    icon: 'refresh',
  },
  {
    name: IccButtonType.Save,
    title: 'Save',
    icon: 'floppy-disk',
  },
  {
    name: IccButtonType.Reset,
    title: 'Reset',
    icon: 'right-left',
  },
  {
    name: IccButtonType.View,
    title: 'View',
    icon: 'glasses',
  },
];
