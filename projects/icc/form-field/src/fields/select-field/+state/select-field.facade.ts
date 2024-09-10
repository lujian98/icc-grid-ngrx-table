import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IccSelectFieldConfig } from '../models/select-field.model';
import * as selectFieldActions from './select-field.actions';
import { selectFieldConfig, selectOptions } from './select-field.selectors';

@Injectable()
export class IccSelectFieldFacade {
  private store = inject(Store);

  initFieldConfig(fieldId: string, fieldConfig: IccSelectFieldConfig): void {
    this.store.dispatch(selectFieldActions.initFieldConfig({ fieldConfig }));
    if (fieldConfig.remoteConfig) {
      this.store.dispatch(selectFieldActions.loadRemoteFieldConfig({ fieldConfig }));
    }

    if (fieldConfig.remoteOptions && !fieldConfig.remoteConfig) {
      this.store.dispatch(selectFieldActions.loadSelectFieldOptions({ fieldConfig }));
    }
  }

  setSelectFieldOptions(fieldId: string, options: any[]): void {
    this.store.dispatch(selectFieldActions.loadSelectFieldOptionsSuccess({ fieldId, options }));
  }

  clearSelectFieldStore(fieldId: string): void {
    this.store.dispatch(selectFieldActions.clearSelectFieldStore({ fieldId }));
  }

  selectFieldConfig(fieldId: string): Observable<IccSelectFieldConfig | undefined> {
    return this.store.select(selectFieldConfig(fieldId));
  }

  selectOptions(fieldId: string): Observable<any[]> {
    return this.store.select(selectOptions(fieldId));
  }
}
