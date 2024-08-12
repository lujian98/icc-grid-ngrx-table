import { createAction, props } from '@ngrx/store';
//import { SunLoadRecordParams, SunGridState } from 'sunbird-seven-ui';
//import { CreateDownload } from '../models/download.model';
//import { AuditLog } from '../models/audit-log.model';

export const getAuditLog = createAction(
  '[AuditLog] Get Audit Log',
  //props<{ loadParams?: SunLoadRecordParams }>()
);

export const getAuditLogSuccess = createAction(
  '[AuditLog] Get Audit Log Success',
  /*
  props<{
    auditLogs: AuditLog[];
    total: number;
    loadParams: SunLoadRecordParams;
  }>()*/
);

export const getAuditLogFailure = createAction(
  '[AuditLog] Get Audit Log Failure',
  props<{ errors: any }>()
);
