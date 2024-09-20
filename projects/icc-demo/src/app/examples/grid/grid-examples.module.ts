import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppGridExamplesRoutingModule } from './grid-examples-routing.module';

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IccAccordion, IccAccordionComponent } from '@icc/ui/accordion';
import { IccCheckboxComponent } from '@icc/ui/checkbox';
import { IccIconModule } from '@icc/ui/icon';
import {
  IccLayoutCenterComponent,
  IccLayoutComponent,
  IccLayoutFooterComponent,
  IccLayoutHeaderComponent,
  IccLayoutSidebarComponent,
} from '@icc/ui/layout';
import { AppGridComponent } from './grid.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    IccLayoutCenterComponent,
    IccLayoutSidebarComponent,
    IccAccordionComponent,
    AppGridExamplesRoutingModule,
    /*
    IccCheckboxComponent,
    IccLayoutComponent,
    IccLayoutHeaderComponent,
    IccLayoutSidebarComponent,
    IccLayoutCenterComponent,
    IccLayoutFooterComponent,
    IccIconModule,

    //AppGridComponent,
    AppGridExamplesRoutingModule
    */
  ],
  declarations: [AppGridComponent],
  exports: [AppGridComponent],
})
export class AppGridExamplesModule {}
