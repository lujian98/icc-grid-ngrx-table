import {
  ChangeDetectionStrategy,
  Component,
  ChangeDetectorRef,
  inject,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
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
import { IccFieldsViewComponent, IccFieldsetComponent } from '@icc/ui/fields';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IccFormFacade } from '../+state/form.facade';
import { IccFormConfig } from '../models/form.model';

@Component({
  selector: 'icc-form-view',
  templateUrl: './form-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, IccFieldsetComponent, IccFieldsViewComponent],
})
export class IccFormViewComponent {
  private changeDetectorRef = inject(ChangeDetectorRef);
  private _formFields: any[] = [];
  private _values: any;

  @Input() formConfig!: IccFormConfig;
  @Input()
  set formFields(val: any[]) {
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

  private addFormControls(formFields: any[]): void {
    formFields.forEach((field) => {
      if (field.fieldType === 'fieldset') {
        this.addFormControls(field.formFields);
      } else if (!this.form.get(field.fieldName)) {
        this.form.addControl(field.fieldName, new FormControl<string>('', []));
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
