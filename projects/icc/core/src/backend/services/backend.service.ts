import { Inject, Injectable, inject } from '@angular/core';
import { IccUIModulesOptions, ICC_UI_MODULES_OPTIONS } from '../../config/icc-ui-modules-options.tokens';

@Injectable({
  providedIn: 'root',
})
export class IccBackendService {
  private options = inject(ICC_UI_MODULES_OPTIONS);

  constructor() //private _options: IccUIModulesOptions
  {}

  getUrl(endpoint: string): string {
    return [this.options.backend.baseUrl, endpoint].join('/');
  }
}
