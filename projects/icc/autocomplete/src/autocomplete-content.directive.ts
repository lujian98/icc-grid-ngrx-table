import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[iccAutocompleteContent]',
  standalone: true,
})
export class IccAutocompleteContentDirective<T> {
  constructor(public tpl: TemplateRef<T>) {}
}
