export interface IccTextFieldConfig {
  fieldType: string;
  fieldName?: string;
  fieldLabel?: string;
  placeholder?: string;
  clearValue?: boolean;
}

export const defaultTextFieldConfig: IccTextFieldConfig = {
  fieldType: 'text',
  fieldName: 'textfield',
  placeholder: '',
  clearValue: false,
};
