import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IccFormConfig } from '../models/form.model';
import * as formActions from './form.actions';
import { selectFormConfig } from './form.selectors';

@Injectable()
export class IccFormFacade {
  private store = inject(Store);

  initFormConfig(formConfig: IccFormConfig): void {
    this.store.dispatch(formActions.initFormConfig({ formConfig }));
    /*
    if (formConfig.remoteformConfig) {
      this.store.dispatch(formActions.loadformConfig({ formConfig }));
    } else if (formConfig.remoteColumnsConfig) {
      this.store.dispatch(formActions.loadformColumnsConfig({ formConfig }));
    }*/
  }

  clearformDataStore(formId: string): void {
    this.store.dispatch(formActions.clearFormDataStore({ formId }));
  }

  selectFormConfig(formId: string): Observable<IccFormConfig> {
    return this.store.select(selectFormConfig(formId));
  }
}
