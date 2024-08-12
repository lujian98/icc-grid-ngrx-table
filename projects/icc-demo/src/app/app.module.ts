import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IccAboutModule } from '@icc/ui/about';
import { IccGridModule } from '@icc/ui/grid';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCheckboxModule,
    IccAboutModule,
    IccGridModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
