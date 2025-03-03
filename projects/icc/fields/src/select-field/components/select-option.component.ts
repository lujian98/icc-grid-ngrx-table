import { SelectionModel } from '@angular/cdk/collections';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  ElementRef,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
  forwardRef,
  inject,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { IccCheckboxComponent } from '@icc/ui/checkbox';
import { BehaviorSubject, timer, Observable, take, Subject, interval, map, of } from 'rxjs';
import { IccOptionType, IccSelectFieldConfig, IccSelectFieldSetting } from '../models/select-field.model';

import {
  IccAutocompleteComponent,
  IccAutocompleteContentDirective,
  IccAutocompleteDirective,
  IccFilterHighlightComponent,
} from '@icc/ui/autocomplete';

import { IccIconModule } from '@icc/ui/icon';
import { IccOptionComponent } from '@icc/ui/option';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { isEqual, sortByField } from '@icc/ui/core';
import { IccSelectFilterPipe } from '../pipes/select-filter.pipe';

export interface IccHeaderOption {
  name: string;
  title: string;
  [key: string]: string;
}

@Component({
  selector: 'icc-select-option',
  templateUrl: './select-option.component.html',
  styleUrls: ['./select-option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ScrollingModule,
    TranslatePipe,
    IccIconModule,
    IccOptionComponent,
    IccCheckboxComponent,
    IccFilterHighlightComponent,
    IccSelectFilterPipe,
  ],
})
export class IccSelectOptionComponent<T, G> {
  private changeDetectorRef = inject(ChangeDetectorRef);
  private translateService = inject(TranslateService);
  private elementRef = inject(ElementRef);
  private _fieldConfig!: IccSelectFieldConfig;

  @Input()
  set fieldConfig(fieldConfig: IccSelectFieldConfig) {
    this._fieldConfig = fieldConfig;
  }
  get fieldConfig(): IccSelectFieldConfig {
    return this._fieldConfig;
  }

  @Input() form!: FormGroup;
  @Input() fieldName!: string;
  @Input() selectOptions: IccOptionType[] = [];
  @Input() value!: string | string[] | object[];

  isEmptyValue: IccHeaderOption = {
    name: 'isEmpty',
    title: this.translateService.instant('ICC.UI.ACTIONS.IS_EMPTY'),
  };
  notEmptyValue: IccHeaderOption = {
    name: 'notEmpty',
    title: this.translateService.instant('ICC.UI.ACTIONS.NOT_EMPTY'),
  };

  get field(): FormControl {
    return this.form?.get(this.fieldName!)! as FormControl;
  }

  get hasValue(): boolean {
    const value = this.field.value;
    return (value instanceof Array ? value.length > 0 : !!value) && !this.field.disabled;
  }

  get fieldValue(): T[] {
    return this.field.value instanceof Array ? this.field.value : [this.field.value];
  }

  get isAllChecked(): boolean {
    return this.fieldValue.length === this.selectOptions.length;
  }

  get filterValue(): string {
    return typeof this.field.value === 'object' ? '' : this.field.value;
  }

  @ViewChild(IccAutocompleteComponent, { static: false }) autocomplete!: IccAutocompleteComponent<
    { [key: string]: T } | { [key: string]: T }[],
    G
  >;
  @ViewChildren(IccOptionComponent) optionList!: QueryList<IccOptionComponent<T>>;
  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;

  @Output() valueChange = new EventEmitter<T | T[]>(true);
  isOverlayOpen!: boolean;
  autocompleteClose!: boolean;

  clickedOption: number | undefined;
  private clickedOptions = 1;
  clickOption(option: IccOptionComponent<unknown>): void {
    this.autocomplete.setSelectionOption(option as IccOptionComponent<{ [key: string]: T } | { [key: string]: T }[]>);
    this.clickedOption = this.clickedOptions++;
  }
  onScrolledIndexChange(index: number): void {
    this.setSelectChecked();
  }
  getOptionLabel(option: unknown): string {
    return (
      this.fieldConfig.singleListOption ? option : (option as { [key: string]: T })[this.fieldConfig.optionLabel]
    ) as string;
  }

  private setSelectChecked(): void {
    const values = this.fieldValue;
    this.optionList.toArray().forEach((option) => {
      const find = values.find((item) => isEqual(item, option.value));
      option.selected = !!find;
    });
    this.changeDetectorRef.markForCheck();
  }

  closeOverlay(): void {
    this.autocompleteClose = true;
  }

  clearSelected(event: MouseEvent): void {
    event.stopPropagation();
    if (this.fieldConfig.multiSelection) {
      this.field.setValue([]);
      this.valueChange.emit([]);
    } else {
      this.field.setValue('');
      this.valueChange.emit('' as T);
    }
    this.changeDetectorRef.markForCheck();
    this.delaySetSelected();
  }

  displayFn(value: string | { [key: string]: string } | { [key: string]: string }[]): string {
    this.changeDetectorRef.markForCheck();
    if (Array.isArray(value)) {
      if (value.length > 0) {
        return (
          value
            .map((item) => {
              return this.fieldConfig.singleListOption ? item : item[this.fieldConfig.optionLabel];
            })
            .sort()
            //.sort((a, b) => (a && b) ? a.localeCompare(b) : 0)
            .join(', ')
        );
      } else {
        return '';
      }
    } else {
      if (this.fieldConfig.singleListOption) {
        return value as string;
      } else {
        return value ? (value as { [key: string]: string })[this.fieldConfig.optionLabel] : '';
      }
    }
  }

  compareFn(s1: { [key: string]: string }, s2: { [key: string]: string }): boolean {
    if (this.fieldConfig.singleListOption) {
      return s1 && s2 && s1 === s2;
    } else {
      return s1 && s2 ? s1[this.fieldConfig.optionKey] === s2[this.fieldConfig.optionKey] : s1 === s2;
    }
  }

  private delaySetSelected(overlayOpen?: boolean): void {
    timer(20)
      .pipe(take(1))
      .subscribe(() => {
        this.setSelectChecked();
        if (overlayOpen) {
          this.setVirtualScrollPosition();
        }
      });
  }

  private setVirtualScrollPosition(): void {
    if (this.viewport && this.hasValue && !this.isAllChecked) {
      const values = sortByField([...this.fieldValue], this.fieldConfig.optionLabel, 'asc');
      const index = this.selectOptions.findIndex((option) => isEqual(option, values[0] as { [key: string]: T }));
      this.viewport.scrollToIndex(index);
    }
  }

  checkAll(selectOptions: IccOptionType[]): void {
    this.value = [...selectOptions] as object[];
    this.delaySetSelected();
    this.valueChange.emit(this.value as T[]);
  }

  hasHeader(fieldConfig: IccSelectFieldConfig): boolean {
    return (
      (fieldConfig.multiSelection && (fieldConfig.checkAll || fieldConfig.uncheckAll)) ||
      fieldConfig.isEmpty ||
      fieldConfig.notEmpty
    );
  }

  //support only header isEmpty and notEmpty
  headerOptionClick(option: IccOptionComponent<IccHeaderOption>): void {
    option.selected = !option.selected;
    const optionKey = this.fieldConfig.singleListOption ? option.value[this.fieldConfig.optionKey] : option.value;
    const optionValue = this.fieldConfig.singleListOption ? option.value[this.fieldConfig.optionLabel] : option.value;
    if (this.fieldConfig.multiSelection) {
      if (option.selected) {
        this.value = [...this.value, optionValue] as object[];
        const emitValue = [...this.value, optionKey];
        this.valueChange.emit(emitValue as T[]);
      } else {
        this.value = [...this.value].filter((item) => {
          if (this.fieldConfig.singleListOption) {
            return item !== optionValue;
          } else {
            return (
              (item as { [key: string]: T })[this.fieldConfig.optionKey] !== option.value[this.fieldConfig.optionKey]
            );
          }
        }) as object[];
        this.valueChange.emit(this.value as T[]);
      }
    } else {
      this.autocompleteClose = true;
      if (option.selected) {
        this.valueChange.emit(optionKey as T);
        this.value = optionValue as string;
      } else {
        this.valueChange.emit('' as T);
        this.value = '';
      }
    }
    this.field.setValue(this.value);
  }
}
