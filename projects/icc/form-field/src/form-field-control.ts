import { NgControl } from '@angular/forms';

export abstract class IccFormFieldControlDirective<T> {
  readonly ngControl!: NgControl | null;
  focused = false;
  errorState!: boolean;

  abstract value: T | null;
  abstract disabled: boolean;
  abstract required: boolean;
  onContainerClick(event: MouseEvent): void {}
}
