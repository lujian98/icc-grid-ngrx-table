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

  setupGridConfig(gridConfig: IccGridConfig): void {
    this.store.dispatch(gridActions.setupGridConfig({ gridConfig }));
  }

  setupGridColumnsConfig(gridConfig: IccGridConfig, columnsConfig: IccColumnConfig[]): void {
    this.store.dispatch(gridActions.setupGridColumnsConfig({ gridConfig, columnsConfig }));
  }

  setGridColumnsConfig(gridConfig: IccGridConfig, columnsConfig: IccColumnConfig[]): void {
    this.store.dispatch(gridActions.setupGridColumnsConfigSuccess({ gridConfig, columnsConfig }));
  }

  setViewportPageSize(gridId: string, pageSize: number, viewportWidth: number): void {
    this.store.dispatch(gridActions.setViewportPageSize({ gridId, pageSize, viewportWidth }));
  }

  setGridSortFields(gridId: string, sortFields: IccSortField[]): void {
    this.store.dispatch(gridActions.setGridSortFields({ gridId, sortFields }));
    this.getGridData(gridId);
  }

  setGridColumnFilters(gridId: string, columnFilters: IccColumnFilter[]): void {
    this.store.dispatch(gridActions.setGridColumnFilters({ gridId, columnFilters }));
    this.getGridData(gridId);
  }

  setGridColumnConfig(gridId: string, columnsConfig: IccColumnConfig): void {
    this.store.dispatch(gridActions.setGridColumnsConfig({ gridId, columnsConfig }));
  }

  getGridPageData(gridId: string, page: number): void {
    console.log(' 222222 getGridPageData');
    this.store.dispatch(gridActions.setViewportPage({ gridId, page }));
    this.getGridData(gridId);
  }

  getGridData(gridId: string): void {
    console.log(' 11111 getGridData');
    this.store.dispatch(gridActions.getGridData({ gridId }));
  }

  setGridData(gridId: string, gridData: IccGridData<any>): void {
    this.store.dispatch(gridActions.getGridDataSuccess({ gridId, gridData }));
  }

  setGridInMemoryData(gridId: string, gridData: IccGridData<any>): void {
    this.store.dispatch(gridActions.setGridInMemoryData({ gridId, gridData }));
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

  selectGridData(gridId: string): Observable<any[]> {
    return this.store.select(selectGridData(gridId));
  }

  selectGridInMemoryData(gridId: string): Observable<any[]> {
    return this.store.select(selectGridInMemoryData(gridId));
  }
}
