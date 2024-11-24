import { HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ICC_UI_MODULES_OPTIONS } from '../../config/icc-ui-modules-options.tokens';

@Injectable({
  providedIn: 'root',
})
export class IccBackendService {
  private options = inject(ICC_UI_MODULES_OPTIONS);

  get apiUrl(): string {
    return [this.options.backend.baseUrl, `index.php`].join('/');
  }

  getParams(keyName: string, action: string, path?: string): HttpParams {
    let params = new HttpParams();
    params = params.append('keyName', keyName);
    params = params.append('action', action);
    if (path) {
      params = params.append('path', path);
    }
    return params;
  }

  getFormData(keyName: string, action: string, path?: string): FormData {
    const formData = new FormData();
    formData.append('keyName', keyName);
    formData.append('action', action);
    if (path) {
      formData.append('path', path);
    }
    return formData;
  }
}
