import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IccFormConfig } from '../models/form.model';
import * as formActions from './form.actions';
import { selectFormConfig, selectFormFieldsConfig, selectFormData } from './form.selectors';

@Injectable()
export class IccFormFacade {
  private store = inject(Store);

  initFormConfig(formConfig: IccFormConfig): void {
    this.store.dispatch(formActions.initFormConfig({ formConfig }));

    if (formConfig.remoteFormConfig) {
      this.store.dispatch(formActions.loadRemoteFormConfig({ formConfig }));
    } else if (formConfig.remoteFieldsConfig) {
      this.store.dispatch(formActions.loadFormFieldsConfig({ formConfig }));
    }
  }

  setFormFieldsConfig(formConfig: IccFormConfig, formFields: any[]): void {
    this.store.dispatch(formActions.loadFormFieldsConfigSuccess({ formConfig, formFields }));
    if (formConfig.remoteFormData) {
      this.store.dispatch(formActions.getFormData({ formConfig }));
    }
  }

  setFormData(formConfig: IccFormConfig, formData: any): void {
    this.store.dispatch(formActions.getFormDataSuccess({ formConfig, formData }));
  }

  setFormEditable(formId: string, editable: boolean): void {
    this.store.dispatch(formActions.setFormEditable({ formId, editable }));
  }

  clearformDataStore(formId: string): void {
    this.store.dispatch(formActions.clearFormDataStore({ formId }));
  }

  selectFormConfig(formId: string): Observable<IccFormConfig> {
    return this.store.select(selectFormConfig(formId));
  }

  selectFormFieldsConfig(formId: string): Observable<any[]> {
    return this.store.select(selectFormFieldsConfig(formId));
  }

  selectFormData(formId: string): Observable<any> {
    return this.store.select(selectFormData(formId));
  }
}
