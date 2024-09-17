import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IccFormPanelConfig } from '../models/form-panel.model';
import * as formPanelActions from './form-panel.actions';
import { selectFormPanelConfig } from './form-panel.selectors';

@Injectable()
export class IccFormPanelFacade {
  private store = inject(Store);

  initformPanelConfig(formPanelConfig: IccFormPanelConfig): void {
    this.store.dispatch(formPanelActions.initFormPanelConfig({ formPanelConfig }));
    /*
    if (formPanelConfig.remoteformPanelConfig) {
      this.store.dispatch(formPanelActions.loadformPanelConfig({ formPanelConfig }));
    } else if (formPanelConfig.remoteColumnsConfig) {
      this.store.dispatch(formPanelActions.loadformPanelColumnsConfig({ formPanelConfig }));
    }*/
  }

  clearformPanelDataStore(formPanelId: string): void {
    this.store.dispatch(formPanelActions.clearFormPanelDataStore({ formPanelId }));
  }

  selectFormPanelConfig(formPanelId: string): Observable<IccFormPanelConfig> {
    return this.store.select(selectFormPanelConfig(formPanelId));
  }
}
