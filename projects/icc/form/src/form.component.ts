import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  HostListener,
  ViewChild,
  inject,
  Input,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { uniqueId } from '@icc/ui/core';
import { IccFormViewComponent } from './components/form-view.component';
import { IccFormFacade } from './+state/form.facade';
import { IccFormStateModule } from './+state/form-state.module';
import { IccFormConfig } from './models/form.model';
import { defaultFormConfig } from './models/default-form';
@Component({
  selector: 'icc-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IccFormStateModule, IccFormViewComponent],
})
export class IccFormComponent {
  private formFacade = inject(IccFormFacade);

  private _formConfig!: IccFormConfig; //= defaultFormConfig;
  private _formFields: any[] = [];
  /*

  private _gridData!: IccGridData<T>;
  */
  private formId = uniqueId(16);
  formConfig$!: Observable<IccFormConfig>;
  formFieldsConfig$!: Observable<any[]>;

  @Input()
  set formConfig(value: IccFormConfig) {
    this.initFormConfig({ ...value });
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
    this.formFacade.initFormConfig(this.formConfig);
  }

  @Input()
  set formFields(val: any[]) {
    this._formFields = val;
    if (!this.formConfig) {
      this.initFormConfig({ ...defaultFormConfig });
    }
    if (!this.formConfig.remoteFieldsConfig && this.formFields.length > 0) {
      this.formFacade.setFormFieldsConfig(this.formConfig, this.formFields);
    }
  }
  get formFields(): any[] {
    return this._formFields;
  }

  @Input() values: any;
}
