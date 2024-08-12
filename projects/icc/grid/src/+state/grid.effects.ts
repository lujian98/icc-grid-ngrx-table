import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BehaviorSubject, concat, of, Observable, Subject } from 'rxjs';
import {
  catchError,
  concatMap,
  debounceTime,
  distinctUntilChanged,
  delay,
  map,
  mergeMap,
  skip,
  switchMap,
  tap,
  takeUntil,
} from 'rxjs/operators';
//import { AuditLogService } from '../services/audit-log.service';
//import * as auditLogActions from './audit-log.actions';
//import { CreateDownload, DownloadJob } from '../models/download.model';

@Injectable()
export class IccGridEffects {
  private actions$ = inject(Actions);
  //private auditLogService = inject(AuditLogService);


}
