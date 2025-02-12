import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  IccColumnConfig,
  IccColumnFilter,
  IccGridConfig,
  IccGridData,
  IccSortField,
} from '../models/grid-column.model';
import { IccFilterFactory } from './filter/filter-factory';
import { IccRansackFilterFactory } from './ransack/filter/filter-factory';
import { sortByField } from '@icc/ui/core';

export interface IccInMemoryFilterValue {
  key: string;
  value: string | string[];
}

export interface IccInMemoryFilters {
  filterKey: string;
  compareKey: string;
  searches: string[];
  search: string;
}

@Injectable({
  providedIn: 'root',
})
export class IccGridinMemoryService {
  getGridData<T>(
    gridConfig: IccGridConfig,
    columns: IccColumnConfig[],
    inMemoryData: T[],
  ): Observable<IccGridData<object>> {
    const filterParams = this.getFilterParams(gridConfig.columnFilters, columns);
    const filteredData = this.getFilteredData([...inMemoryData] as object[], filterParams);
    const sortedData = this.getSortedData(filteredData, gridConfig.sortFields);
    const offset = (gridConfig.page - 1) * gridConfig.pageSize;
    const limit = gridConfig.pageSize;
    const offsetData = this.getOffsetData(sortedData, offset, limit);
    return of({
      data: offsetData,
      totalCounts: filteredData.length,
    });
  }

  protected getFilteredData(data: object[], filterParams: IccInMemoryFilterValue[]) {
    const filters: { [index: string]: IccInMemoryFilters[] } = {};
    [...filterParams].forEach((params) => {
      const key = params.key;
      if (key.indexOf('_') > 1) {
        const compareKey = this.getCompareKey(key);
        const filterKey = key.substring(0, key.length - compareKey.length - 1);
        const searches = params.value;
        const search =
          ['in[]', 'in', 'null', 'not_null'].indexOf(compareKey) === -1 ? searches[0].toLowerCase() : searches;

        if (!filters[filterKey]) {
          filters[filterKey] = [];
        }
        const find = filters[filterKey].find(
          (item: IccInMemoryFilters) => `${item.filterKey}_${item.compareKey}` === `${filterKey}_${compareKey}`,
        );
        if (!find) {
          filters[filterKey].push({
            filterKey,
            compareKey,
            searches,
            search,
          } as IccInMemoryFilters);
        }
      }
    });

    Object.keys(filters).forEach((key) => {
      data = data.filter((item) => {
        return this.getFilterCondition(filters[key], item);
      });
    });
    return data;
  }

  private getFilterCondition(filters: IccInMemoryFilters[], item: object): boolean {
    let ret: boolean | undefined = undefined;

    filters.forEach((query: IccInMemoryFilters) => {
      const filterKey = query.filterKey;
      const compareKey = query.compareKey;
      const searches = query.searches;
      const search = query.search;

      const val = (item as { [index: string]: string })[filterKey];
      const value = this.getTypedValue(search, val, val);
      const filter = this.getTypedValue(search, val, search);
      let newRet: boolean | undefined = undefined;

      switch (compareKey) {
        case 'cont':
          newRet = !!(value && value.toString().toLowerCase().includes(filter.toString()));
          break;
        case 'i_cont':
          newRet = !!(value && value.toString().toLowerCase().includes(filter.toString().toLowerCase()));
          break;
        case 'in':
        case 'in[]':
          newRet = searches.includes(val);
          break;
        case 'eq':
          newRet = value === filter;
          break;
        case 'not_null':
          newRet = value !== null;
          break;
        case 'null':
          newRet = value === null;
          break;
        case 'gteq':
          newRet = value >= filter;
          break;
        case 'gt':
          newRet = value > filter;
          break;
        case 'lteq':
          newRet = value <= filter;
          break;
        case 'lt':
          newRet = value < filter;
          break;
        case 'start':
          newRet = !!(value && value.toString().startsWith(filter.toString()));
          break;
        case 'end':
          newRet = !!(value && value.toString().endsWith(filter.toString()));
          break;
      }
      if (newRet !== undefined) {
        if (ret !== undefined) {
          ret = ret || newRet;
        } else {
          ret = newRet;
        }
      }
    });
    return !!ret;
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
        filterParams.forEach((pairs: { [index: string]: string | number }) => {
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
