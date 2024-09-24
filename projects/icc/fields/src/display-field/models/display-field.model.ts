export interface IccDisplayFieldConfig {
  fieldType: string;
  fieldName?: string;
  fieldLabel?: string;
}

export const defaultDisplayFieldConfig: IccDisplayFieldConfig = {
  fieldType: 'display',
  fieldName: 'displayfield',
};
