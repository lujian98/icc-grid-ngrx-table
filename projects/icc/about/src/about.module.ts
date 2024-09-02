import { NgModule } from '@angular/core';
import { IccAboutComponent } from './about.component';
import { IccButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [IccAboutComponent, IccButtonComponent],
  exports: [IccAboutComponent, IccButtonComponent],
})
export class IccAboutModule {}
