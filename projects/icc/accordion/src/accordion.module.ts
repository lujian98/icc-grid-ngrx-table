import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { IccAccordionComponent } from './accordion.component';
import { IccMenuModule } from '@icc/ui/menu';

@NgModule({
  imports: [CommonModule, CdkAccordionModule, IccMenuModule.forRoot()],
  declarations: [IccAccordionComponent],
  exports: [IccAccordionComponent],
})
export class IccAccordionModule { }
