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

/*
multiRemote

 multiRemote: IccSelectFieldConfig = {
    ...defaultSelectFieldConfig,
    remoteOptions: true,
    urlKey: 'usa',
    fieldName: 'state',
    multiSelection: true,
    fieldLabel: 'Multi Selection (Object)',
    optionLabel: 'state',
    optionKey: 'abbr',
    placeholder: 'Select One or More...',
  };

  singleAutocompleteRemotes: IccSelectFieldConfig = {
    ...defaultSelectFieldConfig,
    remoteOptions: true,
    urlKey: 'usa',
    fieldName: 'state',
    selectOnly: false,
    fieldLabel: 'Single Autocomplete (Object)',
    optionLabel: 'state',
    optionKey: 'abbr',
    placeholder: 'Select One...',
  };

  multiAutocompleteRemotes: IccSelectFieldConfig = {
    ...defaultSelectFieldConfig,
    remoteOptions: true,
    urlKey: 'usa',
    fieldName: 'state',
    multiSelection: true,
    selectOnly: false,
    fieldLabel: 'Multi Autocomplete (Object)',
    optionLabel: 'state',
    optionKey: 'abbr',
    placeholder: 'Select One or More...',
  };

  */
