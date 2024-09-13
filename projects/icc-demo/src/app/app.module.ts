import { HTTP_INTERCEPTORS, provideHttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IccAccordionComponent } from '@icc/ui/accordion';
import { IccCheckboxComponent } from '@icc/ui/checkbox';
import { IccDialogModule } from '@icc/ui/dialog';
import { IccOverlayModule } from '@icc/ui/overlay';
import { IccIconModule } from '@icc/ui/icon';
import { IccThemeModule } from '@icc/ui/theme';
import {
  IccLayoutComponent,
  IccLayoutHeaderComponent,
  IccLayoutSidebarComponent,
  IccLayoutCenterComponent,
  IccLayoutFooterComponent,
} from '@icc/ui/layout';
import { SelectFieldComponent } from '@icc/ui/form-field';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InMemoryHttpInterceptor } from './mock/in-memory-http.interceptor';
import { InMemoryService } from './mock/in-memory-service';
import { IccUiModulesModule } from './icc-ui-modules/icc-ui-modules.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({ router: routerReducer }),
    StoreRouterConnectingModule.forRoot({}),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    HttpClientInMemoryWebApiModule.forRoot(InMemoryService, { delay: 100 }),
    AppRoutingModule,
    IccThemeModule.forRoot({ name: 'light' }),
    IccCheckboxComponent,
    IccLayoutComponent,
    IccLayoutHeaderComponent,
    IccLayoutSidebarComponent,
    IccLayoutCenterComponent,
    IccLayoutFooterComponent,
    IccIconModule,
    IccOverlayModule.forRoot(),
    IccDialogModule.forRoot(),
    IccUiModulesModule,
    IccAccordionComponent,
    SelectFieldComponent,
  ],
  // providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), [provideHttpClient()]]
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InMemoryHttpInterceptor,
      multi: true,
    },
    // [provideHttpClient()],
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

/*

https://dev.to/ngrx/using-ngrx-packages-with-standalone-angular-features-53d8

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    importProvidersFrom(InMemoryWebApiModule.forRoot(AppData, { delay: 1000 })),
    provideRouter(routes, withComponentInputBinding())
  ]
};
*/
