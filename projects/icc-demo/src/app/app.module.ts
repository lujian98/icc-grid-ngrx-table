import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IccAccordionModule } from '@icc/ui/accordion';
import { IccCheckboxModule } from '@icc/ui/checkbox';
import { IccDialogModule } from '@icc/ui/dialog';
import { IccIconModule } from '@icc/ui/icon';
import { IccThemeModule } from '@icc/ui/theme';
import { IccLayoutModule } from '@icc/ui/layout';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InMemoryHttpInterceptor } from './mock/in-memory-http.interceptor';
import { InMemoryService } from './mock/in-memory-service';


@NgModule({
  declarations: [
    AppComponent
  ],
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
    IccCheckboxModule,
    IccLayoutModule,
    IccIconModule,
    IccDialogModule.forRoot(),
    IccAccordionModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InMemoryHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
