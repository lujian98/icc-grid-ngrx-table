import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { IccAccordionComponent } from './accordion.component';

@NgModule({
  imports: [CommonModule, CdkAccordionModule],
  declarations: [IccAccordionComponent],
  exports: [IccAccordionComponent],
})
export class IccAccordionModule { }
