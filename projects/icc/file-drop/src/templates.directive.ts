import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[icc-file-drop-content-tmp]' })
export class IccFileDropContentTemplateDirective {
  constructor(public template: TemplateRef<any>) {}
}
