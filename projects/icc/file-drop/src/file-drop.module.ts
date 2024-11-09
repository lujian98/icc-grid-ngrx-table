import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IccFileDropComponent } from './file-drop.component';
import { IccFileDropContentTemplateDirective } from './templates.directive';

@NgModule({
  declarations: [IccFileDropComponent, IccFileDropContentTemplateDirective],
  imports: [CommonModule],
  exports: [IccFileDropComponent, IccFileDropContentTemplateDirective],
  providers: [],
  bootstrap: [IccFileDropComponent],
})
export class IccFileDropModule {}
