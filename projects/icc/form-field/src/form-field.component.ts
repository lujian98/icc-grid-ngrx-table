import {
  Component,
  HostBinding,
  ContentChild,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Directive,
  Optional,
} from '@angular/core';
import { IccFormFieldControlDirective } from './form-field-control';
import { IccLabelDirective } from './directive/label.directive';
import { IccLabelWidthDirective } from './directive/label-width.directive';

@Directive({
  selector: '[unpadded]',
})
export class IccUnpadFormFieldDirective {
  @HostBinding('class.unpadded-form-field')
  private unpaddedFormField: boolean = true;
}

@Component({
  selector: 'icc-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
})
export class IccFormFieldComponent implements AfterViewInit {
  focused = false;
  @HostBinding('class.icc-form-field')
  get field() {
    return true;
  }

  @HostBinding('class.icc-form-field-invalid')
  get invalid() {
    if (this._control) {
      return this._control.errorState;
    }
    return false;
  }

  @ContentChild(IccFormFieldControlDirective) _controlDirective!: IccFormFieldControlDirective<any>;
  @ContentChild(IccLabelDirective) iccLabel!: IccLabelDirective;
  @ViewChild('label') label!: ElementRef;

  get _control() {
    return this._explicitFormFieldControl || this._controlDirective;
  }
  set _control(value) {
    this._explicitFormFieldControl = value;
  }
  private _explicitFormFieldControl!: IccFormFieldControlDirective<any>;

  constructor(
    public elementRef: ElementRef,
    @Optional() private labelWidthDirective: IccLabelWidthDirective,
  ) {}

  ngAfterViewInit() {
    if (!this.iccLabel) {
      this.label.nativeElement.remove();
    } else if (this.label && this.labelWidthDirective) {
      this.label.nativeElement.style.setProperty('flex-basis', `${this.labelWidthDirective.width}px`);
    }
  }
}
