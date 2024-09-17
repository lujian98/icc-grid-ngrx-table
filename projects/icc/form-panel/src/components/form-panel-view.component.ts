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

@Component({
  selector: 'icc-form-panel-view',
  templateUrl: './form-panel-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TextFieldComponent],
})
export class IccFormPanelViewComponent {
  private _fieldConfigs: any[] = [];

  @Input()
  set fieldConfigs(val: any[]) {
    this._fieldConfigs = val;
    this.fieldConfigs.forEach((field) => {
      this.form.addControl(field.fieldName, new FormControl<string>('', []));
    });
  }
  get fieldConfigs(): any[] {
    return this._fieldConfigs;
  }

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
    console.log(' field=', field);
    console.log(' value=', field?.value);
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
