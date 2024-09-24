export interface IccCheckboxFieldConfig {
  fieldType: string;
  fieldName?: string;
  fieldLabel?: string;
}

export const defaultCheckboxFieldConfig: IccCheckboxFieldConfig = {
  fieldType: 'checkbox',
  fieldName: 'checkboxfield',
};
