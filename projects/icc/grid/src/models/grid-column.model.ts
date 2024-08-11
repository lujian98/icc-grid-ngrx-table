
export interface IccColumnConfig {
  //header?: string;
  name: string;
  title?: string;
  //field: string;
  fieldType?: string; // | SunFieldType | SunTextFieldType | SunNumberFieldType | SunSelectFieldType;
  //index?: number;
  hidden?: boolean | string; // column hidden: 'always' will hide always, 'never' will visible always
  //validations?: SunValidation[];
  width?: number;
  fixedWidth?: boolean | 'auto';
  minWidth?: number;
  draggable?: boolean;
  align?: string;
  dateFormat?: string;
  dateRangePreset?: boolean;
}
