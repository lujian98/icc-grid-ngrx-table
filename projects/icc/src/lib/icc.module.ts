import { NgModule } from '@angular/core';
import { IccComponent } from './icc.component';
import { ButtonComponent } from './components/button/button.component';



@NgModule({
  declarations: [
    IccComponent,
    ButtonComponent
  ],
  imports: [
  ],
  exports: [
    IccComponent,
    ButtonComponent
  ]
})
export class IccModule { }
