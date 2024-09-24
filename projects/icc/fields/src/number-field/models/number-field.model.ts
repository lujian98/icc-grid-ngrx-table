export interface IccNumberFieldConfig {
  fieldType: string;
  fieldName?: string;
  fieldLabel?: string;
  placeholder?: string;
}

export const defaultNumberFieldConfig: IccNumberFieldConfig = {
  fieldType: 'number',
  fieldName: 'numberfield',
  placeholder: '',
};
