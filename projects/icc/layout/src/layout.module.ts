import { NgModule } from '@angular/core';
import { IccLayoutComponent, IccLayoutHeaderComponent, IccLayoutFooterComponent} from './layout.component';

@NgModule({
  declarations: [
    IccLayoutComponent,
    IccLayoutHeaderComponent,
    IccLayoutFooterComponent,
  ],
  exports: [
    IccLayoutComponent,
    IccLayoutHeaderComponent,
    IccLayoutFooterComponent,
  ],
  imports: [],
})
export class IccLayoutModule {}
