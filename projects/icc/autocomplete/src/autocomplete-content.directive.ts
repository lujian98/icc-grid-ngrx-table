import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[iccAutocompleteContent]',
})
export class IccAutocompleteContentDirective {
  constructor(public tpl: TemplateRef<any>) {}
}
