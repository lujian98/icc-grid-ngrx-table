import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IccMenuComponent } from './menu.component';
import { IccMenuItemComponent } from './components/menu-item/menu-item.component';

@NgModule({
  declarations: [
    IccMenuComponent,
  ],
  imports: [
    CommonModule,
    IccMenuItemComponent,
  ],
  exports: [IccMenuComponent],
})
export class IccMenuModule { }
