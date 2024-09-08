import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IccSelectFieldConfig, SelectFieldComponent, defaultSelectFieldConfig } from '@icc/ui/form-field';
import { State, STATES } from '../../../data/states';

@Component({
  selector: 'app-simple-select',
  templateUrl: './simple-select.component.html',
  styleUrls: ['./simple-select.component.scss'],
  //styles: [':host { width: 100%; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, SelectFieldComponent],
})
export class AppSimpleSelectComponent {
  states = STATES;
  singleSelection: IccSelectFieldConfig = {
    ...defaultSelectFieldConfig,
    fieldLabel: 'Single Selection',
    optionLabel: 'state',
    optionKey: 'abbr',
    placeholder: 'Select One...',
  };

  multiSelection: IccSelectFieldConfig = {
    ...defaultSelectFieldConfig,
    multiSelection: true,
    fieldLabel: 'Multi Selection',
    optionLabel: 'state',
    optionKey: 'abbr',
    placeholder: 'Select One or More...',
  };

  singleAutocomplete: IccSelectFieldConfig = {
    ...defaultSelectFieldConfig,
    selectOnly: false,
    fieldLabel: 'Single Autocomplete',
    optionLabel: 'state',
    optionKey: 'abbr',
    placeholder: 'Select One...',
  };

  multiAutocomplete: IccSelectFieldConfig = {
    ...defaultSelectFieldConfig,
    multiSelection: true,
    selectOnly: false,
    fieldLabel: 'Multi Autocomplete',
    optionLabel: 'state',
    optionKey: 'abbr',
    placeholder: 'Select One or More...',
  };
}

/*
  fieldName: 'selectfield', // form field name need set
  urlKey: 'select', // Only for remote field config and options

  remoteOptions: false,



  placeholder: '',
};
*/
