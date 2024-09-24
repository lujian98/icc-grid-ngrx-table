import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IccFieldsComponent } from '../fields.component';
import { IccFieldsetConfig } from './models/fieldset.model';

@Component({
  selector: 'icc-fieldset',
  templateUrl: './fieldset.component.html',
  styleUrls: ['./fieldset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, IccFieldsComponent],
})
export class IccFieldsetComponent {
  private _fieldConfig!: IccFieldsetConfig;
  @Input() form!: FormGroup;
  @Input()
  set fieldConfig(val: IccFieldsetConfig) {
    // console.log(' fielset config=', val);
    this._fieldConfig = val;
  }
  get fieldConfig(): IccFieldsetConfig {
    return this._fieldConfig;
  }

  get formFields(): any[] {
    return this.fieldConfig?.formFields;
  }

  trackByIndex(index: number): number {
    return index;
  }
}
