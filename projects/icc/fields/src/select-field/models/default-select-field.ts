import { IccObjectType } from '@icc/ui/core';
import { IccSelectFieldConfig, IccSelectFieldState } from './select-field.model';
import { defaultBaseField } from '../../models/base-field.model';

export const defaultSelectFieldConfig: IccSelectFieldConfig = {
  fieldId: '191cf2bb6b5', // auto generated unique id
  fieldType: IccObjectType.Select,
  fieldName: 'selectfield', // form field name need set
  urlKey: 'select', // Only for remote field config and options
  viewportReady: false,
  fieldLabel: undefined,
  remoteConfig: false, // remote config requires remote options
  remoteOptions: false,
  selectOnly: true, // false select, true autocomplete
  multiSelection: false,
  checkAll: true,
  uncheckAll: true,
  isEmpty: true,
  notEmpty: true,
  singleListOption: false,
  optionLabel: 'title',
  optionKey: 'name',
  //virtualScroll: true,
  ...defaultBaseField,
};

export const defaultSelectFieldState: IccSelectFieldState = {
  fieldConfig: defaultSelectFieldConfig,
  options: [],
};
