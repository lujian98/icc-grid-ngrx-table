import { Directive, InjectionToken, inject } from '@angular/core';
import { CdkPortal } from '@angular/cdk/portal';

export const ICC_TAB_LABEL = new InjectionToken<IccTabLabelDirective>('IccTabLabel');
export const ICC_TAB = new InjectionToken<any>('ICC_TAB');

@Directive({
  selector: '[icc-tab-label], [iccTabLabel]',
  providers: [{ provide: ICC_TAB_LABEL, useExisting: IccTabLabelDirective }],
})
export class IccTabLabelDirective extends CdkPortal {
  _closestTab = inject(ICC_TAB, { optional: true });
}
