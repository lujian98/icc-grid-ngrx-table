import { ChangeDetectionStrategy, Component, HostBinding, Input, ElementRef } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

//import { SunUtils } from '../utils/utils';

//export type SunButtonSize = 'medium' | 'standard';
//export type SunButtonStatus = 'default' | 'primary' | 'danger';

@Component({
  selector: 'button[icc-button], a[icc-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IccButtonComponent {
  //@Input() size: SunButtonSize = 'standard';
 // @Input() status: SunButtonStatus = 'default';
  @Input() appearance!: string;

  /*
  @HostBinding('class.size-medium')
  get medium() {
    return this.size === 'medium';
  }

  @HostBinding('class.size-standard')
  get standard() {
    return this.size === 'standard';
  }

  @HostBinding('class.status-default')
  get default() {
    return this.status === 'default';
  }

  @HostBinding('class.status-primary')
  get primary() {
    return this.status === 'primary';
  }

  @HostBinding('class.status-danger')
  get danger() {
    return this.status === 'danger';
  }*/

  @Input()
  @HostBinding('class.appearance-ghost')
  get ghost(): boolean {
    return this.appearance === 'ghost';
  }
  set ghost(value: boolean) {
    if (coerceBooleanProperty(value)) {
      this.appearance = 'ghost';
    }
  }

  /*
  @HostBinding('class.icon-start')
  get iconLeft(): boolean {
    const el = this.elementRef.nativeElement;
    const icon = this.firstIconElement;
    const childrenCount = SunUtils.children(el).length;
    return !!(icon && SunUtils.firstChild(el) === icon && childrenCount > 1);
  }

  @HostBinding('class.icon-end')
  get iconRight(): boolean {
    const el = this.elementRef.nativeElement;
    const icon = this.lastIconElement;
    const iconCount = this.iconElements.length;
    const childrenCount = SunUtils.children(el).length;
    return !!(icon && SunUtils.lastChild(el) === icon && childrenCount > iconCount);
  }*/

  constructor(protected elementRef: ElementRef<HTMLElement>) {}

  /*
  protected get iconElements() {
    const el = this.elementRef.nativeElement;
    return el.querySelectorAll('sun-icon');
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
