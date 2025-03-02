import { SelectionModel } from '@angular/cdk/collections';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  IccColumnConfig,
  IccColumnFilter,
  IccGridConfig,
  IccGridSetting,
  IccGridData,
  IccRowGroupField,
  IccSortField,
  IccCellEdit,
} from '../models/grid-column.model';
import { IccRowGroup } from '../services/row-group/row-group';
import { IccRowGroups } from '../services/row-group/row-groups';
import * as gridActions from './grid.actions';
import {
  selectColumnsConfig,
  selectGridConfig,
  selectGridSetting,
  selectGridData,
  selectGridInMemoryData,
  selectRowGroups,
  selectRowSelection,
  selectRowSelections,
  selectGridModifiedRecords,
} from './grid.selectors';

@Injectable()
export class IccGridFacade {
  private store = inject(Store);

  initGridConfig(gridId: string, gridConfig: IccGridConfig, gridType: string): void {
    this.store.dispatch(gridActions.initGridConfig({ gridId, gridConfig, gridType }));
    if (gridConfig.remoteGridConfig) {
      this.store.dispatch(gridActions.loadGridConfig({ gridId, gridConfig }));
    } else if (gridConfig.remoteColumnsConfig) {
      this.store.dispatch(gridActions.loadGridColumnsConfig({ gridId }));
    } else if (gridConfig.rowGroupField) {
      this.initRowGroup(gridId, gridConfig);
    }
  }

  initRowGroup(gridId: string, gridConfig: IccGridConfig): void {
    if (gridConfig.rowGroupField) {
      this.setGridGroupBy(gridId, gridConfig, gridConfig.rowGroupField);
    }
  }

  setGridColumnsConfig(gridConfig: IccGridConfig, gridSetting: IccGridSetting, columnsConfig: IccColumnConfig[]): void {
    const gridId = gridSetting.gridId;
    const isTreeGrid = gridSetting.isTreeGrid;
    this.store.dispatch(gridActions.loadGridColumnsConfigSuccess({ gridId, gridConfig, isTreeGrid, columnsConfig }));
  }

  setViewportPageSize(
    gridConfig: IccGridConfig,
    gridSetting: IccGridSetting,
    pageSize: number,
    viewportWidth: number,
    loadData: boolean,
  ): void {
    const gridId = gridSetting.gridId;
    this.store.dispatch(gridActions.setViewportPageSize({ gridId, gridConfig, pageSize, viewportWidth }));
    if (gridSetting.viewportReady && loadData && !gridSetting.isTreeGrid) {
      this.getGridData(gridId, gridSetting);
    }
  }

  setWindowResize(
    gridConfig: IccGridConfig,
    gridSetting: IccGridSetting,
    pageSize: number,
    viewportWidth: number,
    loadData: boolean,
  ): void {
    const gridId = gridSetting.gridId;
    this.store.dispatch(gridActions.setViewportPageSize({ gridId, gridConfig, pageSize, viewportWidth }));
    if (gridSetting.viewportReady && loadData && !gridSetting.isTreeGrid) {
      this.store.dispatch(gridActions.getConcatGridData({ gridId }));
    }
  }

  setGridSortFields(gridConfig: IccGridConfig, gridSetting: IccGridSetting, sortFields: IccSortField[]): void {
    const gridId = gridSetting.gridId;
    const isTreeGrid = gridSetting.isTreeGrid;
    sortFields = this.checkGroupSortField(gridConfig, sortFields);
    this.store.dispatch(gridActions.setGridSortFields({ gridId, gridConfig, isTreeGrid, sortFields }));
    this.getGridData(gridId, gridSetting);
  }

  setGridColumnFilters(gridConfig: IccGridConfig, gridSetting: IccGridSetting, columnFilters: IccColumnFilter[]): void {
    const gridId = gridSetting.gridId;
    const isTreeGrid = gridSetting.isTreeGrid;
    this.store.dispatch(gridActions.setGridColumnFilters({ gridId, gridConfig, isTreeGrid, columnFilters }));
    if (!gridSetting.columnUpdating) {
      this.getGridData(gridId, gridSetting);
    }
  }

  setGridColumnConfig(gridId: string, columnsConfig: IccColumnConfig): void {
    this.store.dispatch(gridActions.setGridColumnsConfig({ gridId, columnsConfig }));
  }

  setSelectAllRows(gridId: string, selectAll: boolean): void {
    this.store.dispatch(gridActions.setSelectAllRows({ gridId, selectAll }));
  }

  setSelectRows(gridId: string, records: object[], isSelected: boolean, selected: number): void {
    this.store.dispatch(gridActions.setSelectRows({ gridId, records, isSelected, selected }));
  }

  setSelectRow(gridId: string, record: object): void {
    this.store.dispatch(gridActions.setSelectRow({ gridId, record }));
  }

  setGridGroupBy(gridId: string, gridConfig: IccGridConfig, rowGroupField: IccRowGroupField): void {
    this.store.dispatch(gridActions.setGridUnGroupBy({ gridId, gridConfig }));
    const sortFields = this.getGroupSortField(gridConfig, rowGroupField);
    this.store.dispatch(gridActions.setGridGroupBy({ gridId, gridConfig, rowGroupField }));
    const isTreeGrid = false;
    this.store.dispatch(gridActions.setGridSortFields({ gridId, gridConfig, isTreeGrid, sortFields }));
    this.dispatchGridData(gridId);
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

  setToggleRowGroup(gridId: string, rowGroup: IccRowGroup): void {
    this.store.dispatch(gridActions.setToggleRowGroup({ gridId, rowGroup }));
  }

  setGridUnGroupBy(gridId: string, gridConfig: IccGridConfig): void {
    this.store.dispatch(gridActions.setGridUnGroupBy({ gridId, gridConfig }));
  }

  setGridEditable(gridId: string, gridEditable: boolean): void {
    this.store.dispatch(gridActions.setGridEditable({ gridId, gridEditable }));
  }

  setGridRestEdit(gridId: string, restEdit: boolean): void {
    this.store.dispatch(gridActions.setGridRestEdit({ gridId, restEdit }));
  }

  setGridRecordModified(gridId: string, modified: IccCellEdit<unknown>): void {
    this.store.dispatch(gridActions.setGridRecordModified({ gridId, modified }));
  }

  saveGridModifiedRecords(gridId: string): void {
    this.store.dispatch(gridActions.saveGridModifiedRecords({ gridId }));
  }

  getGridPageData(gridId: string, page: number): void {
    this.store.dispatch(gridActions.setViewportPage({ gridId, page }));
    this.dispatchGridData(gridId);
  }

  getGridData(gridId: string, gridSetting: IccGridSetting): void {
    if (!gridSetting.isTreeGrid) {
      this.dispatchGridData(gridId);
    } else {
      this.setLoadTreeDataLoading(gridId, true);
    }
  }

  private dispatchGridData(gridId: string): void {
    this.store.dispatch(gridActions.getGridData({ gridId }));
  }

  // TODO not used???
  private setGridData(gridId: string, gridConfig: IccGridConfig, gridData: IccGridData<object>): void {
    this.store.dispatch(gridActions.getGridDataSuccess({ gridId, gridData }));
  }

  setGridInMemoryData(gridId: string, gridConfig: IccGridConfig, gridData: IccGridData<object>): void {
    this.store.dispatch(gridActions.setGridInMemoryData({ gridId, gridConfig, gridData }));
    this.dispatchGridData(gridId);
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

  selectGridData(gridId: string): Observable<object[]> {
    return this.store.select(selectGridData(gridId)) as Observable<object[]>;
  }

  selectGridModifiedRecords(gridId: string): Observable<{ [key: string]: unknown }[]> {
    return this.store.select(selectGridModifiedRecords(gridId)) as Observable<{ [key: string]: unknown }[]>;
  }

  selectRowSelection<T>(gridId: string): Observable<SelectionModel<object>> {
    return this.store.select(selectRowSelection(gridId));
  }

  selectRowSelections(
    gridId: string,
  ): Observable<{ selection: SelectionModel<object>; allSelected: boolean; indeterminate: boolean }> {
    return this.store.select(selectRowSelections(gridId));
  }

  selectRowGroups(gridId: string): Observable<IccRowGroups | boolean> {
    return this.store.select(selectRowGroups(gridId));
  }

  selectGridInMemoryData<T>(gridId: string): Observable<T[]> {
    return this.store.select(selectGridInMemoryData(gridId)) as Observable<T[]>;
  }

  openButtonClick(gridId: string): void {
    this.store.dispatch(gridActions.openGridFormView({ gridId }));
  }

  rowDblClick(gridId: string, record: object): void {
    this.store.dispatch(gridActions.setSelectRow({ gridId, record }));
    this.store.dispatch(gridActions.openGridFormView({ gridId }));
  }

  setLoadTreeDataLoading(gridId: string, loading: boolean): void {
    this.store.dispatch(gridActions.setLoadTreeDataLoading({ gridId, loading }));
  }

  runTask(setting: IccGridSetting): void {
    this.store.dispatch(gridActions.getConcatGridData({ gridId: setting.gridId }));
  }

  selectSetting(gridId: string): Observable<IccGridSetting> {
    return this.store.select(selectGridSetting(gridId));
  }
}
