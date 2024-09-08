import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { IccSelectFieldConfig } from '../models/select-field.model';
import * as selectFieldActions from './select-field.actions';
import { selectFieldConfig, selectOptions } from './select-field.selectors';

@Injectable()
export class IccSelectFieldFacade {
  private store = inject(Store);
  selectFieldConfig$ = this.store.select(selectFieldConfig);
  selectOptions$ = this.store.select(selectOptions);

  setupFieldConfig(fieldConfig: IccSelectFieldConfig): void {
    this.store.dispatch(selectFieldActions.setupFieldConfig({ fieldConfig }));
    if (fieldConfig.remoteOptions) {
      this.store.dispatch(selectFieldActions.getSelectFieldOptions({ fieldConfig }));
    }
  }

  setSelectFieldOptions(options: any[]): void {
    this.store.dispatch(selectFieldActions.setSelectFieldOptions({ options }));
  }
}
