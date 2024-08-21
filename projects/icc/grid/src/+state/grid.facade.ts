import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IccColumnConfig, IccGridConfig, IccSortField, IccColumnFilter } from '../models/grid-column.model';
import * as gridActions from './grid.actions'
import { selectGridConfig, selectColumnConfig, selectGridData, } from './grid.selectors';

@Injectable()
export class IccGridFacade {
  private store = inject(Store);

  setupGridConfig(gridConfig: IccGridConfig): void {
    this.store.dispatch(gridActions.setupGridConfig({ gridConfig }));
  }

  setupGridColumnsConfig(gridName: string, columnConfig: IccColumnConfig[]): void {
    this.store.dispatch(gridActions.setupGridColumnsConfig({ gridName, columnConfig }));
  }

  setGridColumnsConfig(gridName: string, columnConfig: IccColumnConfig[]): void {
    this.store.dispatch(gridActions.setupGridColumnsConfigSuccess({ gridName, columnConfig }));
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
    console.log( ' new filters = ', columnFilters)
    this.store.dispatch(gridActions.setGridColumnFilters({ gridName, columnFilters }));
    this.getGridData(gridName);
  }

  setGridColumnConfig(gridName: string, columnConfig: IccColumnConfig): void {
    this.store.dispatch(gridActions.setGridColumnConfig({ gridName, columnConfig }));
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
