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
  protected _value!: any;
  private _multiSelection: boolean = false;

  @Input() label: string | undefined;

  @Input()
  set value(val: any) {
    this._value = val;
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
    this.value = this.states[18];
  }

  states = STATES;
  isOverlayOpen!: boolean;
  autocompleteClose!: boolean;

  get hasValue(): boolean {
    return !!this.value;
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
      /*
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
      }*/
    }
  }

  selectChange(states: State | (State | string)[]): void {}

  onBlur(): void {}

  closeOverlay(): void {
    this.autocompleteClose = true;
  }

  clearSelected(): void {
    this.value = '';
    /*
    if (this.multiSelection) {
      this.state.setValue([]);
    } else {
      this.state.setValue('');
    }
    this.changeDetectorRef.markForCheck();
    */
  }
}
