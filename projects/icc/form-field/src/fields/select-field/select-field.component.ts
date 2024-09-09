import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  IccAutocompleteComponent,
  IccAutocompleteContentDirective,
  IccAutocompleteDirective,
  IccFilterHighlightComponent,
} from '@icc/ui/autocomplete';
import { IccCheckboxComponent } from '@icc/ui/checkbox';
import { IccFilterPipe, uniqueId } from '@icc/ui/core';
import { IccIconModule } from '@icc/ui/icon';
import { IccOptionComponent } from '@icc/ui/option';
import { Observable, map } from 'rxjs';
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
export class SelectFieldComponent<T> implements OnDestroy {
  private changeDetectorRef = inject(ChangeDetectorRef);
  private selectFieldFacade = inject(IccSelectFieldFacade);
  private _fieldConfig: IccSelectFieldConfig = defaultSelectFieldConfig;
  private _value!: any;
  private fieldId = uniqueId(16);
  private firstTimeLoad = true;

  fieldConfig$!: Observable<IccSelectFieldConfig | undefined>;
  selectOptions$!: Observable<any[]>;

  form!: FormGroup;
  @Input()
  set fieldConfig(fieldConfig: IccSelectFieldConfig) {
    if (this.firstTimeLoad) {
      this.firstTimeLoad = false;
      this._fieldConfig = {
        ...fieldConfig,
        fieldId: this.fieldId,
      };
      //console.log('0000 this._selectFieldConfig=', this._fieldConfig);
      //console.log(' fieldId=', this.fieldId);

      this.fieldConfig$ = this.selectFieldFacade.selectFieldConfig(this.fieldId).pipe(
        map((fieldConfig) => {
          //console.log(' ccccccccccccc =', fieldConfig);
          this._fieldConfig = fieldConfig!;
          return fieldConfig;
        }),
      );
      this.selectOptions$ = this.selectFieldFacade.selectOptions(this.fieldId);
      this.selectFieldFacade.setupFieldConfig(this.fieldId, this.fieldConfig);

      console.log(' this.fieldConfig.fieldName=', this.fieldConfig.fieldName);
      this.form = new FormGroup({
        [this.fieldConfig.fieldName]: new FormControl<{ [key: string]: T }>({}),
      });
      //console.log(' uuuuuu set value =', this.value)
      this.selectedField.setValue(this.value);
      //console.log('333333 this._selectFieldConfig=', this._fieldConfig);
    } else {
      this._fieldConfig = fieldConfig;
      //console.log('22222 this._selectFieldConfig=', this._fieldConfig);
    }
  }
  get fieldConfig(): IccSelectFieldConfig {
    return this._fieldConfig;
  }

  @Input()
  set options(val: { [key: string]: T }[] | string[]) {
    //local set option only, not used here
    if (this.fieldConfig.singleListOption) {
      const options = (val as string[]).map((item: string) => {
        return {
          name: item,
          title: item,
        };
      });
      //console.log( ' set optionss =', options)
      this.selectFieldFacade.setSelectFieldOptions(this.fieldId, options);
    } else {
      this.selectFieldFacade.setSelectFieldOptions(this.fieldId, val);
    }
  }

  @Input()
  set value(val: any) {
    this._value = this.getInitValue(val);
    if (this.form && val !== undefined) {
      //console.log(' uuuuuu set value =', this.value)
      this.selectedField.setValue(this._value);
    }
  }

  get value(): any {
    return this._value;
  }

  private getInitValue(val: any): any {
    let value: any = val;
    if (typeof val === 'string') {
      value = [val];
    }
    if (this.fieldConfig.singleListOption && Array.isArray(value)) {
      value = [...value].map((item) => ({
        name: item,
        title: item,
      }));
    }
    return value;
  }

  @Output() selectionChange = new EventEmitter<any[]>(true);
  isOverlayOpen!: boolean;
  autocompleteClose!: boolean;

  get selectedField(): AbstractControl {
    return this.form!.get(this.fieldConfig.fieldName)!;
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
    //console.log( 'ddddddddd  this.fieldConfig.optionLabel=', this.fieldConfig.optionLabel)
    if (Array.isArray(value)) {
      //console.log( 'eeeeeeeeee  value=', value)
      return value.length > 0
        ? value
            .map((item) => item[this.fieldConfig.optionLabel])
            .sort((a, b) => a.localeCompare(b))
            .join(', ')
        : '';
    } else {
      return value ? value[this.fieldConfig.optionLabel] : '';
    }
  }

  compareFn(s1: { [key: string]: string }, s2: { [key: string]: string }): boolean {
    return s1 && s2 ? s1[this.fieldConfig.optionKey] === s2[this.fieldConfig.optionKey] : s1 === s2;
  }

  overlayOpen(event: boolean): void {
    this.isOverlayOpen = event;
    if (this.isOverlayOpen) {
      this.autocompleteClose = false;
    } else {
    }
  }

  onInputClick(checked: boolean, option: { [key: string]: T }, ref: any): void {
    const value = this.selectedField.value;
    const find = [...value].find((item) => item[this.fieldConfig.optionKey] === option[this.fieldConfig.optionKey]);
    if (find && !checked) {
      this.value = [...value].filter((item) => item[this.fieldConfig.optionKey] !== option[this.fieldConfig.optionKey]);
    } else if (!find && checked) {
      this.value = [...value, option];
    }
    ref.selected = checked;
    this.changeDetectorRef.markForCheck();
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
    if (this.fieldConfig.multiSelection) {
      this.selectedField.setValue([]);
    } else {
      this.selectedField.setValue('');
    }
    this.changeDetectorRef.markForCheck();

    this.selectionChange.emit([]);
  }

  ngOnDestroy(): void {
    this.selectFieldFacade.clearSelectFieldStore(this.fieldId);
  }
}
