import { NgModule } from '@angular/core';
import {
  IccLayoutComponent,
  IccLayoutHeaderComponent,
  IccLayoutSidebarComponent,
  IccLayoutCenterComponent,
  IccLayoutFooterComponent,
} from './layout.component';

@NgModule({
  declarations: [
    IccLayoutComponent,
    IccLayoutHeaderComponent,
    IccLayoutSidebarComponent,
    IccLayoutCenterComponent,
    IccLayoutFooterComponent,
  ],
  exports: [
    IccLayoutComponent,
    IccLayoutHeaderComponent,
    IccLayoutSidebarComponent,
    IccLayoutCenterComponent,
    IccLayoutFooterComponent,
  ],
  imports: [],
})
export class IccLayoutModule {}
