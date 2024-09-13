import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientInMemoryWebApiModule, InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryHttpInterceptor } from './mock/in-memory-http.interceptor';
import { IccDialogModule } from '@icc/ui/dialog';
import { IccOverlayModule } from '@icc/ui/overlay';
import { IccThemeModule } from '@icc/ui/theme';
import { InMemoryService } from './mock/in-memory-service';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InMemoryHttpInterceptor,
      multi: true,
    },
    provideRouter(routes),
    importProvidersFrom(StoreModule.forRoot({ router: routerReducer })),
    importProvidersFrom(StoreRouterConnectingModule.forRoot({})),
    importProvidersFrom(EffectsModule.forRoot()),
    importProvidersFrom(StoreDevtoolsModule.instrument({ maxAge: 25 })),
    importProvidersFrom(HttpClientInMemoryWebApiModule.forRoot(InMemoryService, { delay: 100 })),
    //importProvidersFrom(InMemoryWebApiModule.forRoot(InMemoryService, { delay: 1000 })),
    importProvidersFrom(IccThemeModule.forRoot({ name: 'light' })),
    importProvidersFrom(IccOverlayModule.forRoot()),
    importProvidersFrom(IccDialogModule.forRoot()),

    //[provideHttpClient()],
  ],
};

/*

    IccOverlayModule.forRoot(),
    IccDialogModule.forRoot(),
 
     
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    importProvidersFrom(InMemoryWebApiModule.forRoot(AppData, { delay: 1000 })),
    provideRouter(routes, withComponentInputBinding())
  ]
};
*/
