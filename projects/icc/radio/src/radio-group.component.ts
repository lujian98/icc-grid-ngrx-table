import {
  Component,
  Input,
  ContentChildren,
  QueryList,
  AfterContentInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  Optional,
  Self,
  DoCheck,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NgControl, NgForm, FormGroupDirective } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { merge } from 'rxjs';
import { takeWhile, takeUntil, mergeAll } from 'rxjs/operators';
import { IccRadioComponent } from './tmp/radio.component';
import { IccFormFieldControlDirective } from '@icc/ui/form-field';

@Component({
  selector: 'icc-radio-group',
  styleUrls: ['./radio-group.component.scss'],
  template: ` <ng-content select="icc-radio"></ng-content> `,
  providers: [{ provide: IccFormFieldControlDirective, useExisting: IccRadioGroupComponent }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class IccRadioGroupComponent
  extends IccFormFieldControlDirective<any>
  implements AfterContentInit, DoCheck, OnDestroy, ControlValueAccessor
{
  protected alive = true;
  protected _value: any;
  protected _name!: string;
  protected _disabled!: boolean;
  protected _required!: boolean;

  @ContentChildren(IccRadioComponent, { descendants: true }) radios!: QueryList<IccRadioComponent>;

  @Output() change: EventEmitter<any> = new EventEmitter();

  protected onChange = (value: any) => {};
  protected onTouched = () => {};

  @Input()
  get value(): any {
    return this._value;
  }
  set value(value: any) {
    if (this.value !== value) {
      this._value = value;
      this.updateValues();
    }
  }

  @Input()
  get name(): string {
    return this._name;
  }
  set name(name: string) {
    this._name = name;
    this.updateNames();
  }

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(disabled: boolean) {
    this._disabled = coerceBooleanProperty(disabled);
    this.updateDisabled();
  }

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
  }

  constructor(
    protected cd: ChangeDetectorRef,
    @Optional() @Self() override ngControl: NgControl,
    @Optional() public _parentForm: NgForm,
    @Optional() public _parentFormGroup: FormGroupDirective,
  ) {
    super();
    if (this.ngControl) {
      ngControl.valueAccessor = this;
    }
  }

  ngAfterContentInit() {
    this.updateNames();

    Promise.resolve().then(() => this.updateAndSubscribe());

    this.radios.changes.pipe(takeWhile(() => this.alive)).subscribe(() => {
      Promise.resolve().then(() => this.updateAndSubscribe());
    });
  }

  ngDoCheck() {
    if (this.ngControl) {
      let parent = this._parentFormGroup || this._parentForm;

      this.errorState = !!(this.ngControl?.invalid && (this.ngControl?.dirty || parent?.submitted));
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: any): void {
    this.value = value;

    this.cd.markForCheck();
  }

  protected updateAndSubscribe() {
    this.updateNames();
    this.updateValues();
    this.updateDisabled();
    this.subscribeOnRadiosValueChange();
  }

  protected updateNames() {
    if (this.radios) {
      this.radios.forEach((radio: IccRadioComponent) => (radio.name = this.name));
    }
  }

  protected updateValues() {
    if (this.radios && typeof this.value !== 'undefined') {
      this.radios.forEach((radio: IccRadioComponent) => (radio.checked = radio.value === this.value));
    }
  }

  protected updateDisabled() {
    if (this.radios && typeof this.disabled !== 'undefined') {
      this.radios.forEach((radio: IccRadioComponent) => (radio.disabled = this.disabled));
    }
  }

  protected subscribeOnRadiosValueChange() {
    if (!this.radios?.length) {
      return;
    }

    merge(this.radios.map((radio: IccRadioComponent) => radio.change))
      .pipe(
        takeWhile(() => this.alive),
        takeUntil(this.radios.changes),
        mergeAll(),
      )
      .subscribe((value: any) => {
        this.writeValue(value);
        this.propagateValue(value);
      });
  }

  protected propagateValue(value: any) {
    this.change.emit(value);
    this.onChange(value);
  }
}
