import {
  ChangeDetectorRef,
  inject,
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
import { IccFieldsetLabelWidthDirective } from './directive/fieldset-label-width.directive';
import { IccFieldWidthDirective } from './directive/field-width.directive';
import { IccHintDirective } from './directive/hint.directive';
import { IccErrorDirective } from './directive/error.directive';
import { IccSuffixDirective } from './directive/suffix.directive';
import { IccFormFieldErrorsDirective } from './directive/form-field-errors.directive';
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
    IccFieldsetLabelWidthDirective,
    IccFormFieldErrorsDirective,
  ],
})
export class IccFormFieldComponent implements AfterViewInit {
  private changeDetectorRef = inject(ChangeDetectorRef);
  fieldWidth: string = '100%';
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
    this.changeDetectorRef.markForCheck();
    return this._explicitFormFieldControl || this._controlDirective;
  }
  set _control(value) {
    this._explicitFormFieldControl = value;
  }

  get formFieldIndicatorColor(): string {
    console.log(' this._control =', this._control);
    if (this._control && !this._control.disabled) {
      if (this._control.ngControl?.dirty) {
        return `icc-form-field-indicator-red`;
      } else {
        return `icc-form-field-indicator-green`;
      }
    }
    return '';
  }

  private _explicitFormFieldControl!: IccFormFieldControlDirective<any>;

  constructor(
    public elementRef: ElementRef,
    @Optional() private formLabelWidthDirective: IccFormLabelWidthDirective,
    @Optional() private fieldsetLabelWidthDirective: IccFieldsetLabelWidthDirective,
    @Optional() private labelWidthDirective: IccLabelWidthDirective,
    @Optional() private fieldWidthDirective: IccFieldWidthDirective,
  ) {}

  ngAfterViewInit(): void {
    if (!this.iccLabel) {
      this.label.nativeElement.remove();
    } else if (this.label) {
      let width = '';
      if (this.formLabelWidthDirective && this.formLabelWidthDirective.width) {
        width = this.formLabelWidthDirective.width;
      }
      if (this.fieldsetLabelWidthDirective && this.fieldsetLabelWidthDirective.width) {
        width = this.fieldsetLabelWidthDirective.width;
      }
      if (this.labelWidthDirective && this.labelWidthDirective.width) {
        width = this.labelWidthDirective.width;
      }
      if (!width) {
        width = DEFAULT_FORM_FIELD_LABEL_WIDTH;
      }
      this.label.nativeElement.style.setProperty('flex', `0 0 ${width}`);
    }

    if (this.fieldWidthDirective && this.fieldWidthDirective.width) {
      this.fieldWidth = this.fieldWidthDirective.width;
      this.changeDetectorRef.detectChanges();
    }
  }
}
