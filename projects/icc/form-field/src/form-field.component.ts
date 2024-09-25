import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ContentChild,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Optional,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IccFormFieldControlDirective } from './form-field-control';
import { IccLabelDirective } from './directive/label.directive';
import { IccLabelWidthDirective } from './directive/label-width.directive';
import { IccHintDirective } from './directive/hint.directive';
import { IccErrorDirective } from './directive/error.directive';
import { IccSuffixDirective } from './directive/suffix.directive';

@Component({
  selector: 'icc-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    IccErrorDirective,
    IccHintDirective,
    IccLabelDirective,
    IccLabelWidthDirective,
    IccSuffixDirective,
  ],
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
    } else if (this.label && this.labelWidthDirective && this.labelWidthDirective.width) {
      this.label.nativeElement.style.setProperty('flex', `0 0 ${this.labelWidthDirective.width}`);
    }
  }
}
