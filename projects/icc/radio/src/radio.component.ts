import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'icc-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IccRadioComponent),
      multi: true,
    },
  ],
})
export class IccRadioComponent implements ControlValueAccessor {
  @Input() field!: FormControl;
  @Input() fieldName!: string;
  @Input() value!: string;
  @Input() checked!: boolean;
  @Input() name!: string;
  @Input() required!: boolean;
  private _disabled = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(disabled: boolean) {
    this._disabled = disabled;
  }

  registerOnChange(fn: (value: boolean) => void): void {}

  registerOnTouched(fn: (value: boolean) => void): void {}

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: boolean): void {
    this.checked = value;
  }
}
