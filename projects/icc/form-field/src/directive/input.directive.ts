import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: 'input[iccInput], textarea[iccInput]',
  standalone: true,
})
export class IccInputDirective {
  private _inputValueAccessor: { value: any };

  set value(value: string) {
    if (this.value !== value) {
      this._inputValueAccessor.value = value;
    }
  }

  get value(): string {
    return this._inputValueAccessor.value;
  }

  constructor(private _elementRef: ElementRef<HTMLInputElement | HTMLTextAreaElement>) {
    this._inputValueAccessor = this._elementRef.nativeElement;
  }
}
