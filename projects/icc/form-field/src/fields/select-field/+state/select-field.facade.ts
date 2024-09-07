import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
/*
import {
  IccColumnConfig,
  IccSelectFieldConfig,
  IccSelectFieldData,
  IccSortField,
  IccColumnFilter,
} from '../models/selectfield-column.model';
*/
import * as selectFieldActions from './select-field.actions';
//import { selectSelectFieldConfig, selectColumnsConfig, selectSelectFieldData, selectSelectFieldInMemoryData } from './selectfield.selectors';

@Injectable()
export class IccSelectFieldFacade {
  private store = inject(Store);

  /*
  setupSelectFieldConfig(selectfieldConfig: IccSelectFieldConfig): void {
    this.store.dispatch(selectfieldActions.setupSelectFieldConfig({ selectfieldConfig }));
  }*/
}
