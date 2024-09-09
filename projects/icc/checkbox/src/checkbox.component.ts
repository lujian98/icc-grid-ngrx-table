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
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { IccIconModule } from '@icc/ui/icon';

@Directive({
  selector: '[ghost]',
  standalone: true,
})
export class GhostCheckboxDirective {
  @HostBinding('class.ghost-checkbox')
  private ghostCheckbox: boolean = true;
}

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
  private _checked = false;
  private _disabled = false;
  private _indeterminate = false;
  //@ViewChild('inputEl') inputEl!: ElementRef;

  @Output() change = new EventEmitter<boolean>();
  @Output() onInputClick = new EventEmitter<boolean>();

  protected onChange = (value: any) => {};
  protected onTouched = () => {};

  @Input()
  get checked(): boolean {
    return this._checked;
  }
  set checked(value: boolean) {
    console.log(' 6666666 set checked=', value);
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

  @ViewChild('input') _inputElement!: ElementRef<HTMLInputElement>;

  @ViewChild('label') _labelElement!: ElementRef<HTMLInputElement>;

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

  _onInputClick(event: Event) {
    this._handleInputClick();
    //event.stopPropagation();
    this.onInputClick.emit(this.checked);
  }

  _onInteractionEvent(event: Event) {
    // We always have to stop propagation on the change event.
    // Otherwise the change event, from the input element, will bubble up and
    // emit its event object to the `change` output.
    event.stopPropagation();
  }

  private _handleInputClick() {
    //const clickAction = this._options?.clickAction;

    // If resetIndeterminate is false, and the current state is indeterminate, do nothing on click
    //if (!this.disabled && clickAction !== 'noop') {
    if (!this.disabled) {
      // When user manually click on the checkbox, `indeterminate` is set to false.
      /*
      if (this.indeterminate && clickAction !== 'check') {
        Promise.resolve().then(() => {
          this._indeterminate = false;
          this.indeterminateChange.emit(this._indeterminate);
        });
      }*/

      this._checked = !this._checked;

      // Emit our custom change event if the native input emitted one.
      // It is important to only emit it, if the native input triggered one, because
      // we don't want to trigger a change event, when the `checked` variable changes for example.
      this._emitChangeEvent();
    } /*
    else if (!this.disabled && clickAction === 'noop') {
      // Reset native input when clicked with noop. The native checkbox becomes checked after
      // click, reset it to be align with `checked` value of `mat-checkbox`.
      this._inputElement.nativeElement.checked = this.checked;
      this._inputElement.nativeElement.indeterminate = this.indeterminate;
    }*/
  }

  private _emitChangeEvent() {
    this.onChange(this.checked);
    this.change.emit(this.checked);
    // this.indeterminate = input.indeterminate;
    // this.change.emit(this._createChangeEvent(this.checked));

    // Assigning the value again here is redundant, but we have to do it in case it was
    // changed inside the `change` listener which will cause the input to be out of sync.
    if (this._inputElement) {
      this._inputElement.nativeElement.checked = this.checked;
    }
  }

  _preventBubblingFromLabel(event: MouseEvent) {
    console.log('444444 click =');
    if (!!event.target && this._inputElement.nativeElement.contains(event.target as HTMLElement)) {
      event.stopPropagation();
    } else {
      this._handleInputClick();
    }
    // this._handleInputClick();
  }

  /*
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

  @HostListener('click', ['$event']) onClick(event: MouseEvent) {
    if (!this.disabled && event.type === 'click') {
      //event.stopPropagation();
      this.checked = !this.checked;
      this.change.emit(this.checked);
      this.onChange(this.checked);
    }
  }*/
}
