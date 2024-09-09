import { IccSelectFieldConfig } from '../models/select-field.model';

export const SingleSelectConfig: Partial<IccSelectFieldConfig> = {
  fieldLabel: 'Single Selection (Object)',
  optionLabel: 'state',
  optionKey: 'abbr',
  placeholder: 'Select One...',
};

export const MultiSelectConfig: Partial<IccSelectFieldConfig> = {
  multiSelection: true,
  fieldLabel: 'Multi Selection (Object)',
  optionLabel: 'state',
  optionKey: 'abbr',
  placeholder: 'Select One or More...',
};

export const SingleAutocompleteConfig: Partial<IccSelectFieldConfig> = {
  selectOnly: false,
  fieldLabel: 'Single Autocomplete (Object)',
  optionLabel: 'state',
  optionKey: 'abbr',
  placeholder: 'Select One...',
};

export const MultiAutocompleteConfig: Partial<IccSelectFieldConfig> = {
  multiSelection: true,
  selectOnly: false,
  fieldLabel: 'Multi Autocomplete (Object)',
  optionLabel: 'state',
  optionKey: 'abbr',
  placeholder: 'Select One or More...',
};
