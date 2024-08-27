import { ModuleWithProviders, NgModule } from '@angular/core';
import { IccMenuComponent } from './menu.component';
import { IccMenuItemComponent } from './menu-item/menu-item.component';
import { IccMenuService } from './menu.service';
import { PortalModule } from '@angular/cdk/portal';

@NgModule({
  declarations: [
    IccMenuComponent,
  ],
  imports: [
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
