import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IccSelectFieldConfig, IccSelectFieldComponent, defaultSelectFieldConfig } from '@icc/ui/fields';
import { State, STATES } from '../../../../data/states';

@Component({
  selector: 'app-string-array',
  templateUrl: './string-array.component.html',
  styleUrls: ['./string-array.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IccSelectFieldComponent],
})
export class AppStringArrayComponent {
  listStates = [...STATES].map((state) => state.state);

  singleListState = 'Louisiana';

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
  multiListStates = ['Louisiana', 'Nevada'];

  constructor() {
    //  console.log( ' listStates=', this.listStates)
  }
}
