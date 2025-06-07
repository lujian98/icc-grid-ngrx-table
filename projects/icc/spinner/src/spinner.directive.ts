import {
  ComponentRef,
  Directive,
  effect,
  ElementRef,
  HostBinding,
  inject,
  input,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';
import { IccSpinnerComponent } from './spinner.component';
import { IccSpinnerSize } from './spinner.model';

@Directive({
  selector: '[iccSpinner]',
})
export class IccSpinnerDirective {
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly renderer = inject(Renderer2);
  private readonly elementRef = inject(ElementRef);
  private spinner!: ComponentRef<IccSpinnerComponent>;
  spinnerSize = input<IccSpinnerSize>('medium', { alias: 'iccSpinnerSize' });
  message = input<string>('', { alias: 'iccSpinnerMessage' });
  nbSpinner = input<boolean>(false, { alias: 'iccSpinner' });

  @HostBinding('class.icc-spinner-container') isSpinnerPresent = false;

  constructor() {
    effect(() => {
      if (this.spinner) {
        this.spinner.instance._message.update(() => this.message());
      }
      if (this.nbSpinner()) {
        this.show();
      } else {
        this.hide();
      }
    });
  }

  show(): void {
    if (!this.isSpinnerPresent) {
      this.spinner = this.viewContainerRef.createComponent<IccSpinnerComponent>(IccSpinnerComponent);
      this.spinner.instance._size.update(() => this.spinnerSize());
      this.spinner.instance._message.update(() => this.message());
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
