import { Directive, InjectionToken, TemplateRef, inject } from '@angular/core';

// used in tab-groups.ts
export const ICC_TAB_CONTENT = new InjectionToken<IccTabContent>('IccTabContent');

@Directive({
  selector: '[iccTabContent]',
  providers: [{ provide: ICC_TAB_CONTENT, useExisting: IccTabContent }],
})
export class IccTabContent {
  template = inject<TemplateRef<any>>(TemplateRef);

  constructor(...args: unknown[]);
  constructor() {}
}
