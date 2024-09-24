import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IccTextFieldComponent } from './text-field/text-field.component';
import { IccFormField } from './models/fields.model';

@Component({
  selector: 'icc-fields',
  templateUrl: './fields.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, IccTextFieldComponent],
})
export class IccFieldsComponent {
  private _fieldConfig!: Partial<IccFormField>;

  @Input() form!: FormGroup;

  @Input()
  set fieldConfig(val: Partial<IccFormField>) {
    this._fieldConfig = { ...val };
  }
  get fieldConfig(): Partial<IccFormField> {
    return this._fieldConfig;
  }
}
