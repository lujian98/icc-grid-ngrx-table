export enum IccObjectType {
  Component = 'component',
  Checkbox = 'checkbox',
  Date = 'date',
  Display = 'display',
  DateRange = 'dateRange',
  Fieldset = 'fieldset',
  Function = 'function',
  Hidden = 'hidden',
  Image = 'image',
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
