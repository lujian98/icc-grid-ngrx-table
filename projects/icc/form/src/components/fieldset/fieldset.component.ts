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
import { IccFormGroupComponent } from '../form-group/form-group.component';

@Component({
  selector: 'icc-fieldset',
  templateUrl: './fieldset.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, IccFormGroupComponent],
})
export class IccFieldsetComponent {
  @Input() formConfig!: IccFormConfig;
  @Input() form!: FormGroup;

  private _fieldConfig!: any;

  @Input()
  set fieldConfig(val: any) {
    this._fieldConfig = val;
  }
  get fieldConfig(): any {
    return this._fieldConfig;
  }
}
