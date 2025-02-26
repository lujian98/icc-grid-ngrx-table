import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IccButtonConfg } from '@icc/ui/core';
import { IccFormConfig, IccFormSetting } from '../models/form.model';
import { IccFormField } from '@icc/ui/fields';
import * as formActions from './form.actions';
import { selectFormConfig, selectFormFieldsConfig, selectFormData, selectFormSetting } from './form.selectors';

@Injectable()
export class IccFormFacade {
  private store = inject(Store);

  initFormConfig(formId: string, formConfig: IccFormConfig): void {
    this.store.dispatch(formActions.initFormConfig({ formId, formConfig }));

    if (formConfig.remoteFormConfig) {
      this.store.dispatch(formActions.loadRemoteFormConfig({ formId, formConfig }));
    } else if (formConfig.remoteFieldsConfig) {
      this.store.dispatch(formActions.loadFormFieldsConfig({ formId, formConfig }));
    }
  }

  setFormFieldsConfig(formId: string, formConfig: IccFormConfig, formFields: IccFormField[]): void {
    this.store.dispatch(formActions.loadFormFieldsConfigSuccess({ formId, formConfig, formFields }));
    if (formConfig.remoteFormData) {
      this.store.dispatch(formActions.getFormData({ formId, formConfig }));
    }
  }

  setFormData(formId: string, formConfig: IccFormConfig, formData: object): void {
    this.store.dispatch(formActions.getFormDataSuccess({ formId, formConfig, formData }));
  }

  setFormEditable(formId: string, button: IccButtonConfg): void {
    this.store.dispatch(formActions.setFormEditable({ formId, button }));
  }

  getFormData(formId: string, formConfig: IccFormConfig): void {
    if (formConfig.remoteFormData) {
      this.store.dispatch(formActions.getFormData({ formId, formConfig }));
    }
  }

  saveFormData(formId: string, formConfig: IccFormConfig, formData: object): void {
    if (formConfig.remoteFormData) {
      this.store.dispatch(formActions.saveFormData({ formId, formConfig, formData }));
    }
  }

  /*
  uploadFiles(formConfig: IccFormConfig, files: IccUploadFile[]): void {
    if (files.length > 0) {
      this.store.dispatch(formActions.uploadFiles({ formConfig, files }));
    }
  }*/

  clearformDataStore(formId: string): void {
    this.store.dispatch(formActions.clearFormDataStore({ formId }));
  }

  selectFormConfig(formId: string): Observable<IccFormConfig> {
    return this.store.select(selectFormConfig(formId));
  }

  selectFormFieldsConfig(formId: string): Observable<IccFormField[]> {
    return this.store.select(selectFormFieldsConfig(formId));
  }

  selectSetting(fieldId: string): Observable<IccFormSetting> {
    return this.store.select(selectFormSetting(fieldId));
  }

  selectFormData(formId: string): Observable<object | undefined> {
    return this.store.select(selectFormData(formId));
  }
}
