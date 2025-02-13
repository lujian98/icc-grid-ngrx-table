import { Directive, InjectionToken, inject } from '@angular/core';
import { CdkPortal } from '@angular/cdk/portal';
// used in tab.ts
export const ICC_TAB_LABEL = new InjectionToken<IccTabLabel>('IccTabLabel');
export const ICC_TAB = new InjectionToken<any>('ICC_TAB');

@Directive({
  selector: '[icc-tab-label], [iccTabLabel]',
  providers: [{ provide: ICC_TAB_LABEL, useExisting: IccTabLabel }],
})
export class IccTabLabel extends CdkPortal {
  _closestTab = inject(ICC_TAB, { optional: true });
}
