import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'icc-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  standalone: true,
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
  private _disabled = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(disabled: boolean) {
    this._disabled = disabled;
    // this.cd.markForCheck();
  }

  registerOnChange(fn: any): void {
    //this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    //this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: boolean): void {
    this.checked = value;

    //Fix for issue where we reference .detectChanges
    //on a destroyed view (such as when toggling control
    //enabled/disabled from a parent form group)
    //https://github.com/SAP/fundamental-ngx/issues/2364
    /*
    if (!(this.changeDetector as any).destroyed) {
      this.changeDetector.detectChanges();
    }*/
  }
}
