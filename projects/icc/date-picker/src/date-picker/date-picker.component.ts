import { CommonModule, DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { IccButtonComponent } from '@icc/ui/button';
import { IccFormFieldComponent } from '@icc/ui/form-field';
import { IccIconModule } from '@icc/ui/icon';
import { IccPosition } from '@icc/ui/overlay';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { IccDateRangeOptions } from '../model/model';
import { IccCalendarOverlayService } from '../services/calendar-overlay.service';
import { IccDateConfigStoreService } from '../services/date-config-store.service';
import { IccDateRangeStoreService } from '../services/date-range-store.service';

@Component({
  selector: 'icc-date-picker',
  templateUrl: './date-picker.component.html',
  providers: [IccCalendarOverlayService, IccDateRangeStoreService, IccDateConfigStoreService, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TranslatePipe, IccIconModule, IccFormFieldComponent, IccButtonComponent],
})
export class IccDatePickerComponent implements OnInit, OnDestroy {
  @Input() options!: IccDateRangeOptions;
  tooltipPosition: IccPosition = IccPosition.BOTTOM;

  @ViewChild('calendarInput', { static: true }) calendarInput!: ElementRef<HTMLInputElement>;
  @Output() readonly selectedDateChanged: EventEmitter<Date> = new EventEmitter<Date>();

  selectedDate = '';
  private dateUpdate$!: Subscription;

  constructor(
    private changeDetectionRef: ChangeDetectorRef,
    private calendarOverlayService: IccCalendarOverlayService,
    public rangeStoreService: IccDateRangeStoreService,
    public configStoreService: IccDateConfigStoreService,
    private translationService: TranslateService,
  ) {}

  ngOnInit() {
    this.configStoreService.dateRangeOptions = this.options;
    this.options.placeholder = this.options.placeholder || 'DATE_PICKER.SELECTED_A_DATE';
    this.options.locale = this.translationService.currentLang || 'en-US';
    this.options.inputPrefix = this.options.inputPrefix || '';

    this.dateUpdate$ = this.rangeStoreService.updateSelected$.subscribe((selectedDate) => {
      if (selectedDate) {
        const locale = this.translationService.currentLang || 'en-US';
        this.options.locale = locale;
        const selected = new DatePipe(locale).transform(selectedDate, this.options.format);
        this.selectedDate = this.options.inputPrefix?.length
          ? `${this.options.inputPrefix} ${selected}`
          : `${selected}`;
      } else {
        this.selectedDate = '';
      }
      this.selectedDateChanged.emit(selectedDate);
    });

    this.rangeStoreService.updateSelected(this.options.selectedDate);
    this.changeDetectionRef.detectChanges();
  }

  openCalendar(event: MouseEvent) {
    this.calendarOverlayService.open(this.options.calendarOverlayConfig, this.calendarInput, 'date-picker');
  }

  public resetSelectedDate(selectedDate: Date | null) {
    this.rangeStoreService.updateSelected(selectedDate);
  }

  clearSelectedDate(event: MouseEvent) {
    this.resetSelectedDate(null);
  }

  ngOnDestroy() {
    if (this.dateUpdate$) {
      this.dateUpdate$.unsubscribe();
    }
  }
}
