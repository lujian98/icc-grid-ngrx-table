import { Directive, Input } from '@angular/core';
import { CdkMenuItemSelectable, CdkMenuItem } from '@angular/cdk/menu';

@Directive({
  selector: '[cdkMenuItemCheckbox]',
  exportAs: 'cdkMenuItemCheckbox',
  host: {
    role: 'menuitemcheckbox',
    '[class.cdk-menu-item-checkbox]': 'true',
  },
  providers: [
    { provide: CdkMenuItemSelectable, useExisting: CdkMenuItemCheckbox },
    { provide: CdkMenuItem, useExisting: CdkMenuItemSelectable },
  ],
})
export class CdkMenuItemCheckbox extends CdkMenuItemSelectable {
  /**
   * Toggle the checked state of the checkbox.
   * @param options Options the configure how the item is triggered
   *   - keepOpen: specifies that the menu should be kept open after triggering the item.
   */
  override trigger(options?: { keepOpen: boolean }) {
    super.trigger({
      ...options,
      keepOpen: true,
    });

    super.trigger(options);

    if (!this.disabled) {
      this.checked = !this.checked;
    }
  }
}
