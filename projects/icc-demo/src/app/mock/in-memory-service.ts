
import {
  InMemoryDbService,
  ParsedRequestUrl,
  RequestInfo,
  RequestInfoUtilities,
  ResponseOptions,
  STATUS,
  getStatusText,
} from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';

export class InMemoryService extends InMemoryDbService {
  createDb(): {

  } {
    return {

    };
  }

  /*
  parseRequestUrl(url: string, utils: RequestInfoUtilities): ParsedRequestUrl {
    if (url.endsWith('.json')) {
      return utils.parseRequestUrl(url);
    }
    if (url.split('?')[0] === '/api/profile' && url.includes('?')) {
      return utils.parseRequestUrl(url.split('?')[0]);
    }
    if (url === '/ldapr/settings') {
      const parsed = utils.parseRequestUrl(url);
      parsed.collectionName = 'ldapr_settings';
      return parsed;
    }
    if (url.split('?')[0] === '/api/profile' && url.includes('?')) {
      return utils.parseRequestUrl(url.split('?')[0]);
    }
    const splitted = url.split('?')[0].split('/');
    if (splitted.length > 3) {
      const isLastArgumentIsId = Number.isInteger(
        parseInt(splitted[splitted.length - 1], 10)
      );
      const collectionIndex = isLastArgumentIsId
        ? splitted.length - 3
        : splitted.length - 2;
      const actionIndex = isLastArgumentIsId
        ? splitted.length - 2
        : splitted.length - 1;

      const parsed = utils.parseRequestUrl(url);
      parsed.collectionName = splitted[actionIndex];
      parsed.id = isLastArgumentIsId ? splitted[splitted.length - 1] : '';
      parsed.resourceUrl = `${splitted[collectionIndex]}/${splitted[actionIndex]}`;
      return parsed;
    }
    return utils.parseRequestUrl(url);
  }
*/
  patch(reqInfo: RequestInfo): Observable<ResponseOptions> {
    let returnBody = { data: {} };
    let body = reqInfo.collection;
    const payload = reqInfo.utils.getJsonBody(reqInfo.req);
    if (Array.isArray(reqInfo.collection?.data) && reqInfo.id !== '') {
      const targetIndex = body.data.findIndex(
        (obj: any) => obj.id === reqInfo.id && obj.type === payload.data.type
      );
      const target = body.data[targetIndex].attributes;
      const updatedFld = payload.data.attributes;
      body.data[targetIndex].attributes = { ...target, ...updatedFld };
      returnBody.data = body.data[targetIndex];
    } else {
      const dataType = body.data.type;
      const updatedFld = payload[dataType];
      body.data.attributes = { ...body.data.attributes, ...updatedFld };
      returnBody = { ...body };
    }
    return reqInfo.utils.createResponse$(() => {
      const options: ResponseOptions = {
        body: returnBody,
        status: STATUS.OK,
      };
      return this.finishOptions(options, reqInfo);
    });
  }

  post(reqInfo: RequestInfo): Observable<ResponseOptions> {
    const body = reqInfo.collection;
    /*
    const uploadReqs: Array<string> = [
      '/api/trusted_certificates',
      '/api/licenses',
    ];
    if (uploadReqs.includes(reqInfo.req.url)) {
      const length = body.data.length;
      const cloneItem = JSON.parse(JSON.stringify(body.data[length - 1]));
      cloneItem.id = `${length + 1}`;
      body.data = reqInfo.req.url === '/api/licenses' ? [cloneItem] : cloneItem;
    }*/
    return reqInfo.utils.createResponse$(() => {
      const options: ResponseOptions = {
        body: body,
        status: STATUS.OK,
      };
      return this.finishOptions(options, reqInfo);
    });
  }

  put(reqInfo: RequestInfo): Observable<ResponseOptions> {
    let body: any;
    body = reqInfo.collection;
    body.data.attributes = reqInfo.utils.getJsonBody(reqInfo.req)[
      body.data.type
    ];
    return reqInfo.utils.createResponse$(() => {
      const options: ResponseOptions = {
        body: body,
        status: STATUS.OK,
      };
      return this.finishOptions(options, reqInfo);
    });
  }

  delete(reqInfo: RequestInfo): Observable<any> {
    return reqInfo.utils.createResponse$(() => {
      const options: ResponseOptions = {
        body: undefined,
        status: STATUS.OK,
      };
      return this.finishOptions(options, reqInfo);
    });
  }

  get(reqInfo: RequestInfo) {
    if (reqInfo.id) {
      return this.getDataDetail(reqInfo);
    } else if (reqInfo.query.size > 0) {
      return this.getQueryData(reqInfo);
    } else {
      return undefined; // let the default GET handle all others
    }
  }

  private getQueryData(reqInfo: RequestInfo) {
    return reqInfo.utils.createResponse$(() => {
      const collection = reqInfo.collection.data.slice();
      const filteredData = this.getFilteredData(collection, reqInfo);
      const sortedData = this.getSortedData(filteredData, reqInfo.query);
      const data = this.getOffsetData(sortedData, reqInfo.query);
      const body = {
        data: data,
        included: reqInfo.collection.included,
        meta: {
          total: filteredData.length,
        },
      };
      const options: ResponseOptions = {
        body: body,
        status: STATUS.OK,
      };
      return this.finishOptions(options, reqInfo);
    });
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

  private getFilteredData(data: any[], reqInfo: RequestInfo) {
    [...reqInfo.query.keys()].forEach((key) => {
      if (key.indexOf('_') > 1) {
        const fKey = key.split('_');
        const compareKey = this.getCompareKey(key);
        const filterKey = key.substring(0, key.length - compareKey.length - 1);
        const searches = reqInfo.query.get(key)!;
        const search =
          ['in[]', 'in', 'null', 'not_null'].indexOf(compareKey) === -1
            ? searches[0].toLowerCase()
            : searches;
        data = data.filter((item) => {
          const val = item.attributes[filterKey];
          const value = this.getTypedValue(search, val, val);
          const filter = this.getTypedValue(search, val, search);
          switch (compareKey) {
            case 'cont':
              return value
                ?.toString()
                .toLowerCase()
                .includes(filter.toString());
            case 'i_cont':
              return value
                ?.toString()
                .toLowerCase()
                .includes(filter.toString().toLowerCase());
            case 'in':
            case 'in[]':
              return searches.includes(val);
            case 'eq':
              return value === filter;
            case 'not_null':
              return value && value !== null;
            case 'null':
              return value === null || !value;
            case 'gteq':
              return value >= filter;
            case 'gt':
              return value > filter;
            case 'lteq':
              return value <= filter;
            case 'lt':
              return value < filter;
            case 'start':
              return value?.toString().startsWith(filter.toString());
            case 'end':
              return value?.toString().endsWith(filter.toString());
          }
          return false;
        });
      }
    });
    return data;
  }

  private getTypedValue(search: any, val: any, value: any): any {
    search = decodeURIComponent(search);
    value = decodeURIComponent(value);
    if (this.isNumeric(search) && this.isNumeric(val)) {
      return Number(value);
    } else if (this.isDate(search) && this.isDate(val)) {
      return new Date(value);
    } else {
      return value;
    }
  }

  private isDate(date: any): boolean {
    return !isNaN(Date.parse(date));
  }

  private isNumeric(num: any): boolean {
    return (
      (typeof num === 'number' ||
        (typeof num === 'string' && num.trim() !== '')) &&
      !isNaN(num as number)
    );
  }

  private getSortedData(data: any[], query: any) {
    const sortlist = query.get('sort');
    if (sortlist && sortlist.length > 0) {
      sortlist.forEach((aSort: string) => {
        const direction = aSort.charAt(0) === '-' ? 'desc' : 'asc';
        const sort = direction === 'desc' ? aSort.substring(1) : aSort;
        data = this.dataSortByField(data, sort, direction);
      });
    }
    return data;
  }

  private dataSortByField(data: any[], field: string, direction: string) {
    const order = direction === 'asc' ? 1 : -1;
    data.sort((d1: any, d2: any) => {
      const v1 = (d1.attributes as any)[field];
      const v2 = (d2.attributes as any)[field];
      let res = null;
      if (v1 == null && v2 != null) {
        res = -1;
      } else if (v1 != null && v2 == null) {
        res = 1;
      } else if (v1 == null && v2 == null) {
        res = 0;
      } else if (this.isNumeric(v1) && this.isNumeric(v2)) {
        res = Number(v1) < Number(v2) ? -1 : Number(v1) > Number(v2) ? 1 : 0;
      } else if (typeof v1 === 'string' && typeof v2 === 'string') {
        res = v1.localeCompare(v2);
      } else {
        res = v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
      }
      return order * res;
    });
    return data;
  }

  private getOffsetData(data: any[], query: any) {
    const begin = Number(query.get('page[offset]')[0]);
    const end = Number(query.get('page[limit]')[0]) + begin;
    const length = data.length;
    return data.slice(begin, end > length ? length : end);
  }

  private getDataDetail(reqInfo: RequestInfo) {
    return reqInfo.utils.createResponse$(() => {
      const collection = reqInfo.collection.data.slice();
      const id = reqInfo.id;
      const data =
        id == undefined ? collection : reqInfo.utils.findById(collection, id);
      const body = { data: data };
      const options: ResponseOptions = data
        ? {
            body: body,
            status: STATUS.OK,
          }
        : {
            body: { error: `'Record' with id='${id}' not found` },
            status: STATUS.NOT_FOUND,
          };
      return this.finishOptions(options, reqInfo);
    });
  }

  private finishOptions(
    options: ResponseOptions,
    { headers, url }: RequestInfo
  ) {
    options.statusText = getStatusText(options.status!);
    options.headers = headers;
    options.url = url;
    return options;
  }
}
