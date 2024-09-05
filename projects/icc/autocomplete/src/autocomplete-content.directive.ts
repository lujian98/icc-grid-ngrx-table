import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[iccAutocompleteContent]',
  standalone: true,
})
export class IccAutocompleteContentDirective {
  constructor(public tpl: TemplateRef<any>) {}
}
