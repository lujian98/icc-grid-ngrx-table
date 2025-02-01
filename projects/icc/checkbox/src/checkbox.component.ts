import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IccIconModule } from '@icc/ui/icon';

@Directive({
  selector: '[ghost]',
  standalone: false,
})
export class GhostCheckboxDirective {
  @HostBinding('class.ghost-checkbox')
  private ghostCheckbox: boolean = true;
}

@Component({
  selector: 'icc-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  imports: [CommonModule, IccIconModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IccCheckboxComponent),
      multi: true,
    },
  ],
})
export class IccCheckboxComponent implements ControlValueAccessor {
  private _checked = false;
  private _disabled = false;
  private _indeterminate = false;
  @ViewChild('inputEl') inputEl!: ElementRef;

  @Output() change = new EventEmitter<boolean>();

  protected onChange = (value: boolean) => {};
  protected onTouched = (value: boolean) => {};

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

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: (value: boolean) => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: boolean): void {
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
    event.stopPropagation();
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
