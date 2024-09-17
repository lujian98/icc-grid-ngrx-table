export interface IccTextFieldConfig {
  fieldType: string;
  fieldName: string;
  fieldLabel?: string;
  placeholder?: string;
}

export const defaultTextFieldConfig: IccTextFieldConfig = {
  fieldType: 'text',
  fieldName: 'textfield',
  placeholder: '',
};
