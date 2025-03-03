import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
  inject,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IccCheckboxComponent } from '@icc/ui/checkbox';
import { uniqueId } from '@icc/ui/core';
import { take, timer } from 'rxjs';
import { IccOptionType, IccSelectFieldConfig } from '../models/select-field.model';
import { IccAutocompleteComponent, IccFilterHighlightComponent } from '@icc/ui/autocomplete';
import { isEqual, sortByField } from '@icc/ui/core';
import { IccIconModule } from '@icc/ui/icon';
import { IccOptionComponent } from '@icc/ui/option';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
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
  private _fieldConfig!: IccSelectFieldConfig;

  @Input()
  set fieldConfig(fieldConfig: IccSelectFieldConfig) {
    this._fieldConfig = fieldConfig;
    if (this.fieldConfig) {
      this.isEmptyValue[this.fieldConfig.optionKey] = this.isEmptyValue.name;
      this.isEmptyValue[this.fieldConfig.optionLabel] = this.isEmptyValue.title;
      this.notEmptyValue[this.fieldConfig.optionKey] = this.notEmptyValue.name;
      this.notEmptyValue[this.fieldConfig.optionLabel] = this.notEmptyValue.title;
    }
  }
  get fieldConfig(): IccSelectFieldConfig {
    return this._fieldConfig;
  }
  @Input() form!: FormGroup;
  @Input() fieldName!: string;
  @Input() selectOptions: IccOptionType[] = [];
  @Input() value!: string | string[] | object[];
  @Input() autocomplete!: IccAutocompleteComponent<{ [key: string]: T } | { [key: string]: T }[], G>;
  @Input()
  set setSelected(overlayOpen: boolean) {
    this.delaySetSelected(overlayOpen);
  }

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

  @ViewChildren(IccOptionComponent) optionList!: QueryList<IccOptionComponent<T>>;
  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;

  @Output() valueChange = new EventEmitter<T | T[]>(true);
  @Output() clickedOption = new EventEmitter<string>(false);
  @Output() autocompleteClose = new EventEmitter<boolean>(false);

  clickOption(option: IccOptionComponent<unknown>): void {
    this.autocomplete.setSelectionOption(option as IccOptionComponent<{ [key: string]: T } | { [key: string]: T }[]>);
    this.clickedOption.emit(uniqueId(16));
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
      this.autocompleteClose.emit(true); // TODO output emit to select field
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
