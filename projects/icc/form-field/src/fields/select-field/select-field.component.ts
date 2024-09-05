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
import { State, STATES } from './states';

export enum SelectFilterValue {
  CHECK_ALL = 'Check All',
  UNCHECK_ALL = '',
  IS_EMPTY = 'Is Empty',
}

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
export class SelectFieldComponent {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private _multiSelection: boolean = false;
  //tooltipPosition = IccPosition.BOTTOM;

  @Input()
  get multiSelection(): boolean {
    return this._multiSelection;
  }
  set multiSelection(val: boolean) {
    this._multiSelection = coerceBooleanProperty(val);
    if (this._multiSelection) {
      const states = [this.states[10], this.states[18], this.states[25]];
      this.state.setValue(states);
    } else {
      this.state.setValue(this.states[18]);
    }
  }

  get selectionType(): string {
    return this.multiSelection ? 'Multi' : 'Single';
  }

  get selectFilterValue() {
    return SelectFilterValue;
  }

  isAllChecked(ref: IccOptionComponent): boolean {
    const isAllChecked = this.state.value.length === this.states.length;
    isAllChecked ? ref.select() : ref.deselect();
    return isAllChecked;
  }

  isAllUnChecked(ref: IccOptionComponent): boolean {
    const isAllUnChecked = this.state.value.length === 0;
    isAllUnChecked ? ref.select() : ref.deselect();
    return isAllUnChecked;
  }

  states = STATES;
  isOverlayOpen!: boolean;
  autocompleteClose!: boolean;

  form: FormGroup = new FormGroup({
    state: new FormControl<State[]>([]),
  });

  get state(): AbstractControl {
    return this.form.get('state')!;
  }

  get filterValue(): string {
    return typeof this.state.value === 'object' ? '' : this.state.value;
  }

  get hasValue(): boolean {
    return this.multiSelection ? this.state.value.length > 0 : !!this.state.value;
  }

  get toDisplay(): string {
    return this.autocomplete.toDisplay;
  }

  @ViewChild(IccAutocompleteComponent, { static: true }) autocomplete!: IccAutocompleteComponent<State | State[]>;

  displayFn(value: State | State[]): string {
    this.changeDetectorRef.markForCheck();
    if (Array.isArray(value)) {
      return value.length > 0
        ? value
            .map((item) => item.state)
            .sort((a, b) => a.localeCompare(b))
            .join(', ')
        : '';
    } else {
      return value ? value.state : '';
    }
  }

  compareFn(s1: State, s2: State): boolean {
    return s1 && s2 ? s1.state === s2.state : s1 === s2;
  }

  overlayOpen(event: boolean): void {
    this.isOverlayOpen = event;
    if (this.isOverlayOpen) {
      this.autocompleteClose = false;
    } else {
      console.log(' overlay close event =', this.state.value);

      const value = this.state.value;
      if (!value) {
        this.state.setValue(this.autocomplete.value);
      } else if (this.multiSelection && !Array.isArray(value)) {
        const find = this.states.find((item) => item.state === value);
        const selection = this.autocomplete.value as State[];
        if (!find) {
          const newState = { state: value };
          selection.push(newState);
          this.states.splice(0, 0, newState);
        }
        this.state.setValue(selection);
      }
    }
  }

  selectChange(states: State | (State | string)[]): void {
    if (this.multiSelection && Array.isArray(states)) {
      const hasCheckAll = states.find((state) => (state as string) === SelectFilterValue.CHECK_ALL);
      const haiccCheckAll = states.filter((state) => (state as string) === SelectFilterValue.UNCHECK_ALL);
      if (hasCheckAll) {
        const value = this.states.filter((state) => state && state.state);
        this.state.setValue(value);
        this.autocomplete.selectValue(value);
      } else if (haiccCheckAll.length === 1) {
        this.state.setValue([]);
        this.autocomplete.selectValue([]);
      }
      this.changeDetectorRef.markForCheck();
    }
  }

  onBlur(): void {}

  closeOverlay(): void {
    this.autocompleteClose = true;
  }

  clearSelected(): void {
    if (this.multiSelection) {
      this.state.setValue([]);
    } else {
      this.state.setValue('');
    }
    this.changeDetectorRef.markForCheck();
  }
}
