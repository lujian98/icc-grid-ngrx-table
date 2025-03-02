import { IccObjectType } from '@icc/ui/core';
import { IccSelectFieldConfig, IccSelectFieldState, IccSelectFieldSetting } from './select-field.model';
import { defaultBaseField } from '../../models/base-field.model';

export const defaultSelectFieldConfig: IccSelectFieldConfig = {
  fieldType: IccObjectType.Select,
  fieldName: 'selectfield', // form field name need set
  urlKey: 'select', // Only for remote field config and options
  fieldLabel: undefined,
  remoteConfig: false, // remote config requires remote options
  remoteOptions: false,
  selectOnly: true, // false select, true autocomplete
  multiSelection: false,
  checkAll: true,
  uncheckAll: true,
  isEmpty: false,
  notEmpty: false,
  singleListOption: false,
  optionLabel: 'title',
  optionKey: 'name',
  mouseLeaveBlur: false,
  //virtualScroll: true, // only support virtualScroll
  ...defaultBaseField,
};

export const defaultSelectFieldSetting: IccSelectFieldSetting = {
  fieldId: '191cf2bb6b5',
  viewportReady: false,
};

export const defaultSelectFieldState: IccSelectFieldState = {
  fieldConfig: defaultSelectFieldConfig,
  fieldSetting: defaultSelectFieldSetting,
  options: [],
};
