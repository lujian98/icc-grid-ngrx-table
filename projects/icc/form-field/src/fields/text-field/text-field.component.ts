import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IccIconModule } from '@icc/ui/icon';
import { IccLabelDirective } from '../../directive/label.directive';
import { IccSuffixDirective } from '../../directive/suffix.directive';
import { IccFormFieldComponent } from '../../form-field.component';
import { IccInputDirective } from '../../input/input.directive';

@Component({
  selector: 'icc-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IccFormFieldComponent,
    IccSuffixDirective,
    IccLabelDirective,
    IccInputDirective,
    IccIconModule,
  ],
})
export class TextFieldComponent {
  private changeDetectorRef = inject(ChangeDetectorRef);
  private _value!: string;
  private _fieldName: string = '';
  form!: FormGroup;

  @Input() fieldLabel: string | undefined;
  @Input() placeholder: string = '';

  @Input()
  set fieldName(val: string) {
    this._fieldName = val;
    this.form = new FormGroup({
      [this.fieldName]: new FormControl<string>(''),
    });
  }

  get fieldName(): string {
    return this._fieldName;
  }
  @Input()
  set value(val: string) {
    this._value = val;
    this.field.setValue(val);
  }

  get value(): string {
    return this._value;
  }

  @Output() valueChange = new EventEmitter<string>(true);

  get field(): AbstractControl {
    return this.form!.get(this.fieldName)!;
  }

  get hasValue(): boolean {
    return !!this.field.value;
  }

  onChange(): void {
    console.log('qqqqqqqqqqqqqqq onChange=', this.field.value);
    this.valueChange.emit(this.field.value);
  }

  onBlur(): void {}

  clearSelected(): void {
    this.valueChange.emit('');
  }
}
