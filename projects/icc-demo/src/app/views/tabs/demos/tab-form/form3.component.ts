import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IccTextFieldComponent, IccTextFieldConfig, defaultTextFieldConfig } from '@icc/ui/fields';

@Component({
  selector: 'app-form3',
  template: `<icc-text-field [fieldConfig]="fieldConfig" [form]="form"> </icc-text-field>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IccTextFieldComponent, FormsModule, ReactiveFormsModule],
})
export class AppForm3Component implements OnInit {
  form!: FormGroup;
  fieldConfig: IccTextFieldConfig = {
    ...defaultTextFieldConfig,
    fieldName: 'fieldTest3',
    fieldLabel: 'Field Test 3',
    labelWidth: 60,
    clearValue: true,
    editable: true,
  };

  ngOnInit(): void {}
}
