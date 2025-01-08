import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IccBackendService } from '@icc/ui/core';
import { IccColumnConfig } from '@icc/ui/grid';
import { Observable, catchError, map, throwError } from 'rxjs';
import { IccTreeConfig, IccTreeData } from '../models/tree-grid.model';

@Injectable({
  providedIn: 'root',
})
export class IccTreeRemoteService {
  private http = inject(HttpClient);
  private backendService = inject(IccBackendService);

  getTreeRemoteData<T>(treeConfig: IccTreeConfig, columns: IccColumnConfig[]): Observable<IccTreeData[]> {
    let params = this.backendService.getParams(treeConfig.urlKey, 'treeData');
    const offset = (treeConfig.page - 1) * treeConfig.pageSize;
    const limit = treeConfig.pageSize;
    params = params.append('offset', offset.toString());
    params = params.append('limit', limit.toString());
    const url = this.backendService.apiUrl;
    return this.http.get<IccTreeData[]>(url, { params }).pipe(
      map((res) => {
        return res;
      }),
      catchError((error) =>
        throwError(() => {
          return error;
        }),
      ),
    );
  }
}
