import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { addMonths, startofMonth } from '../date-utils/date.utils';

@Component({
  selector: 'icc-month-header',
  templateUrl: './month-header.component.html',
  styleUrls: ['./month-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IccMonthHeaderComponent {
  @Input() month = startofMonth(new Date());
  @Input() activeMonth?: Date = startofMonth(new Date());
  @Input() showMonthStepper = true;
  @Input() monthAndYearFormat?: string;
  @Input() locale?: string;

  @Output() activeMonthChange = new EventEmitter<Date>();

  stepMonth<Delta extends number>(delta: Delta) {
    const activeMonth = addMonths(this.activeMonth || new Date(), delta);
    this.activeMonthChange.emit(activeMonth);
  }
}
