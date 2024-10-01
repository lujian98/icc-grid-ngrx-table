import { ChangeDetectionStrategy, Component, HostBinding, Input, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

//import { IccUtils } from '../utils/utils';

//export type IccButtonSize = 'medium' | 'standard';
export type IccButtonStatus = 'default' | 'primary' | 'danger';

@Component({
  selector: 'button[icc-button], a[icc-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class IccButtonComponent {
  //@Input() size: IccButtonSize = 'standard';
  @Input() status: IccButtonStatus = 'default';
  @Input() appearance!: string;

  @HostBinding('class.status-default')
  get default() {
    return this.status === 'default';
  }
  /*
  @HostBinding('class.size-medium')
  get medium() {
    return this.size === 'medium';
  }

  @HostBinding('class.size-standard')
  get standard() {
    return this.size === 'standard';
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
    const childrenCount = IccUtils.children(el).length;
    return !!(icon && IccUtils.firstChild(el) === icon && childrenCount > 1);
  }

  @HostBinding('class.icon-end')
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
