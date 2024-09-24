import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextFieldComponent } from './text-field/text-field.component';

@Component({
  selector: 'icc-fields',
  templateUrl: './fields.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TextFieldComponent],
})
export class IccFieldsComponent {
  @Input() form!: FormGroup;

  private _fieldConfig!: any;

  @Input()
  set fieldConfig(val: any) {
    this._fieldConfig = val;
  }
  get fieldConfig(): any {
    return this._fieldConfig;
  }
}
