import { Directive, Input } from '@angular/core';
import { CdkMenuItemSelectable, CdkMenuItem } from '@angular/cdk/menu';

@Directive({
  selector: '[iccMenuItem]',
  exportAs: 'iccMenuItem',
  host: {
    role: 'menuitem',
    '[class.cdk-menu-itemx]': 'true',
  },
  providers: [
    { provide: CdkMenuItemSelectable, useExisting: IccMenuItem },
    { provide: CdkMenuItem, useExisting: CdkMenuItemSelectable },
  ],
})
export class IccMenuItem extends CdkMenuItemSelectable {
  @Input() keepOpen: boolean = false;

  override trigger(options: { keepOpen: boolean } = { keepOpen: false }) {
    super.trigger({
      ...options,
      keepOpen: this.keepOpen,
    });

    if (!this.disabled) {
      this.checked = !this.checked;
    }
  }
}
