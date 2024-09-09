import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IccSelectFieldConfig, SelectFieldComponent, defaultSelectFieldConfig } from '@icc/ui/form-field';
import { State, STATES } from '../../../data/states';

@Component({
  selector: 'app-simple-select',
  templateUrl: './simple-select.component.html',
  styleUrls: ['./simple-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, SelectFieldComponent],
})
export class AppSimpleSelectComponent {
  states = STATES;
  singleSelection: IccSelectFieldConfig = {
    ...defaultSelectFieldConfig,
    fieldLabel: 'Single Selection (Object)',
    optionLabel: 'state',
    optionKey: 'abbr',
    placeholder: 'Select One...',
  };

  multiSelection: IccSelectFieldConfig = {
    ...defaultSelectFieldConfig,
    multiSelection: true,
    fieldLabel: 'Multi Selection (Object)',
    optionLabel: 'state',
    optionKey: 'abbr',
    placeholder: 'Select One or More...',
  };

  singleAutocomplete: IccSelectFieldConfig = {
    ...defaultSelectFieldConfig,
    selectOnly: false,
    fieldLabel: 'Single Autocomplete (Object)',
    optionLabel: 'state',
    optionKey: 'abbr',
    placeholder: 'Select One...',
  };

  multiAutocomplete: IccSelectFieldConfig = {
    ...defaultSelectFieldConfig,
    multiSelection: true,
    selectOnly: false,
    fieldLabel: 'Multi Autocomplete (Object)',
    optionLabel: 'state',
    optionKey: 'abbr',
    placeholder: 'Select One or More...',
  };

  listStates = [...STATES].map((state) => state.state);

  selectState = 'Louisiana';

  singleSelectionList: IccSelectFieldConfig = {
    ...defaultSelectFieldConfig,
    singleListOption: true,
    fieldLabel: 'Single Selection (list)',
    placeholder: 'Select One...',
  };

  multiSelectionList: IccSelectFieldConfig = {
    ...defaultSelectFieldConfig,
    singleListOption: true,
    multiSelection: true,
    fieldLabel: 'Multi Selection (list)',
    placeholder: 'Select One or More...',
  };

  singleAutocompleteList: IccSelectFieldConfig = {
    ...defaultSelectFieldConfig,
    singleListOption: true,
    selectOnly: false,
    fieldLabel: 'Single Autocomplete (list)',
    placeholder: 'Select One...',
  };

  multiAutocompleteList: IccSelectFieldConfig = {
    ...defaultSelectFieldConfig,
    singleListOption: true,
    multiSelection: true,
    selectOnly: false,
    fieldLabel: 'Multi Autocomplete (list)',
    placeholder: 'Select One or More...',
  };

  constructor() {
    //console.log(' listStates=', this.listStates)
  }
}

/*
  fieldName: 'selectfield', // form field name need set
  urlKey: 'select', // Only for remote field config and options

  remoteOptions: false,



  placeholder: '',
};
*/
