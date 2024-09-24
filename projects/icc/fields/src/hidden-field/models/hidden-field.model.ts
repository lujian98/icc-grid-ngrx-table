export interface IccHiddenFieldConfig {
  fieldType: string;
  fieldName?: string;
}

export const defaultHiddenFieldConfig: IccHiddenFieldConfig = {
  fieldType: 'hidden',
  fieldName: 'hiddenfield',
};
