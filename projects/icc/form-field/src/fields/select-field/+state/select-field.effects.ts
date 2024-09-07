import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { map, switchMap } from 'rxjs/operators';

//import { IccSelectFieldService } from '../services/selectfield.service';
import * as selectFieldActions from './select-field.actions';
import { IccSelectFieldFacade } from './select-field.facade';

@Injectable()
export class IccSelectFieldEffects {
  private actions$ = inject(Actions);
  private selectfieldFacade = inject(IccSelectFieldFacade);
  //private selectfieldService = inject(IccSelectFieldService);
  //private selectfieldinMemoryService = inject(IccSelectFieldinMemoryService);

  /*
  setupSelectFieldConfig$ = createEffect(() =>
    this.actions$.pipe(
      ofType(selectFieldActions.setupSelectFieldConfig),
      switchMap((action) => {
        const selectfieldName = action.selectfieldConfig.selectfieldName;
        return this.selectfieldService.getSelectFieldConfig(selectfieldName, action.selectfieldConfig).pipe(
          map((selectfieldConfig) => {
            return selectFieldActions.setupSelectFieldConfigSuccess({ selectfieldName, selectfieldConfig });
          }),
        );
      }),
    ),
  );
*/

  /*
  getSelectFieldData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(selectfieldActions.getSelectFieldData),
      concatLatestFrom((action) => {
        return [
          this.selectfieldFacade.selectSelectFieldConfig(action.selectfieldName),
          this.selectfieldFacade.selectColumnsConfig(action.selectfieldName),
          this.selectfieldFacade.selectSelectFieldInMemoryData(action.selectfieldName),
        ];
      }),
      switchMap(([action, selectfieldConfig, columns, inMemoryData]) => {
        const selectfieldName = action.selectfieldName;
        if (selectfieldConfig.remoteSelectFieldData) {
          return this.selectfieldService.getSelectFieldData(selectfieldConfig, columns).pipe(
            map((selectfieldData) => {
              return selectfieldActions.getSelectFieldDataSuccess({ selectfieldName, selectfieldData });
            }),
          );
        } else {
          return this.selectfieldinMemoryService.getSelectFieldData(selectfieldConfig, columns, inMemoryData).pipe(
            map((selectfieldData) => {
              return selectfieldActions.getSelectFieldDataSuccess({ selectfieldName, selectfieldData });
            }),
          );
        }
      }),
    ),
  );
  */
}
