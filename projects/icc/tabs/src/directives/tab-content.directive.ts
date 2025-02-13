import { Directive, InjectionToken, TemplateRef, inject } from '@angular/core';

export const ICC_TAB_CONTENT = new InjectionToken<IccTabContentDirective>('IccTabContent');

@Directive({
  selector: '[iccTabContent]',
  providers: [{ provide: ICC_TAB_CONTENT, useExisting: IccTabContentDirective }],
})
export class IccTabContentDirective {
  template = inject<TemplateRef<any>>(TemplateRef);

  constructor(...args: unknown[]);
  constructor() {}
}
