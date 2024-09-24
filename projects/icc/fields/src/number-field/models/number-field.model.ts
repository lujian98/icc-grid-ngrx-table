export interface IccNumberFieldConfig {
  fieldType: string;
  fieldName?: string;
  fieldLabel?: string;
  placeholder?: string;
  clearValue?: boolean;
}

export const defaultNumberFieldConfig: IccNumberFieldConfig = {
  fieldType: 'number',
  fieldName: 'numberfield',
  placeholder: '',
  clearValue: false,
};
