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
  Input,
  Optional,
  ViewChild,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { take, timer } from 'rxjs';
import { IccFieldWidthDirective } from './directive/field-width.directive';
import { IccFieldsetLabelWidthDirective } from './directive/fieldset-label-width.directive';
import { IccFormFieldControlDirective } from './directive/form-field-control.directive';
import { IccFormLabelWidthDirective } from './directive/form-label-width.directive';
import { IccInputDirective } from './directive/input.directive';
import { IccLabelWidthDirective } from './directive/label-width.directive';
import { IccLabelDirective } from './directive/label.directive';
import { DEFAULT_FORM_FIELD_LABEL_WIDTH } from './models/form-field.model';

@Component({
  selector: 'icc-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class IccFormFieldComponent implements AfterViewInit {
  private changeDetectorRef = inject(ChangeDetectorRef);
  private _fieldIndicator: string = '';

  @Input() showFieldEditIndicator: boolean = true;

  focused: boolean = false;
  public elementRef = inject(ElementRef); // autocomplete.directive need this public ???
  fieldWidth: string = '100%';

  @HostBinding('class.icc-form-field-invalid')
  get invalid() {
    this.checkFieldIndicator();
    this.changeDetectorRef.markForCheck();
    const control = this.formFieldControl;
    return (control?.touched || control?.dirty) && control?.invalid;
  }

  get formFieldControl(): FormControl {
    return this.formFieldControlDirective?.fieldControl;
  }
  get required(): boolean {
    const control = this.formFieldControl;
    return control && control.hasValidator(Validators.required) && !control.disabled;
  }

  onMouseenter(): void {
    this.focused = true;
  }
  onMouseleave(): void {
    this.focused = false;
  }

  private checkFieldIndicator(): void {
    timer(10)
      .pipe(take(1))
      .subscribe(() => {
        let fieldIndicator = '';
        const control = this.formFieldControl;
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
    return this.showFieldEditIndicator ? this._fieldIndicator : '';
  }

  @ContentChild(IccInputDirective) public inputDirective!: IccInputDirective;
  @ContentChild(IccLabelDirective) private iccLabel!: IccLabelDirective;
  @ViewChild('label') private label!: ElementRef;

  constructor(
    @Optional() private formLabelWidthDirective: IccFormLabelWidthDirective,
    @Optional() private fieldsetLabelWidthDirective: IccFieldsetLabelWidthDirective,
    @Optional() private labelWidthDirective: IccLabelWidthDirective,
    @Optional() private fieldWidthDirective: IccFieldWidthDirective,
    @Optional() private formFieldControlDirective: IccFormFieldControlDirective,
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
