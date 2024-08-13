import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { IccColumnConfig } from '../models/grid-column.model';
import * as gridActions from './grid.actions'
import { IccGridConfig } from './grid.reducer';
/*
import {
  selectAuditLogs,
  selectTotal,
  isLoaded,
  selectLastGridStates,
  selectIsDownloadAuditLogs,
} from './audit-log.selectors';
 */

import { selectGridConfig, selectColumnConfig } from './grid.selectors';

@Injectable()
export class IccGridFacade {
  private store = inject(Store);



  setupGridConfig(gridName: string): void {
    this.store.dispatch(gridActions.setupGridConfig({ gridName }));
  }

  setupGridColumnConfig(gridName: string, columnConfig: IccColumnConfig[]): void {
    this.store.dispatch(gridActions.setupGridColumnConfig({ gridName, columnConfig }));
  }

  selectGridConfig(gridName: string): Observable<IccGridConfig> {
    return this.store.select(selectGridConfig(gridName));
  }

  selectColumnConfig(gridName: string): Observable<IccColumnConfig[]> {
    return this.store.select(selectColumnConfig(gridName));
  }
}
