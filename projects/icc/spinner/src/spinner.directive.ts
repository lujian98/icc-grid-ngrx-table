import { Directive, Input, ComponentRef, ViewContainerRef, Renderer2, ElementRef, HostBinding } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { IccSpinnerSize } from './spinner.model';
import { IccSpinnerComponent } from './spinner.component';

@Directive({
  selector: '[iccSpinner]',
})
export class IccSpinnerDirective {
  spinner!: ComponentRef<IccSpinnerComponent>;
  private _message!: string;
  @HostBinding('class.icc-spinner-container') isSpinnerPresent = false;

  @Input('iccSpinnerSize') spinnerSize: IccSpinnerSize = 'medium';

  @Input('iccSpinnerMessage')
  set message(value: string) {
    this._message = value;
    if (this.spinner) {
      this.spinner.instance.message = value;
    }
  }
  get message(): string {
    return this._message;
  }

  @Input('iccSpinner')
  set nbSpinner(value: boolean) {
    if (coerceBooleanProperty(value)) {
      this.show();
    } else {
      this.hide();
    }
  }

  constructor(
    private viewContainerRef: ViewContainerRef,
    private render: Renderer2,
    private elementRef: ElementRef,
  ) {}

  show() {
    if (!this.isSpinnerPresent) {
      this.spinner = this.viewContainerRef.createComponent<IccSpinnerComponent>(IccSpinnerComponent);
      this.spinner.instance.size = this.spinnerSize;
      this.spinner.instance.message = this.message;
      this.render.appendChild(this.elementRef.nativeElement, this.spinner.location.nativeElement);
      this.isSpinnerPresent = true;
    }
  }

  hide() {
    if (this.isSpinnerPresent) {
      this.viewContainerRef.remove();
      this.isSpinnerPresent = false;
    }
  }
}
