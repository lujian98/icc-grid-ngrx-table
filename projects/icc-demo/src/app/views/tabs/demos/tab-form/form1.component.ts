import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IccTextFieldComponent, IccTextFieldConfig, defaultTextFieldConfig } from '@icc/ui/fields';

@Component({
  selector: 'app-form1',
  template: `<icc-text-field [fieldConfig]="fieldConfig" [form]="form"> </icc-text-field>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IccTextFieldComponent, FormsModule, ReactiveFormsModule],
})
export class AppForm1Component implements OnInit {
  form!: FormGroup;
  fieldConfig: IccTextFieldConfig = {
    ...defaultTextFieldConfig,
    fieldName: 'fieldTest1',
    fieldLabel: 'Field Test 1',
    labelWidth: 60,
    clearValue: true,
    editable: true,
  };

  ngOnInit(): void {
    this.form.addControl(
      this.fieldConfig.fieldName!,
      new FormControl<string>({ value: 'Form panel 1', disabled: false }, []),
    );
  }
}
