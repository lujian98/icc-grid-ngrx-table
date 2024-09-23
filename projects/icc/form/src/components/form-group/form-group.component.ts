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
import { IccFormFacade } from '../../+state/form.facade';
import { IccFormConfig } from '../../models/form.model';

@Component({
  selector: 'icc-form-group',
  templateUrl: './form-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TextFieldComponent],
})
export class IccFormGroupComponent {
  @Input() formConfig!: IccFormConfig;
  @Input() form!: FormGroup;

  private _formFields: any[] = [];

  @Input()
  set formFields(val: any[]) {
    this._formFields = val;
  }
  get formFields(): any[] {
    return this._formFields;
  }

  trackByIndex(index: number): number {
    return index;
  }
}
