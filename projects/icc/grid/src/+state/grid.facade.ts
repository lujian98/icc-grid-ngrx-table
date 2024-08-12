import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { IccColumnConfig } from '../models/grid-column.model';
import * as gridActions from './grid.actions'
/*
import {
  selectAuditLogs,
  selectTotal,
  isLoaded,
  selectLastGridStates,
  selectIsDownloadAuditLogs,
} from './audit-log.selectors';
 */

@Injectable()
export class IccGridFacade {
  private store = inject(Store);



  setupGridConfig(gridName: string): void {
    this.store.dispatch(gridActions.setupGridConfig({ gridName }));
  }

  setupGridColumnConfig(gridName: string, columnConfig: IccColumnConfig[]): void {
    this.store.dispatch(gridActions.setupGridColumnConfig({ gridName, columnConfig }));
  }
  /*
  auditLogs$ = this.store.select(selectAuditLogs);
  total$ = this.store.select(selectTotal);
  isLoaded$ = this.store.select(isLoaded);
  lastGridStates$ = this.store.select(selectLastGridStates);
  isDownloadAuditLogs$ = this.store.select(selectIsDownloadAuditLogs);

  getAuditLogs(loadParams?: SunLoadRecordParams): void {
    this.store.dispatch(auditLogActions.getAuditLog({ loadParams }));
  }

  saveLastGridStates(gridStates: SunGridState): void {
    this.store.dispatch(auditLogActions.saveLastGridStates({ gridStates }));
  }

  downloadAuditLogs(): void {
    this.store.dispatch(auditLogActions.downloadAuditLogs());
  }*/
}
