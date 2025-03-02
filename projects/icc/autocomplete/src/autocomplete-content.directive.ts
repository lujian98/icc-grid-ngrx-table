import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[iccAutocompleteContent]',
})
export class IccAutocompleteContentDirective<T> {
  constructor(public tpl: TemplateRef<T>) {}
}
