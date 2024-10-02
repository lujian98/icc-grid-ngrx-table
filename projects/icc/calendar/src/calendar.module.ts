import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IccCalendarComponent } from './calendar.component';
import { IccWeekdaysComponent } from './weekdays/weekdays.component';
import { IccMonthHeaderComponent } from './month-header/month-header.component';
import { IccMonthYearPipe } from './month-year-pipe/month-year.pipe';
//import { IccButtonModule } from '@icc/ui/button';
import { TranslateModule } from '@ngx-translate/core';
import { IccIconModule } from '@icc/ui/icon';
import { IccMonthComponent } from './month/month.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { IccCalendarToggleDirective } from './modal/calendar-toggle.directive';
import { IccLocaleDatePipe } from './date-utils/locale-date.pipe';
//import { IccPipesModule } from '../pipes/pipes.module';
//import { IccI18nModule } from 'iccbird-seven-ui/core';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    A11yModule,
    TranslateModule,
    //IccButtonModule,
    //IccI18nModule,
    IccIconModule,
    IccLocaleDatePipe,
    //IccPipesModule
  ],
  declarations: [
    IccCalendarComponent,
    IccCalendarToggleDirective,
    IccWeekdaysComponent,
    IccMonthHeaderComponent,
    IccMonthYearPipe,
    IccMonthComponent,
  ],
  exports: [IccCalendarComponent, IccCalendarToggleDirective],
})
export class IccCalendarModule {}
