import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ComponentRef,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  Renderer2,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { IccSpinnerComponent } from './spinner.component';
import { IccSpinnerSize } from './spinner.model';

@Directive({
  selector: '[iccSpinner]',
})
export class IccSpinnerDirective {
  private viewContainerRef = inject(ViewContainerRef);
  private renderer = inject(Renderer2);
  private elementRef = inject(ElementRef);
  private _message!: string;
  spinner!: ComponentRef<IccSpinnerComponent>;

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

  show(): void {
    if (!this.isSpinnerPresent) {
      this.spinner = this.viewContainerRef.createComponent<IccSpinnerComponent>(IccSpinnerComponent);
      this.spinner.instance.size = this.spinnerSize;
      this.spinner.instance.message = this.message;
      this.renderer.appendChild(this.elementRef.nativeElement, this.spinner.location.nativeElement);
      this.isSpinnerPresent = true;
    }
  }

  hide(): void {
    if (this.isSpinnerPresent) {
      this.viewContainerRef.remove();
      this.isSpinnerPresent = false;
    }
  }
}
