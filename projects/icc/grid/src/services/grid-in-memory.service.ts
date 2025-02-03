import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  IccColumnConfig,
  IccColumnFilter,
  IccGridConfig,
  IccGridData,
  IccSortField,
} from '../models/grid-column.model';
import { IccFilterFactory } from './filter/filter_factory';
import { IccRansackFilterFactory } from './ransack/filter/filter_factory';
import { sortByField } from '@icc/ui/core';

export interface IccInMemoryFilterValue {
  key: string;
  value: string | string[];
}

@Injectable({
  providedIn: 'root',
})
export class IccGridinMemoryService {
  getGridData<T>(
    gridConfig: IccGridConfig,
    columns: IccColumnConfig[],
    inMemoryData: T[],
  ): Observable<IccGridData<any>> {
    //console.log('grid service inMemoryData=', inMemoryData);
    const filterParams = this.getFilterParams(gridConfig.columnFilters, columns);
    const filteredData = this.getFilteredData([...inMemoryData], filterParams);
    const sortedData = this.getSortedData(filteredData, gridConfig.sortFields);
    //console.log('grid sortedData=', sortedData);
    //this.getTreeNodes(sortedData);
    const offset = (gridConfig.page - 1) * gridConfig.pageSize;
    const limit = gridConfig.pageSize;
    //console.log( 'offset, limit=', offset, limit)
    const offsetData = this.getOffsetData(sortedData, offset, limit);
    return of({
      data: offsetData,
      totalCounts: filteredData.length,
    });
  }

  protected getFilteredData(data: any[], filterParams: any[]) {
    [...filterParams].forEach((params) => {
      const key = params.key;
      if (key.indexOf('_') > 1) {
        const compareKey = this.getCompareKey(key);
        const filterKey = key.substring(0, key.length - compareKey.length - 1);
        const searches = params.value;
        //console.log( ' value=', searches)
        const search =
          ['in[]', 'in', 'null', 'not_null'].indexOf(compareKey) === -1 ? searches.toLowerCase() : searches;

        //console.log( ' filterKey=', filterKey)
        //console.log( ' value=', search)
        data = data.filter((item) => {
          const val = item[filterKey];
          const value = this.getTypedValue(search, val, val);
          const filter = this.getTypedValue(search, val, search);
          switch (compareKey) {
            case 'cont':
              return value && value.toString().toLowerCase().includes(filter.toString());
            case 'i_cont':
              return value && value.toString().toLowerCase().includes(filter.toString().toLowerCase());
            case 'in':
            case 'in[]':
              return searches.includes(val);
            case 'eq':
              return value === filter;
            case 'not_null':
              return value !== null;
            case 'null':
              return value === null;
            case 'gteq':
              return value >= filter;
            case 'gt':
              return value > filter;
            case 'lteq':
              return value <= filter;
            case 'lt':
              return value < filter;
            case 'start':
              return value && value.toString().startsWith(filter.toString());
            case 'end':
              return value && value.toString().endsWith(filter.toString());
          }
        });
      }
    });
    return data;
  }

  private getCompareKey(key: string): string {
    const fKey = key.split('_');
    const compareKey = fKey[fKey.length - 1];
    if (compareKey === 'null' && fKey[fKey.length - 2] === 'not') {
      return 'not_null';
    } else if (compareKey === 'cont' && fKey[fKey.length - 2] === 'i') {
      return 'i_cont';
    } else {
      return compareKey;
    }
  }

  private getOffsetData<T>(data: T[], offset: number, limit: number): T[] {
    const begin = Number(offset);
    const end = Number(limit) + begin;
    const length = data.length;
    return data.slice(begin, end > length ? length : end);
  }

  private getSortedData<T>(data: T[], sorts: IccSortField[]) {
    if (sorts && sorts.length > 0) {
      sorts.reverse().forEach((sort) => {
        data = sortByField(data, sort.field, sort.dir);
      });
      sorts.reverse();
    }
    return data;
  }

  private getTypedValue(search: string, val: string, value: string): string | number | Date {
    if (value) {
      search = decodeURIComponent(search);
      value = decodeURIComponent(value);
      if (this.isNumeric(search) && this.isNumeric(val)) {
        return Number(value);
      } else if (this.isDate(search) && this.isDate(val)) {
        return new Date(value);
      }
    }
    return value;
  }

  private isDate(date: string): boolean {
    return !isNaN(Date.parse(date));
  }

  private isNumeric(num: number | string): boolean {
    return (typeof num === 'number' || (typeof num === 'string' && num.trim() !== '')) && !isNaN(num as number);
  }

  protected getFilterParams<T>(columnFilters: IccColumnFilter[], columns: IccColumnConfig[]): IccInMemoryFilterValue[] {
    const params: IccInMemoryFilterValue[] = [];
    const ransackFilterFactory = new IccRansackFilterFactory();
    const filterFactory = new IccFilterFactory();
    columnFilters.forEach((col) => {
      const column = columns.find((item) => item.name === col.name);
      const filter = filterFactory.getFilter(column!);
      filter.search = col.value;
      const ransackFilter = ransackFilterFactory.getFilter(filter);
      const filterParams = ransackFilter.getParams();
      if (filterParams && filterParams.length > 0) {
        filterParams.forEach((pairs: { [index: string]: any }) => {
          Object.keys(pairs).forEach((key) => {
            let value = pairs[key];
            value = value || value === 0 ? value.toString() : '';
            params.push({
              key: key,
              value: value,
            });
          });
        });
      }
    });
    return params;
  }
}
