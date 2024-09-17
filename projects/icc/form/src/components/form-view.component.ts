import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { TextFieldComponent } from '@icc/ui/fields';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IccFormConfig } from '../models/form.model';

@Component({
  selector: 'icc-form-view',
  templateUrl: './form-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TextFieldComponent],
})
export class IccFormViewComponent {
  private _formFields: any[] = [];

  @Input() formConfig!: IccFormConfig; // TODO readonly or edit???

  @Input()
  set formFields(val: any[]) {
    this._formFields = val;
    this.formFields.forEach((field) => {
      if (!this.form.get(field.fieldName)) {
        this.form.addControl(field.fieldName, new FormControl<string>('', []));
      }
    });
  }
  get formFields(): any[] {
    return this._formFields;
  }

  // const formControl = this.employeeForm.get(field);

  @Input()
  set values(values: any) {
    this.form.patchValue({ ...values });
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
