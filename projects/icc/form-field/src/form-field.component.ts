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
import { IccFormLabelWidthDirective } from './directive/form-label-width.directive';
import { IccFieldsetLabeLabelWidthDirective } from './directive/fieldset-label-width.directive';
import { IccHintDirective } from './directive/hint.directive';
import { IccErrorDirective } from './directive/error.directive';
import { IccSuffixDirective } from './directive/suffix.directive';
import { DEFAULT_FORM_FIELD_LABEL_WIDTH } from './models/form-field.model';

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
    IccFormLabelWidthDirective,
    IccFieldsetLabeLabelWidthDirective,
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
    @Optional() private formLabelWidthDirective: IccFormLabelWidthDirective,
    @Optional() private fieldsetLabeLabelWidthDirective: IccFieldsetLabeLabelWidthDirective,
    @Optional() private labelWidthDirective: IccLabelWidthDirective,
  ) {}

  ngAfterViewInit(): void {
    if (!this.iccLabel) {
      this.label.nativeElement.remove();
    } else if (this.label) {
      let width = '';
      if (this.formLabelWidthDirective && this.formLabelWidthDirective.width) {
        width = this.formLabelWidthDirective.width;
      }
      if (this.fieldsetLabeLabelWidthDirective && this.fieldsetLabeLabelWidthDirective.width) {
        width = this.fieldsetLabeLabelWidthDirective.width;
      }
      if (this.labelWidthDirective && this.labelWidthDirective.width) {
        width = this.labelWidthDirective.width;
      }
      if (!width) {
        width = DEFAULT_FORM_FIELD_LABEL_WIDTH;
      }
      this.label.nativeElement.style.setProperty('flex', `0 0 ${width}`);
    }
  }
}
