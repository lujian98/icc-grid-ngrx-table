import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IccMenuComponent } from './menu.component';
import { IccMenuItemComponent } from './menu-item/menu-item.component';
import { IccMenuService } from './menu.service';
import { PortalModule } from '@angular/cdk/portal';

@NgModule({
  declarations: [
    IccMenuComponent,
  ],
  imports: [
    CommonModule,
    PortalModule,
    IccMenuItemComponent,
  ],
  exports: [IccMenuComponent],
})
export class IccMenuModule {
  static forRoot(): ModuleWithProviders<IccMenuModule> {
    return {
      ngModule: IccMenuModule,
      providers: [IccMenuService],
    };
  }
}
