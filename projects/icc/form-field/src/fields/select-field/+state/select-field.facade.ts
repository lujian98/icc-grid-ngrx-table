import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IccSelectFieldConfig } from '../models/select-field.model';
import * as selectFieldActions from './select-field.actions';
import { selectFieldConfig } from './select-field.selectors';

@Injectable()
export class IccSelectFieldFacade {
  private store = inject(Store);
  selectFieldConfig$ = this.store.select(selectFieldConfig);

  setupFieldConfig(fieldConfig: IccSelectFieldConfig): void {
    this.store.dispatch(selectFieldActions.setupFieldConfig({ fieldConfig }));
  }

  /*
  selectFieldConfig(): Observable<IccSelectFieldConfig> {
    return this.store.select(selectFieldConfig);
  }*/
}
