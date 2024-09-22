import {
  Component,
  forwardRef,
  ChangeDetectorRef,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  Directive,
  HostBinding,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

import { CommonModule } from '@angular/common';
import { IccIconModule } from '@icc/ui/icon';

@Directive({
  selector: '[ghost]',
})
export class GhostCheckboxDirective {
  @HostBinding('class.ghost-checkbox')
  private ghostCheckbox: boolean = true;
}

@Component({
  selector: 'icc-checkbox2',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  standalone: true,
  imports: [CommonModule, IccIconModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IccCheckbox2Component),
      multi: true,
    },
  ],
})
export class IccCheckbox2Component implements ControlValueAccessor {
  private _checked = false;
  private _disabled = false;
  private _indeterminate = false;
  @ViewChild('inputEl') inputEl!: ElementRef;

  @Output() change = new EventEmitter<boolean>();

  protected onChange = (value: any) => {};
  protected onTouched = () => {};

  @Input()
  get checked(): boolean {
    return this._checked;
  }
  set checked(value: boolean) {
    this._checked = value;
  }

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
  }

  @Input()
  get indeterminate(): boolean {
    return this._indeterminate;
  }
  set indeterminate(value: boolean) {
    this._indeterminate = coerceBooleanProperty(value);
  }

  constructor(private readonly changeDetector: ChangeDetectorRef) {}

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

    //Fix for issue where we reference .detectChanges
    //on a destroyed view (such as when toggling control
    //enabled/disabled from a parent form group)
    //https://github.com/SAP/fundamental-ngx/issues/2364
    if (!(this.changeDetector as any).destroyed) {
      this.changeDetector.detectChanges();
    }
  }

  updateValueAndIndeterminate(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.checked = input.checked;
    this.change.emit(this.checked);
    this.onChange(this.checked);
    this.indeterminate = input.indeterminate;
  }

  focus(): void {
    this.inputEl.nativeElement.focus();
  }
}
