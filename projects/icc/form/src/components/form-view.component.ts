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
import { TextFieldComponent } from '@icc/ui/fields';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IccFormFacade } from '../+state/form.facade';
import { IccFormGroupComponent } from './form-group/form-group.component';
import { IccFieldsetComponent } from './fieldset/fieldset.component';
import { IccFormConfig } from '../models/form.model';

@Component({
  selector: 'icc-form-view',
  templateUrl: './form-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IccFormGroupComponent, FormsModule, IccFieldsetComponent],
})
export class IccFormViewComponent {
  private changeDetectorRef = inject(ChangeDetectorRef);
  private _formFields: any[] = [];
  private _values: any;

  @Input() formConfig!: IccFormConfig;
  @Input()
  set formFields(val: any[]) {
    // TODO fieldset here
    this._formFields = val;
    this.formFields.forEach((field) => {
      if (!this.form.get(field.fieldName)) {
        this.form.addControl(field.fieldName, new FormControl<string>('', []));
      }
    });
    if (this.formConfig.remoteFieldsConfig && !this.formConfig.remoteFormData) {
      this.form.patchValue({ ...this.values });
    }
  }
  get formFields(): any[] {
    return this._formFields;
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
