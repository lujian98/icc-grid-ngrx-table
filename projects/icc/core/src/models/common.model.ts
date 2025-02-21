export enum IccObjectType {
  Checkbox = 'checkbox',
  Date = 'date',
  Display = 'display',
  DateRange = 'dateRange',
  Fieldset = 'fieldset',
  Hidden = 'hidden',
  Image = 'image', // type hold for grid image renderer
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
