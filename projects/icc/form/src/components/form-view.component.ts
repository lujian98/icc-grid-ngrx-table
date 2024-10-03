import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { isEqual } from '@icc/ui/core';
import {
  IccFieldsComponent,
  IccFieldsetComponent,
  IccFieldsetConfig,
  IccFormField,
  IccNumberFieldConfig,
  IccTextFieldConfig,
} from '@icc/ui/fields';
import { IccFormLabelWidthDirective } from '@icc/ui/form-field';
import { IccPanelTopBarComponent } from '@icc/ui/panel';
import { IccButtonComponent } from '@icc/ui/button';
import { IccIconModule } from '@icc/ui/icon';
import { Subject, takeUntil } from 'rxjs';
import { IccFormFacade } from '../+state/form.facade';
import { IccFormConfig, IccFormButtonConfg, IccFormButtonType } from '../models/form.model';

@Component({
  selector: 'icc-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IccFieldsetComponent,
    IccFormLabelWidthDirective,
    IccFieldsComponent,
    IccPanelTopBarComponent,
    IccButtonComponent,
    IccIconModule,
  ],
})
export class IccFormViewComponent implements OnInit, OnDestroy {
  private changeDetectorRef = inject(ChangeDetectorRef);
  private formFacade = inject(IccFormFacade);
  private destroy$ = new Subject<void>();
  form: FormGroup = new FormGroup({});
  private _formFields: IccFormField[] = [];
  private _values: any;

  @Input() formConfig!: IccFormConfig;
  @Input()
  set formFields(val: IccFormField[]) {
    this._formFields = val;
    this.addFormControls(this.formFields);

    if (this.formConfig.remoteFieldsConfig && !this.formConfig.remoteFormData) {
      this.form.patchValue({ ...this.values });
    }

    if (this.formConfig.validators) {
      this.form.addValidators(this.formConfig.validators);
    }
    //console.log(' formConfig=', this.formConfig);
  }
  get formFields(): any[] {
    return this._formFields;
  }

  private addFormControls(formFields: IccFormField[]): void {
    formFields.forEach((field) => {
      if (field.fieldType === 'fieldset') {
        this.addFormControls((field as IccFieldsetConfig).formFields);
      } else if (!this.form.get(field.fieldName!)) {
        this.form.addControl(field.fieldName!, new FormControl<string>({ value: '', disabled: !!field.readonly }, []));
        this.setValidators(field);
      }
    });
  }

  private setValidators(field: IccFormField): void {
    const formField = this.form.get(field.fieldName!)!;

    if (field.validators) {
      formField.addValidators(field.validators);
    }

    if (field.required) {
      formField.addValidators(Validators.required);
    }

    if (field.fieldType === 'text' || field.fieldType === 'textarea' || field.fieldType === 'password') {
      const f = field as IccTextFieldConfig;
      if (f.minLength || f.minLength === 0) {
        formField.addValidators(Validators.minLength(f.minLength));
      }
      if (f.maxLength || f.maxLength === 0) {
        formField.addValidators(Validators.maxLength(f.maxLength));
      }
    }

    if (field.fieldType === 'number') {
      const f = field as IccNumberFieldConfig;
      if (f.minValue || f.minValue === 0) {
        formField.addValidators(Validators.min(f.minValue));
      }
      if (f.maxValue || f.maxValue === 0) {
        formField.addValidators(Validators.max(f.maxValue));
      }
    }
  }

  @Input()
  set values(values: any) {
    this._values = values;
    if (this.form) {
      this.form.patchValue({ ...values });
    }
  }
  get values(): any {
    return this._values;
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((values) => this.checkFormValueChanged(values));
  }

  trackByIndex(index: number): number {
    return index;
  }

  private checkFormValueChanged(values: any): void {
    isEqual(values, this.values) ? this.form.markAsPristine() : this.form.markAsDirty();
    this.setFieldDirty(values, this.values);
  }

  private setFieldDirty(values: any, orgValues: any): void {
    Object.keys(values).forEach((key) => {
      const formField = this.form.get(key)!;
      isEqual(values[key], orgValues[key]) ? formField.markAsPristine() : formField.markAsDirty();
    });
  }

  buttonVisible(button: IccFormButtonConfg): boolean {
    switch (button.name) {
      case IccFormButtonType.View:
      case IccFormButtonType.Reset:
      case IccFormButtonType.Save:
        return this.formConfig.editable;
      case IccFormButtonType.Edit:
      default:
        return !this.formConfig.editable;
    }
  }

  buttonDisabled(button: IccFormButtonConfg): boolean {
    switch (button.name) {
      case IccFormButtonType.View:
        return this.form.dirty;
      case IccFormButtonType.Reset:
        return !this.form.dirty;
      case IccFormButtonType.Save:
        return !(this.form.dirty && this.form.valid);
      case IccFormButtonType.Edit:
      default:
        return false;
    }
  }
  buttonClick(button: IccFormButtonConfg): void {
    switch (button.name) {
      case IccFormButtonType.Edit:
        this.editForm();
        break;
      case IccFormButtonType.Refresh:
        this.refreshForm();
        break;
      case IccFormButtonType.View:
        this.viewForm();
        break;
      case IccFormButtonType.Reset:
        this.resetForm();
        break;
      case IccFormButtonType.Save:
        this.saveForm();
        break;
      default:
        break;
    }
  }

  private editForm(): void {
    this.formFacade.setFormEditable(this.formConfig.formId, true);
    this.checkFormValueChanged(this.form.getRawValue());
  }

  private refreshForm(): void {
    //TODO refresh form data
  }

  private viewForm(): void {
    this.formFacade.setFormEditable(this.formConfig.formId, false);
  }

  private resetForm(): void {
    this.form.patchValue({ ...this.values });
  }

  private saveForm(): void {
    console.log(' form=', this.form);
    console.log(' values =', this.form.value);
    console.log(' raw values =', this.form.getRawValue());
    console.log('is form dirty = ', this.form.dirty);
    console.log('is form invalid = ', this.form.invalid);
    if (this.form.valid) {
      /*
      this.isLoading = true;
      this.submitEvent.emit({
        ...this.form.value,
      });*/
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
