import { Directive, ElementRef, Optional, Self, DoCheck, Input, HostBinding, HostListener } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { NgControl, NgForm, FormGroupDirective } from '@angular/forms';
import { IccFormFieldControlDirective } from '../form-field-control';
//import { IccFormFieldControlDirective } from '@icc/ui/form-field';

@Directive({
  selector: 'input[iccInput], textarea[iccInput]',
  standalone: true,
  providers: [{ provide: IccFormFieldControlDirective, useExisting: IccInputDirective }],
})
export class IccInputDirective extends IccFormFieldControlDirective<any> implements DoCheck {
  private _disabled: boolean = false;
  private _fullWidth = false;
  private _inputValueAccessor: { value: any };
  private _required: boolean = false;

  @Input() appearance!: string;

  get value(): string {
    return this._inputValueAccessor.value;
  }
  set value(value: string) {
    if (this.value !== value) {
      console.log(' this._inputValueAccessor=', this._inputValueAccessor);
      this._inputValueAccessor.value = value;
    }
  }

  @Input()
  @HostBinding('class.input-full-width')
  get fullWidth(): boolean {
    return this._fullWidth;
  }
  set fullWidth(value: boolean) {
    this._fullWidth = coerceBooleanProperty(value);
  }

  @Input()
  get disabled(): boolean {
    if (this.ngControl?.disabled !== null) {
      return !!this.ngControl?.disabled;
    }

    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    if (this.focused) {
      this.focused = false;
    }
  }

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
  }

  @Input()
  @HostBinding('class.appearance-ghost')
  get ghost(): boolean {
    return this.appearance === 'ghost';
  }
  set ghost(val: boolean) {
    if (coerceBooleanProperty(val)) {
      this.appearance = 'ghost';
    }
  }
  constructor(
    protected _elementRef: ElementRef<HTMLInputElement | HTMLTextAreaElement>,
    @Optional() @Self() override ngControl: NgControl,
    @Optional() public _parentForm: NgForm,
    @Optional() public _parentFormGroup: FormGroupDirective,
  ) {
    super();
    const element = this._elementRef.nativeElement;
    this._inputValueAccessor = element;
    this.trimValueAccessor();
  }

  ngDoCheck() {
    if (this.ngControl) {
      const parent = this._parentFormGroup || this._parentForm;
      this.errorState = !!(this.ngControl?.invalid && (this.ngControl?.dirty || parent?.submitted));
    }
  }

  focus(options?: FocusOptions): void {
    this._elementRef.nativeElement.focus(options);
  }

  @HostListener('mouseenter') onHover() {
    this.focused = true;
  }

  @HostListener('mouseleave') onLeave() {
    this.focused = false;
  }

  @HostListener('blur') onBlur() {
    this.focused = false;
  }

  @HostListener('click', ['$event']) onClick(event: MouseEvent) {
    this.focused = false;
  }

  override onContainerClick(): void {
    if (!this.focused) {
      this.focus();
      this.focused = true;
    } else {
      this.focused = false;
    }
  }

  private trimValueAccessor() {
    if (this.ngControl?.valueAccessor) {
      const valueAccessor = this.ngControl.valueAccessor;
      const original = valueAccessor.registerOnChange;
      valueAccessor.registerOnChange = (fn: (_: string) => void) => {
        return original.call(valueAccessor, (value: string) => {
          return fn(typeof value === 'string' ? value.trim() : value);
        });
      };
    }
  }
}
