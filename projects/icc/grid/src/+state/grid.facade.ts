import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IccColumnConfig, IccGridConfig } from '../models/grid-column.model';
import * as gridActions from './grid.actions'
import { selectGridConfig, selectColumnConfig, selectGridData, } from './grid.selectors';

@Injectable()
export class IccGridFacade {
  private store = inject(Store);

  setupGridConfig(gridConfig: IccGridConfig): void {
    this.store.dispatch(gridActions.setupGridConfig({ gridConfig }));
  }

  setupGridColumnConfig(gridName: string, columnConfig: IccColumnConfig[]): void {
    this.store.dispatch(gridActions.setupGridColumnConfig({ gridName, columnConfig }));
  }

  setViewportPageSize(gridName: string, pageSize: number): void {
    this.store.dispatch(gridActions.setViewportPageSize({ gridName, pageSize }));
  }

  getGridPageData(gridName: string, page: number): void {
    this.store.dispatch(gridActions.setViewportPage({ gridName, page }));
    this.getGridData(gridName);
  }

  getGridData(gridName: string): void {
    this.store.dispatch(gridActions.getGridData({ gridName }));
  }

  selectGridConfig(gridName: string): Observable<IccGridConfig> {
    return this.store.select(selectGridConfig(gridName));
  }

  selectColumnConfig(gridName: string): Observable<IccColumnConfig[]> {
    return this.store.select(selectColumnConfig(gridName));
  }

  selectGridData(gridName: string): Observable<any[]> {
    return this.store.select(selectGridData(gridName));
  }
}
