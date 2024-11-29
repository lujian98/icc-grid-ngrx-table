import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  IccColumnConfig,
  IccGridConfig,
  IccGridData,
  IccSortField,
  IccColumnFilter,
} from '../models/grid-column.model';
import * as gridActions from './grid.actions';
import { selectGridConfig, selectColumnsConfig, selectGridData, selectGridInMemoryData } from './grid.selectors';

@Injectable()
export class IccGridFacade {
  private store = inject(Store);

  initGridConfig(gridConfig: IccGridConfig): void {
    this.store.dispatch(gridActions.initGridConfig({ gridConfig }));
    if (gridConfig.remoteGridConfig) {
      this.store.dispatch(gridActions.loadGridConfig({ gridConfig }));
    } else if (gridConfig.remoteColumnsConfig) {
      this.store.dispatch(gridActions.loadGridColumnsConfig({ gridConfig }));
    }
  }

  setGridColumnsConfig(gridConfig: IccGridConfig, columnsConfig: IccColumnConfig[]): void {
    this.store.dispatch(gridActions.loadGridColumnsConfigSuccess({ gridConfig, columnsConfig }));
  }

  setViewportPageSize(gridConfig: IccGridConfig, pageSize: number, viewportWidth: number): void {
    this.store.dispatch(gridActions.setViewportPageSize({ gridConfig, pageSize, viewportWidth }));
    if (gridConfig.viewportReady && !gridConfig.isTreeGrid) {
      this.getGridData(gridConfig);
    }
  }

  setGridSortFields(gridConfig: IccGridConfig, sortFields: IccSortField[]): void {
    this.store.dispatch(gridActions.setGridSortFields({ gridConfig, sortFields }));
    this.getGridData(gridConfig);
  }

  setGridColumnFilters(gridConfig: IccGridConfig, columnFilters: IccColumnFilter[]): void {
    this.store.dispatch(gridActions.setGridColumnFilters({ gridConfig, columnFilters }));
    this.getGridData(gridConfig);
  }

  setGridColumnConfig(gridConfig: IccGridConfig, columnsConfig: IccColumnConfig): void {
    this.store.dispatch(gridActions.setGridColumnsConfig({ gridConfig, columnsConfig }));
  }

  getGridPageData(gridConfig: IccGridConfig, page: number): void {
    this.store.dispatch(gridActions.setViewportPage({ gridConfig, page }));
    this.getGridData(gridConfig);
  }

  getGridData(gridConfig: IccGridConfig): void {
    this.store.dispatch(gridActions.getGridData({ gridConfig }));
  }

  setGridData(gridConfig: IccGridConfig, gridData: IccGridData<any>): void {
    this.store.dispatch(gridActions.getGridDataSuccess({ gridConfig, gridData }));
  }

  setGridInMemoryData(gridConfig: IccGridConfig, gridData: IccGridData<any>): void {
    this.store.dispatch(gridActions.setGridInMemoryData({ gridConfig, gridData }));
    this.getGridData(gridConfig);
  }

  clearGridDataStore(gridId: string): void {
    this.store.dispatch(gridActions.clearGridDataStore({ gridId }));
  }

  selectGridConfig(gridId: string): Observable<IccGridConfig> {
    return this.store.select(selectGridConfig(gridId));
  }

  selectColumnsConfig(gridId: string): Observable<IccColumnConfig[]> {
    return this.store.select(selectColumnsConfig(gridId));
  }

  selectGridData(gridConfig: IccGridConfig): Observable<any[]> {
    return this.store.select(selectGridData(gridConfig));
  }

  selectGridInMemoryData(gridConfig: IccGridConfig): Observable<any[]> {
    console.log('wwwwwwww selectGridInMemoryData ');
    return this.store.select(selectGridInMemoryData(gridConfig));
  }
}
