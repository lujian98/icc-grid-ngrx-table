import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IccColumnConfig, IccGridConfig, IccGridData, IccSortField, IccColumnFilter } from '../models/grid-column.model';
import * as gridActions from './grid.actions'
import { selectGridConfig, selectColumnsConfig, selectGridData, selectGridInMemoryData} from './grid.selectors';

@Injectable()
export class IccGridFacade {
  private store = inject(Store);

  setupGridConfig(gridConfig: IccGridConfig): void {
    this.store.dispatch(gridActions.setupGridConfig({ gridConfig }));
  }

  setupGridColumnsConfig(gridName: string, columnsConfig: IccColumnConfig[]): void {
    this.store.dispatch(gridActions.setupGridColumnsConfig({ gridName, columnsConfig }));
  }

  setGridColumnsConfig(gridName: string, columnsConfig: IccColumnConfig[]): void {
    this.store.dispatch(gridActions.setupGridColumnsConfigSuccess({ gridName, columnsConfig }));
  }

  setViewportPageSize(gridName: string, pageSize: number, viewportWidth: number): void {
    this.store.dispatch(gridActions.setViewportPageSize({ gridName, pageSize, viewportWidth }));
  }

  setViewportScrollY(gridName: string, hasScrollY: boolean): void {
    this.store.dispatch(gridActions.setViewportScrollY({ gridName, hasScrollY }));
  }

  setGridSortFields(gridName: string, sortFields: IccSortField[]): void {
    this.store.dispatch(gridActions.setGridSortFields({ gridName, sortFields }));
    this.getGridData(gridName);
  }

  setGridColumnFilters(gridName: string, columnFilters: IccColumnFilter[]): void {
    this.store.dispatch(gridActions.setGridColumnFilters({ gridName, columnFilters }));
    this.getGridData(gridName);
  }

  setGridColumnConfig(gridName: string, columnsConfig: IccColumnConfig): void {
    this.store.dispatch(gridActions.setGridColumnsConfig({ gridName, columnsConfig }));
  }

  getGridPageData(gridName: string, page: number): void {
    this.store.dispatch(gridActions.setViewportPage({ gridName, page }));
    this.getGridData(gridName);
  }

  getGridData(gridName: string): void {
    this.store.dispatch(gridActions.getGridData({ gridName }));
  }

  setGridData(gridName: string, gridData: IccGridData<any>): void {
    this.store.dispatch(gridActions.getGridDataSuccess({ gridName, gridData }));
  }

  setGridInMemoryData(gridName: string, gridData: IccGridData<any>): void {
    this.store.dispatch(gridActions.setGridInMemoryData({ gridName, gridData }));
  }

  clearGridDataStore(gridName: string): void {
    this.store.dispatch(gridActions.clearGridDataStore({ gridName }));
  }

  selectGridConfig(gridName: string): Observable<IccGridConfig> {
    return this.store.select(selectGridConfig(gridName));
  }

  selectColumnsConfig(gridName: string): Observable<IccColumnConfig[]> {
    return this.store.select(selectColumnsConfig(gridName));
  }

  selectGridData(gridName: string): Observable<any[]> {
    return this.store.select(selectGridData(gridName));
  }

  selectGridInMemoryData(gridName: string): Observable<any[]> {
    return this.store.select(selectGridInMemoryData(gridName));
  }
}
