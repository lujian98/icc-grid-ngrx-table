import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IccIconModule } from '@icc/ui/icon';

@Component({
  selector: 'icc-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  standalone: true,
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
  private changeDetectorRef = inject(ChangeDetectorRef);
  private _checked = false;
  private _disabled = false;
  private _indeterminate = false;

  @Output() change = new EventEmitter<boolean>();
  @Output() inputClick = new EventEmitter<boolean>();
  @ViewChild('input') private inputEl!: ElementRef<HTMLInputElement>;
  //@ViewChild('label') private labelEl!: ElementRef<HTMLInputElement>;

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
    if (!(this.changeDetectorRef as any).destroyed) {
      this.changeDetectorRef.detectChanges();
    }
  }

  onInputClick(event: Event): void {
    this.handleInputClick();
    this.inputClick.emit(this.checked);
  }

  onChangeEvent(event: Event): void {
    // We always have to stop propagation on the change event.
    // Otherwise the change event, from the input element, will bubble up and
    // emit its event object to the `change` output.
    event.stopPropagation();
  }

  private handleInputClick(): void {
    if (!this.disabled) {
      this._checked = !this._checked;
      this.onChange(this.checked);
      this.change.emit(this.checked);
      if (this.inputEl) {
        this.inputEl.nativeElement.checked = this.checked;
      }
    }
  }

  preventBubbling(event: MouseEvent): void {
    if (!!event.target && this.inputEl.nativeElement.contains(event.target as HTMLElement)) {
      event.stopPropagation();
    } else {
      this.handleInputClick();
    }
  }
}
