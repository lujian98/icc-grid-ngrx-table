import { Injectable, inject, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IccSelectFieldConfig, IccOptionType, IccSelectFieldSetting } from '../models/select-field.model';
import * as selectFieldActions from './select-field.actions';
import { selectFieldSetting, selectFieldConfig, selectOptions, selectViewportReady } from './select-field.selectors';

@Injectable()
export class IccSelectFieldFacade {
  private readonly store = inject(Store);

  initFieldConfig(fieldId: string, fieldConfig: IccSelectFieldConfig): void {
    this.store.dispatch(selectFieldActions.initFieldConfig({ fieldId, fieldConfig }));
    if (fieldConfig.remoteConfig) {
      this.store.dispatch(selectFieldActions.loadRemoteFieldConfig({ fieldId, fieldConfig }));
    }

    if (fieldConfig.remoteOptions && !fieldConfig.remoteConfig) {
      this.store.dispatch(selectFieldActions.loadSelectFieldOptions({ fieldId, fieldConfig }));
    }
  }

  setSelectFieldOptions(fieldId: string, options: IccOptionType[]): void {
    this.store.dispatch(selectFieldActions.loadSelectFieldOptionsSuccess({ fieldId, options }));
  }

  clearSelectFieldStore(fieldId: string): void {
    this.store.dispatch(selectFieldActions.clearSelectFieldStore({ fieldId }));
  }

  getViewportReady(fieldId: string): Signal<boolean> {
    return this.store.selectSignal(selectViewportReady(fieldId));
  }

  getFieldConfig(fieldId: string): Signal<IccSelectFieldConfig> {
    return this.store.selectSignal(selectFieldConfig(fieldId));
  }

  getSetting(fieldId: string): Signal<IccSelectFieldSetting> {
    return this.store.selectSignal(selectFieldSetting(fieldId));
  }

  getOptions(fieldId: string): Signal<IccOptionType[]> {
    return this.store.selectSignal(selectOptions(fieldId));
  }

  selectSetting(fieldId: string): Observable<IccSelectFieldSetting | undefined> {
    return this.store.select(selectFieldSetting(fieldId));
  }

  selectFieldConfig(fieldId: string): Observable<IccSelectFieldConfig | undefined> {
    return this.store.select(selectFieldConfig(fieldId));
  }

  selectOptions(fieldId: string): Observable<IccOptionType[]> {
    return this.store.select(selectOptions(fieldId));
  }
}
