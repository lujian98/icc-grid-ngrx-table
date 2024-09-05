import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  IccAutocompleteComponent,
  IccAutocompleteContentDirective,
  IccAutocompleteDirective,
  IccFilterHighlightComponent,
} from '@icc/ui/autocomplete';
import { IccCheckboxComponent } from '@icc/ui/checkbox';
import { IccIconModule } from '@icc/ui/icon';
import { IccInputDirective } from '@icc/ui/input';
import { IccOptionComponent } from '@icc/ui/option';
import { IccLabelDirective } from '../../directive/label.directive';
import { IccSuffix } from '../../directive/suffix';
import { IccFormFieldComponent } from '../../form-field.component';
import { FilterPipe } from './filter.pipe';

@Component({
  selector: 'icc-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IccFormFieldComponent,
    IccSuffix,
    IccLabelDirective,
    IccInputDirective,
    IccAutocompleteComponent,
    IccAutocompleteDirective,
    IccAutocompleteContentDirective,
    IccFilterHighlightComponent,
    IccOptionComponent,
    IccIconModule,
    IccCheckboxComponent,
    FilterPipe,
  ],
})
export class SelectFieldComponent<T> {
  private changeDetectorRef = inject(ChangeDetectorRef);
  private _value!: any;
  private _optionId: string = '';
  private _multiSelection: boolean = false;
  form: FormGroup | null = null;

  @Input() fieldLabel: string | undefined;

  @Input() optionLabel!: string;

  @Input()
  set optionId(val: string) {
    this._optionId = val;
    this.form = new FormGroup({
      [this.optionId]: new FormControl<any>({}),
    });
  }

  get optionId(): string {
    return this._optionId;
  }

  @Input() options: any[] = [];

  @Input()
  set value(val: any) {
    this._value = val;
    this.selectedField.setValue(val);
  }

  get value(): any {
    return this._value;
  }

  @Input()
  get multiSelection(): boolean {
    return this._multiSelection;
  }
  set multiSelection(val: boolean) {
    this._multiSelection = coerceBooleanProperty(val);
  }

  isOverlayOpen!: boolean;
  autocompleteClose!: boolean;

  get selectedField(): AbstractControl {
    return this.form!.get(this.optionId)!;
  }

  get hasValue(): boolean {
    return this.multiSelection ? this.selectedField.value.length > 0 : !!this.selectedField.value;
  }

  get filterValue(): string {
    return typeof this.selectedField.value === 'object' ? '' : this.selectedField.value;
  }

  get toDisplay(): string {
    return this.autocomplete.toDisplay;
  }

  @ViewChild(IccAutocompleteComponent, { static: true }) autocomplete!: IccAutocompleteComponent<any | any[]>;

  displayFn(value: any | any[]): string {
    this.changeDetectorRef.markForCheck();
    if (Array.isArray(value)) {
      return value.length > 0
        ? value
            .map((item) => item[this.optionLabel])
            .sort((a, b) => a.localeCompare(b))
            .join(', ')
        : '';
    } else {
      return value ? value[this.optionLabel] : '';
    }
  }

  compareFn(s1: any, s2: any): boolean {
    return s1 && s2 ? s1[this.optionId] === s2[this.optionId] : s1 === s2;
  }

  overlayOpen(event: boolean): void {
    this.isOverlayOpen = event;
    if (this.isOverlayOpen) {
      this.autocompleteClose = false;
    } else {
    }
  }

  selectChange(options: any | (any | string)[]): void {
    //this.value = options;
  }

  onBlur(): void {}

  closeOverlay(): void {
    this.autocompleteClose = true;
  }

  clearSelected(): void {
    if (this.multiSelection) {
      this.selectedField.setValue([]);
    } else {
      this.selectedField.setValue('');
    }
    this.changeDetectorRef.markForCheck();
  }
}
