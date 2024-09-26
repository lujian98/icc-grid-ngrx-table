import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  forwardRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  NG_VALIDATORS,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Component({
  selector: 'icc-radio',
  styleUrls: ['./radio.component.scss'],
  templateUrl: './radio.component.html',
  //changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IccRadioComponent),
      multi: true,
    },
  ],
})
export class IccRadioComponent implements ControlValueAccessor {
  private _name!: string;
  private _value: any;
  private _checked = false;
  private _disabled = false;
  formControlName = 'group88';
  @Input()
  get name(): string {
    return this._name;
  }
  set name(name: string) {
    if (this._name !== name) {
      this._name = name;
      this.cd.markForCheck();
    }
  }

  @Input()
  get value(): any {
    return this._value;
  }
  set value(value: any) {
    if (this._value !== value) {
      this._value = value;
      this.cd.markForCheck();
    }
  }

  @Input()
  get checked(): boolean {
    return this._checked;
  }
  set checked(checked: boolean) {
    if (this._checked !== checked) {
      this._checked = checked;
      this.cd.markForCheck();
    }
  }

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(disabled: boolean) {
    this._disabled = disabled;
    this.cd.markForCheck();
  }

  @Output() change: EventEmitter<any> = new EventEmitter();

  constructor(protected cd: ChangeDetectorRef) {}

  onChange(event: Event) {
    event.stopPropagation();
    this.checked = true;
    this.change.emit(this.value);
  }

  protected onTouched = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: any): void {
    this._checked = value;
    if (!(this.cd as any).destroyed) {
      this.cd.detectChanges();
    }
  }
}
