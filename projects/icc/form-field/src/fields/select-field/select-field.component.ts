import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  IccAutocompleteComponent,
  IccAutocompleteContentDirective,
  IccAutocompleteDirective,
  IccFilterHighlightComponent,
} from '@icc/ui/autocomplete';
import { IccCheckboxComponent } from '@icc/ui/checkbox';
import { IccFilterPipe } from '@icc/ui/core';
import { IccIconModule } from '@icc/ui/icon';
import { IccOptionComponent } from '@icc/ui/option';
import { IccLabelDirective } from '../../directive/label.directive';
import { IccSuffixDirective } from '../../directive/suffix.directive';
import { IccFormFieldComponent } from '../../form-field.component';
import { IccInputDirective } from '../../input/input.directive';
import { IccSelectFieldStateModule } from './+state/select-field-state.module';
import { IccSelectFieldFacade } from './+state/select-field.facade';
import { defaultSelectFieldConfig } from './models/default-select-field';
import { IccSelectFieldConfig } from './models/select-field.model';

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
    IccSelectFieldStateModule,
    IccFormFieldComponent,
    IccSuffixDirective,
    IccLabelDirective,
    IccInputDirective,
    IccAutocompleteComponent,
    IccAutocompleteDirective,
    IccAutocompleteContentDirective,
    IccFilterHighlightComponent,
    IccOptionComponent,
    IccIconModule,
    IccCheckboxComponent,
    IccFilterPipe,
  ],
})
export class SelectFieldComponent<T> {
  private changeDetectorRef = inject(ChangeDetectorRef);
  private selectFieldFacade = inject(IccSelectFieldFacade);
  private _selectFieldConfig: IccSelectFieldConfig = defaultSelectFieldConfig;

  //fieldConfig$!: Observable<IccSelectFieldConfig>;
  fieldConfig$ = this.selectFieldFacade.selectFieldConfig$;
  private _value!: { [key: string]: T };
  private _fieldName: string = '';
  private _multiSelection: boolean = false;
  form!: FormGroup;

  @Input()
  set selectFieldConfig(value: IccSelectFieldConfig) {
    this._selectFieldConfig = value;
    // this.fieldConfig$ = this.selectFieldFacade.selectFieldConfig();
    this.selectFieldFacade.setupFieldConfig(value);
  }
  get selectFieldConfig(): IccSelectFieldConfig {
    return this._selectFieldConfig;
  }

  @Input() selectOnly: boolean = false;
  @Input() fieldLabel: string | undefined;

  @Input() optionKey: string = 'name';
  @Input() optionLabel: string = 'title';
  @Input() placeholder: string = '';

  @Input()
  set fieldName(val: string) {
    this._fieldName = val;
    this.form = new FormGroup({
      [this.fieldName]: new FormControl<{ [key: string]: T }>({}),
    });
  }

  get fieldName(): string {
    return this._fieldName;
  }

  @Input() options: { [key: string]: T }[] = [];

  @Input()
  set value(val: { [key: string]: T }) {
    this._value = val;
    this.selectedField.setValue(val);
  }

  get value(): { [key: string]: T } {
    return this._value;
  }

  @Input()
  get multiSelection(): boolean {
    return this._multiSelection;
  }
  set multiSelection(val: boolean) {
    this._multiSelection = coerceBooleanProperty(val);
  }

  @Output() selectionChange = new EventEmitter<any[]>(true);
  isOverlayOpen!: boolean;
  autocompleteClose!: boolean;

  get selectedField(): AbstractControl {
    return this.form!.get(this.fieldName)!;
  }

  get hasValue(): boolean {
    const value = this.selectedField.value;
    return value instanceof Array ? value.length > 0 : !!value;
  }

  get filterValue(): string {
    return typeof this.selectedField.value === 'object' ? '' : this.selectedField.value;
  }

  get toDisplay(): string {
    return this.autocomplete.toDisplay;
  }

  @ViewChild(IccAutocompleteComponent, { static: false }) autocomplete!: IccAutocompleteComponent<
    { [key: string]: T } | { [key: string]: T }[]
  >;

  displayFn(value: { [key: string]: string } | { [key: string]: string }[]): string {
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

  compareFn(s1: { [key: string]: string }, s2: { [key: string]: string }): boolean {
    return s1 && s2 ? s1[this.optionKey] === s2[this.optionKey] : s1 === s2;
  }

  overlayOpen(event: boolean): void {
    this.isOverlayOpen = event;
    if (this.isOverlayOpen) {
      this.autocompleteClose = false;
    } else {
    }
  }

  onChange(options: any): void {
    // console.log( 'qqqqqqqqqqqqqqq options=', options)
    this.selectionChange.emit([options]);
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

    this.selectionChange.emit([]);
  }
}
