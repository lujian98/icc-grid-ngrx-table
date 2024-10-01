import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  HostBinding,
  inject,
  Optional,
  ViewChild,
} from '@angular/core';
import { take, timer } from 'rxjs';
import { IccErrorDirective } from './directive/error.directive';
import { IccFieldControlDirective } from './directive/field-control.directive';
import { IccFieldWidthDirective } from './directive/field-width.directive';
import { IccFieldsetLabelWidthDirective } from './directive/fieldset-label-width.directive';
import { IccFormFieldErrorsDirective } from './directive/form-field-errors.directive';
import { IccFormLabelWidthDirective } from './directive/form-label-width.directive';
import { IccHintDirective } from './directive/hint.directive';
import { IccLabelWidthDirective } from './directive/label-width.directive';
import { IccLabelDirective } from './directive/label.directive';
import { IccSuffixDirective } from './directive/suffix.directive';
import { IccFormFieldControlDirective } from './form-field-control';
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
    IccFieldControlDirective,
  ],
})
export class IccFormFieldComponent implements AfterViewInit {
  private changeDetectorRef = inject(ChangeDetectorRef);
  private _fieldIndicator: string = '';
  public elementRef = inject(ElementRef); // autocomplete.directive need this public ???
  fieldWidth: string = '100%';

  @HostBinding('class.icc-form-field-invalid') // TODO add a HostBinding class
  get invalid() {
    //console.log( ' host binding invalid ')
    //console.log(' 7777 fieldControl=', this._controlDirective)
    this.checkFieldIndicator();
    this.changeDetectorRef.markForCheck();
    if (this._control) {
      return this._control.errorState;
    }
    return false;
  }

  onClick(event: MouseEvent): void {
    this._control && this._control.onContainerClick(event);
  }

  get _control(): IccFormFieldControlDirective<any> {
    return this._controlDirective;
  }

  get required(): boolean {
    return this._control && this._control.required && !this._control.disabled;
  }

  get focused(): boolean {
    return this._control && this._control.focused;
  }

  private checkFieldIndicator(): void {
    timer(10)
      .pipe(take(1))
      .subscribe(() => {
        let fieldIndicator = '';
        const control = this.fieldControlDirective?.fieldControl;
        if (control && !control.disabled) {
          fieldIndicator = control.dirty ? `icc-form-field-indicator-red` : `icc-form-field-indicator-green`;
        }
        if (fieldIndicator !== this.fieldIndicator) {
          this.fieldIndicator = fieldIndicator;
          this.changeDetectorRef.markForCheck();
        }
      });
  }

  private set fieldIndicator(val: string) {
    this._fieldIndicator = val;
  }
  get fieldIndicator(): string {
    return this._fieldIndicator;
  }

  @ContentChild(IccFormFieldControlDirective) private _controlDirective!: IccFormFieldControlDirective<any>;
  @ContentChild(IccLabelDirective) private iccLabel!: IccLabelDirective;
  @ViewChild('label') private label!: ElementRef;

  constructor(
    @Optional() private formLabelWidthDirective: IccFormLabelWidthDirective,
    @Optional() private fieldsetLabelWidthDirective: IccFieldsetLabelWidthDirective,
    @Optional() private labelWidthDirective: IccLabelWidthDirective,
    @Optional() private fieldWidthDirective: IccFieldWidthDirective,
    @Optional() private fieldControlDirective: IccFieldControlDirective,
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
