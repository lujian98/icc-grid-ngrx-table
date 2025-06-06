import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IccBackendService } from '@icc/ui/core';
import { IccTabsConfig, IccTabConfig } from '../models/tabs.model';

@Injectable({
  providedIn: 'root',
})
export class IccTabsService {
  private readonly http = inject(HttpClient);
  private readonly backendService = inject(IccBackendService);

  getRemoteTabsConfig(tabsConfig: IccTabsConfig): Observable<IccTabsConfig> {
    const params = this.backendService.getParams(tabsConfig.urlKey, 'tabsConfig', tabsConfig.name);
    const url = this.backendService.apiUrl;
    return this.http.get<IccTabsConfig>(url, { params }).pipe(
      map((config) => {
        return {
          ...tabsConfig,
          ...config,
        };
      }),
    );
  }

  //NOT used
  getTabsOptions(tabsConfig: IccTabsConfig): Observable<IccTabConfig[]> {
    const params = this.backendService.getParams(tabsConfig.urlKey, 'select', tabsConfig.name);
    const url = this.backendService.apiUrl;
    return this.http.get<IccTabConfig[]>(url, { params }).pipe(
      map((options) => {
        return options;
      }),
    );
  }
}
