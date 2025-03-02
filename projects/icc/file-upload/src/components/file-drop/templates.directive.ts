import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[icc-file-drop-content-tmp]',
})
export class IccFileDropContentTemplateDirective<T> {
  constructor(public template: TemplateRef<T>) {}
}
