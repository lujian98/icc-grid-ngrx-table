import { ChangeDetectionStrategy, Component, Input, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

//import { IccUtils } from '../utils/utils';

//export type IccButtonSize = 'medium' | 'standard';
export type IccButtonStatus = 'default' | 'primary' | 'danger';

@Component({
  selector: 'button[icc-button], a[icc-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  host: {
    '[class.status-default]': 'status === "default"',
    '[class.status-primary]': 'status === "primary"',
    '[class.status-danger]': 'status === "danger"',
    '[class.size-medium]': 'size === "medium"',
    '[class.size-standard]': 'size === "standard"',
    '[class.appearance-ghost]': 'appearance === "ghost"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class IccButtonComponent {
  //@Input() size: IccButtonSize = 'standard';
  @Input() status: IccButtonStatus = 'default';
  @Input() appearance!: string;

  get default() {
    return this.status === 'default';
  }
  /*
  get medium() {
    return this.size === 'medium';
  }

  get standard() {
    return this.size === 'standard';
  }

  get primary() {
    return this.status === 'primary';
  }

  @HostBinding('class.status-danger')
  get danger() {
    return this.status === 'danger';
  }*/

  @Input()
  get ghost(): boolean {
    return this.appearance === 'ghost';
  }
  set ghost(value: boolean) {
    if (coerceBooleanProperty(value)) {
      this.appearance = 'ghost';
    }
  }

  /*
 // @HostBinding('class.icon-start')
  get iconLeft(): boolean {
    const el = this.elementRef.nativeElement;
    const icon = this.firstIconElement;
    const childrenCount = IccUtils.children(el).length;
    return !!(icon && IccUtils.firstChild(el) === icon && childrenCount > 1);
  }

  //@HostBinding('class.icon-end')
  get iconRight(): boolean {
    const el = this.elementRef.nativeElement;
    const icon = this.lastIconElement;
    const iconCount = this.iconElements.length;
    const childrenCount = IccUtils.children(el).length;
    return !!(icon && IccUtils.lastChild(el) === icon && childrenCount > iconCount);
  }*/

  constructor(protected elementRef: ElementRef<HTMLElement>) {}

  /*
  protected get iconElements() {
    const el = this.elementRef.nativeElement;
    return el.querySelectorAll('icc-icon');
  }

  protected get firstIconElement() {
    const icons = this.iconElements;
    if (icons.length > 0) {
      return icons[0];
    }
    return null;
  }

  protected get lastIconElement() {
    const icons = this.iconElements;
    if (icons.length > 0) {
      return icons[icons.length - 1];
    }
    return null;
  }*/
}
