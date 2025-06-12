import { inject, Injectable, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { IccOptionType, IccSelectFieldConfig, IccSelectFieldSetting } from '../models/select-field.model';
import * as selectFieldActions from './select-field.actions';
import { selectFieldConfig, selectFieldSetting, selectOptions } from './select-field.selectors';

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

  getFieldConfig(fieldId: string): Signal<IccSelectFieldConfig> {
    return this.store.selectSignal(selectFieldConfig(fieldId));
  }

  getOptions(fieldId: string): Signal<IccOptionType[]> {
    return this.store.selectSignal(selectOptions(fieldId));
  }

  getSetting(fieldId: string): Signal<IccSelectFieldSetting | undefined> {
    return this.store.selectSignal(selectFieldSetting(fieldId));
  }
}
