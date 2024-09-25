import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IccFormComponent, defaultFormConfig } from '@icc/ui/form';
import { IccCheckboxComponent } from '@icc/ui/checkbox';
import { IccCalendarModule, IccLocaleDatePipe } from '@icc/ui/calendar';
import { IccFormFieldComponent, IccLabelDirective, IccSuffixDirective } from '@icc/ui/form-field';
import {
  IccNumberFieldComponent,
  defaultNumberFieldConfig,
  IccDisplayFieldComponent,
  IccCheckboxFieldComponent,
  IccHiddenFieldComponent,
  IccDateFieldComponent,
  IccDisplayFieldConfig,
  defaultDisplayFieldConfig,
  IccTextFieldComponent,
  IccTextareaFieldComponent,
} from '@icc/ui/fields';

@Component({
  selector: 'app-theme-form',
  templateUrl: './theme-form.component.html',
  styleUrls: ['./theme-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    IccFormComponent,
    ReactiveFormsModule,
    IccNumberFieldComponent,
    IccCheckboxFieldComponent,
    IccDateFieldComponent,
    IccDisplayFieldComponent,
    IccHiddenFieldComponent,
    IccCheckboxComponent,
    IccCalendarModule,
    IccLocaleDatePipe,
    IccFormFieldComponent,
    IccLabelDirective,
    IccSuffixDirective,
    IccTextFieldComponent,
    IccTextareaFieldComponent,
  ],
})
export class AppThemeFormDemoComponent {
  checked = true;

  numberConfig = {
    //...defaultNumberFieldConfig,
    fieldLabel: 'Number Field',
  };
  numberValue = 50;

  displayConfig = {
    fieldLabel: 'Display Field',
  };
  diaplayValue = 'Test Display field';

  checkboxConfig = {
    fieldLabel: 'Checkbox Field',
  };
  checkboxValue = true;

  hiddenConfig = {
    fieldName: 'hidden67',
  };
  hiddenValue = 'H773333';

  datepickerControl = new FormControl();
  showcaseForm = new FormGroup({});

  dateConfig = {
    fieldName: 'date77',
    fieldLabel: 'Date Field',
  };
  dateValue = new Date();

  textConfig = {
    fieldLabel: 'Text Field',
  };
  textValue = 'text value 222';

  textareaConfig = {
    fieldLabel: 'Textarea Field',
  };
  textareaValue = 'This is textarea value 222';
}
