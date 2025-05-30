import { IccFilter } from '../../filter/filter';
import { IccFilters } from '../../filter/filters';
import { IccRansackFilter } from './filter';
import { IccRansackTextFilter } from './text-filter';
import { IccRansackNumberFilter } from './number-filter';
import { IccRansackSelectFilter } from './select-filter';
import { IccRansackDateRangeFilter } from './date-range-filter';

export class IccRansackFilterFactory<T> {
  componentMapper: { [index: string]: any };

  constructor() {
    this.componentMapper = {
      text: IccRansackTextFilter,
      number: IccRansackNumberFilter,
      select: IccRansackSelectFilter,
      dateRange: IccRansackDateRangeFilter,
    };
  }

  getFilter(filter: IccFilter) {
    const filterType = filter.type;
    const component = this.componentMapper[filterType];
    const componentRef = new component();
    componentRef.filter = filter;
    return componentRef;
  }

  getRansackFilters(filters: IccFilters): IccRansackFilter<T>[] {
    const ransackFilters: Array<IccRansackFilter<T>> = [];
    for (const filter of filters.filters) {
      ransackFilters.push(this.getFilter(filter));
    }
    return ransackFilters;
  }
}
