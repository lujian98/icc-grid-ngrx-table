export interface IccFieldsetConfig {
  fieldType: string;
  legend?: string;
  formFields: any[];
}

export const defaultFieldsetConfig: IccFieldsetConfig = {
  fieldType: 'text',
  formFields: [],
};
