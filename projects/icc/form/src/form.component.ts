import { ChangeDetectionStrategy, Component, inject, input, OnDestroy, output } from '@angular/core';
import { IccFormField } from '@icc/ui/fields';
import { IccLayoutComponent } from '@icc/ui/layout';
import { IccFormStateModule } from './+state/form-state.module';
import { IccFormFacade } from './+state/form.facade';
import { IccFormViewComponent } from './components/form-view.component';
import { defaultFormConfig } from './models/default-form';
import { IccFormButtonClick, IccFormConfig } from './models/form.model';

@Component({
  selector: 'icc-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.auto-fit-height]': 'formConfig.autoFitHeight',
  },
  imports: [IccFormStateModule, IccFormViewComponent, IccLayoutComponent],
})
export class IccFormComponent implements OnDestroy {
  private readonly formFacade = inject(IccFormFacade);
  private formId = `form-${crypto.randomUUID()}`;
  formConfig$ = this.formFacade.getFormConfig(this.formId);
  formSetting$ = this.formFacade.getSetting(this.formId);
  formFieldsConfig$ = this.formFacade.getFormFieldsConfig(this.formId);
  formData$ = this.formFacade.getFormSignalData(this.formId);
  formConfig = input(defaultFormConfig, {
    transform: (value: Partial<IccFormConfig>) => {
      const formConfig = { ...defaultFormConfig, ...value };
      this.initFormConfig(formConfig);
      return formConfig;
    },
  });
  formFields = input([], {
    transform: (formFields: IccFormField[]) => {
      if (!this.formConfig$().remoteFieldsConfig && formFields.length > 0) {
        this.formFacade.setFormFieldsConfig(this.formId, this.formConfig$(), formFields);
      }
      return formFields;
    },
  });
  values = input(undefined, {
    transform: (values: object) => {
      this.formFacade.setFormData(this.formId, this.formConfig(), values);
      return values;
    },
  });
  iccFormButtonClick = output<IccFormButtonClick>();

  get autoFitHeight() {
    return this.formConfig().autoFitHeight;
  }

  constructor() {
    this.initFormConfig({ ...defaultFormConfig });
  }

  private initFormConfig(formConfig: IccFormConfig): void {
    this.formFacade.initFormConfig(this.formId, formConfig);
  }

  formButtonClick(buttonClick: IccFormButtonClick): void {
    this.iccFormButtonClick.emit(buttonClick);
  }

  ngOnDestroy(): void {
    this.formFacade.clearformDataStore(this.formId);
  }
}
