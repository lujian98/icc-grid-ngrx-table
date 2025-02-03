import { SelectionModel } from '@angular/cdk/collections';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  IccColumnConfig,
  IccColumnFilter,
  IccGridConfig,
  IccGridData,
  IccRowGroupField,
  IccSortField,
} from '../models/grid-column.model';
import { IccRowGroup } from '../services/row-group/row-group';
import { IccRowGroups } from '../services/row-group/row-groups';
import * as gridActions from './grid.actions';
import {
  selectColumnsConfig,
  selectGridConfig,
  selectGridData,
  selectGridInMemoryData,
  selectRowGroups,
  selectRowSelection,
  selectRowSelections,
} from './grid.selectors';

@Injectable()
export class IccGridFacade {
  private store = inject(Store);

  initGridConfig(gridConfig: IccGridConfig): void {
    this.store.dispatch(gridActions.initGridConfig({ gridConfig }));
    if (gridConfig.remoteGridConfig) {
      this.store.dispatch(gridActions.loadGridConfig({ gridConfig }));
    } else if (gridConfig.remoteColumnsConfig) {
      this.store.dispatch(gridActions.loadGridColumnsConfig({ gridConfig }));
    } else if (gridConfig.rowGroupField) {
      this.initRowGroup(gridConfig);
    }
  }

  initRowGroup(gridConfig: IccGridConfig): void {
    if (gridConfig.rowGroupField) {
      this.setGridGroupBy(gridConfig, gridConfig.rowGroupField);
    }
  }

  setGridColumnsConfig(gridConfig: IccGridConfig, columnsConfig: IccColumnConfig[]): void {
    this.store.dispatch(gridActions.loadGridColumnsConfigSuccess({ gridConfig, columnsConfig }));
    this.getGridData(gridConfig);
  }

  setViewportPageSize(gridConfig: IccGridConfig, pageSize: number, viewportWidth: number, loadData: boolean): void {
    this.store.dispatch(gridActions.setViewportPageSize({ gridConfig, pageSize, viewportWidth }));
    if (gridConfig.viewportReady && loadData) {
      this.getGridData(gridConfig);
    }
  }

  setGridSortFields(gridConfig: IccGridConfig, sortFields: IccSortField[], checkSort: boolean = true): void {
    if (checkSort) {
      sortFields = this.checkGroupSortField(gridConfig, sortFields);
    }
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

  setSelectAllRows(gridConfig: IccGridConfig, selectAll: boolean): void {
    this.store.dispatch(gridActions.setSelectAllRows({ gridConfig, selectAll }));
  }

  setSelectRows(gridConfig: IccGridConfig, records: object[], select: boolean): void {
    this.store.dispatch(gridActions.setSelectRows({ gridConfig, records, select }));
  }

  setSelectRow(gridConfig: IccGridConfig, record: object): void {
    this.store.dispatch(gridActions.setSelectRow({ gridConfig, record }));
  }

  setGridGroupBy(gridConfig: IccGridConfig, rowGroupField: IccRowGroupField): void {
    this.store.dispatch(gridActions.setGridUnGroupBy({ gridConfig }));
    const sortFields = this.getGroupSortField(gridConfig, rowGroupField);
    this.store.dispatch(gridActions.setGridGroupBy({ gridConfig, rowGroupField }));
    this.setGridSortFields(gridConfig, sortFields, false);
  }

  private checkGroupSortField(gridConfig: IccGridConfig, sortFields: IccSortField[]): IccSortField[] {
    if (gridConfig.rowGroupField) {
      const find = sortFields.find((column) => column.field === gridConfig.sortFields[0].field);
      if (!find) {
        return [...[gridConfig.sortFields[0]], ...[sortFields[0]]];
      }
    }
    return sortFields;
  }

  private getGroupSortField(gridConfig: IccGridConfig, rowGroupField: IccRowGroupField): IccSortField[] {
    const sortFields = gridConfig.sortFields;
    const find = sortFields.find((column) => column.field === rowGroupField.field);
    if (find) {
      if (sortFields.length > 1) {
        const sort = sortFields.filter((column) => column.field !== rowGroupField.field)[0];
        return [...[find], ...[sort]];
      } else {
        return [find];
      }
    } else {
      return [
        {
          field: rowGroupField.field,
          dir: rowGroupField.dir,
        },
      ];
    }
  }

  setToggleRowGroup(gridConfig: IccGridConfig, rowGroup: IccRowGroup): void {
    this.store.dispatch(gridActions.setToggleRowGroup({ gridConfig, rowGroup }));
  }

  setGridUnGroupBy(gridConfig: IccGridConfig): void {
    this.store.dispatch(gridActions.setGridUnGroupBy({ gridConfig }));
  }

  getGridPageData(gridConfig: IccGridConfig, page: number): void {
    this.store.dispatch(gridActions.setViewportPage({ gridConfig, page }));
    this.getGridData(gridConfig);
  }

  getGridData(gridConfig: IccGridConfig): void {
    if (!gridConfig.isTreeGrid) {
      this.store.dispatch(gridActions.getGridData({ gridConfig }));
    }
  }

  setGridData(gridConfig: IccGridConfig, gridData: IccGridData<object>): void {
    this.store.dispatch(gridActions.getGridDataSuccess({ gridConfig, gridData }));
  }

  setGridInMemoryData(gridConfig: IccGridConfig, gridData: IccGridData<object>): void {
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

  selectGridData(gridConfig: IccGridConfig): Observable<object[]> {
    return this.store.select(selectGridData(gridConfig)) as Observable<object[]>;
  }

  selectRowSelection<T>(gridConfig: IccGridConfig): Observable<SelectionModel<object>> {
    return this.store.select(selectRowSelection(gridConfig));
  }

  selectRowSelections(
    gridConfig: IccGridConfig,
  ): Observable<{ selection: SelectionModel<object>; allSelected: boolean; indeterminate: boolean }> {
    return this.store.select(selectRowSelections(gridConfig));
  }

  selectRowGroups(gridConfig: IccGridConfig): Observable<IccRowGroups | boolean> {
    return this.store.select(selectRowGroups(gridConfig));
  }

  selectGridInMemoryData<T>(gridConfig: IccGridConfig): Observable<T[]> {
    return this.store.select(selectGridInMemoryData(gridConfig)) as Observable<T[]>;
  }
}
