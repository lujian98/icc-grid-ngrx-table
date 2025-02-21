export enum IccObjectType {
  Component = 'component', // not field config
  Checkbox = 'checkbox',
  Date = 'date',
  Display = 'display',
  DateRange = 'dateRange',
  Fieldset = 'fieldset',
  Function = 'function', // not field config
  Hidden = 'hidden',
  Image = 'image', // not field config
  Number = 'number',
  Password = 'password',
  RadioGroup = 'radioGroup',
  Select = 'select',
  Text = 'text',
  Textarea = 'textarea',
  UploadFile = 'uploadFile',
}

export interface IccDisabled {
  name: string;
  disabled: boolean;
}
