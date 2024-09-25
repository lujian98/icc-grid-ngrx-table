import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IccFieldsComponent, IccFieldsetComponent, IccFieldsetConfig, IccFormField } from '@icc/ui/fields';
import { IccFormLabelWidthDirective } from '@icc/ui/form-field';
import { IccFormConfig } from '../models/form.model';

@Component({
  selector: 'icc-form-view',
  templateUrl: './form-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IccFieldsetComponent,
    IccFormLabelWidthDirective,
    IccFieldsComponent,
  ],
})
export class IccFormViewComponent {
  private changeDetectorRef = inject(ChangeDetectorRef);
  private _formFields: IccFormField[] = [];
  private _values: any;

  @Input() formConfig!: IccFormConfig;
  @Input()
  set formFields(val: IccFormField[]) {
    console.log(' 111 formFields=', val);
    this._formFields = val;
    this.addFormControls(this.formFields);

    if (this.formConfig.remoteFieldsConfig && !this.formConfig.remoteFormData) {
      this.form.patchValue({ ...this.values });
    }
  }
  get formFields(): any[] {
    return this._formFields;
  }

  private addFormControls(formFields: IccFormField[]): void {
    formFields.forEach((field) => {
      if (field.fieldType === 'fieldset') {
        this.addFormControls((field as IccFieldsetConfig).formFields);
      } else if (!this.form.get(field.fieldName!)) {
        this.form.addControl(field.fieldName!, new FormControl<string>('', []));
      }
    });
  }

  @Input()
  set values(values: any) {
    this._values = values;
    if (this.form) {
      this.form.patchValue({ ...values });
    }
    //this.changeDetectorRef.markForCheck();
  }
  get values(): any {
    return this._values;
  }

  form: FormGroup = new FormGroup({});

  constructor() {}

  trackByIndex(index: number): number {
    return index;
  }
  //@Output() submitEvent = new EventEmitter<Proxy>();

  checkForm(): void {
    console.log(' form=', this.form);
    const field = this.form.get('userName');
    console.log(' values =', this.form.value);
  }

  submit(): void {
    if (this.form.valid) {
      /*
      this.isLoading = true;
      this.submitEvent.emit({
        ...this.form.value,
      });*/
    }
  }
}
