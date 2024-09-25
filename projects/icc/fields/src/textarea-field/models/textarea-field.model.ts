export interface IccTextareaFieldConfig {
  fieldType: string;
  fieldName?: string;
  fieldLabel?: string;
  placeholder?: string;
  clearValue?: boolean;
}

export const defaultTextareaFieldConfig: IccTextareaFieldConfig = {
  fieldType: 'textarea',
  fieldName: 'textareafield',
  placeholder: '',
  clearValue: true,
};
