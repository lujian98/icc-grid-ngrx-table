import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, inject, Input, Output } from '@angular/core';
import { uniqueId } from '@icc/ui/core';
import { IccFormField } from '@icc/ui/fields';
import { IccLayoutComponent } from '@icc/ui/layout';
import { Observable } from 'rxjs';
import { IccFormStateModule } from './+state/form-state.module';
import { IccFormFacade } from './+state/form.facade';
import { IccFormViewComponent } from './components/form-view.component';
import { defaultFormConfig } from './models/default-form';
import { IccFormConfig, IccFormButtonClick } from './models/form.model';

@Component({
  selector: 'icc-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IccFormStateModule, IccFormViewComponent, IccLayoutComponent],
})
export class IccFormComponent {
  private formFacade = inject(IccFormFacade);
  private _formConfig!: IccFormConfig;
  private _formFields: IccFormField[] = [];
  private formId = uniqueId(16);
  formConfig$!: Observable<IccFormConfig>;
  formFieldsConfig$!: Observable<IccFormField[]>;
  formData$!: Observable<object | undefined>;

  @Input()
  set formConfig(formConfig: Partial<IccFormConfig>) {
    this.initFormConfig({ ...defaultFormConfig, ...formConfig });
  }
  get formConfig(): IccFormConfig {
    return this._formConfig;
  }

  private initFormConfig(value: IccFormConfig): void {
    this._formConfig = {
      ...value,
      formId: this.formId,
    };
    this.formConfig$ = this.formFacade.selectFormConfig(this.formId); // selectFormFieldConfig
    this.formFieldsConfig$ = this.formFacade.selectFormFieldsConfig(this.formId);
    this.formData$ = this.formFacade.selectFormData(this.formConfig.formId);
    this.formFacade.initFormConfig(this.formConfig);
  }

  @Input()
  set formFields(val: IccFormField[]) {
    this._formFields = val;
    if (!this.formConfig) {
      this.initFormConfig({ ...defaultFormConfig });
    }
    if (!this.formConfig.remoteFieldsConfig && this.formFields.length > 0) {
      this.formFacade.setFormFieldsConfig(this.formConfig, this.formFields);
    }
  }
  get formFields(): IccFormField[] {
    return this._formFields;
  }

  @Input()
  set values(val: object) {
    this.formFacade.setFormData(this.formConfig, val);
  }

  @Output() iccFormButtonClick = new EventEmitter<IccFormButtonClick>(false);

  formButtonClick(buttonClick: IccFormButtonClick): void {
    console.log(' buttonClick=', buttonClick);
    this.iccFormButtonClick.emit(buttonClick);
  }

  @HostBinding('class.auto-fit-height')
  get autoFitHeight() {
    return this.formConfig.autoFitHeight;
  }
}
