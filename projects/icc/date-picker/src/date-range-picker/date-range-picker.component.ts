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
  inject,
  Injector,
} from '@angular/core';
import { IccButtonComponent } from '@icc/ui/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { IccFormFieldComponent } from '@icc/ui/form-field';
import { IccDialogService } from '@icc/ui/overlay';
import { IccIconModule } from '@icc/ui/icon';
import { IccPosition } from '@icc/ui/overlay';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { IccDateRange, IccDateRangeOptions } from '../model/model';
import { IccCalendarOverlayService } from '../services/calendar-overlay.service';
import { IccDateConfigStoreService } from '../services/date-config-store.service';
import { IccDateRangeStoreService } from '../services/date-range-store.service';
import { IccDateRangePickerOverlayComponent } from '../picker-overlay/date-range-picker-overlay.component';

@Component({
  selector: 'icc-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss'],
  providers: [IccDateRangeStoreService, IccDateConfigStoreService, provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TranslatePipe, IccIconModule, IccFormFieldComponent, IccButtonComponent],
})
export class IccDateRangePickerComponent implements OnInit, OnDestroy {
  private dialogService = inject(IccDialogService);
  private injector = inject(Injector);

  @ViewChild('calendarInput', { static: true }) calendarInput!: ElementRef<HTMLInputElement>;
  @Output() readonly selectedDateRangeChanged: EventEmitter<IccDateRange> = new EventEmitter<IccDateRange>();
  @Input() options!: IccDateRangeOptions;

  private rangeUpdate$!: Subscription;
  selectedDateRange = '';
  tooltipPosition: IccPosition = IccPosition.BOTTOM;

  constructor(
    private changeDetectionRef: ChangeDetectorRef,
    public rangeStoreService: IccDateRangeStoreService,
    public configStoreService: IccDateConfigStoreService,
    private translationService: TranslateService,
  ) {}

  ngOnInit(): void {
    this.configStoreService.dateRangeOptions = this.options;
    this.options.placeholder = this.options.placeholder || 'DATE_PICKER.CHOOSE_A_DATE_RANGE';
    this.options.locale = this.translationService.currentLang || 'en-US';

    this.rangeUpdate$ = this.rangeStoreService.rangeUpdate$.subscribe((range) => {
      if (range.fromDate && !range.toDate) {
        range.toDate = range.fromDate;
      } else if (!range.fromDate && range.toDate) {
        range.fromDate = range.toDate;
      }
      const locale = this.translationService.currentLang || 'en-US';
      this.options.locale = locale;
      const from = new DatePipe(locale).transform(range.fromDate, this.options.format);
      const to = new DatePipe(locale).transform(range.toDate, this.options.format);
      if (range.fromDate && range.toDate) {
        this.selectedDateRange = `${from} - ${to}`;
      } else {
        this.selectedDateRange = '';
      }
      this.selectedDateRangeChanged.emit(range);
    });

    this.rangeStoreService.updateRange(this.options.range.fromDate, this.options.range.toDate);
    this.changeDetectionRef.detectChanges();
  }

  openCalendar(): void {
    this.dialogService.open(IccDateRangePickerOverlayComponent, {
      hostElemRef: this.calendarInput,
      injector: this.injector,
      closeOnBackdropClick: true,
    });
  }

  public resetDates(range: IccDateRange) {
    this.rangeStoreService.updateRange(range.fromDate, range.toDate);
  }

  clearDateRange(event: MouseEvent) {
    this.rangeStoreService.updateRange(null, null);
  }

  ngOnDestroy() {
    if (this.rangeUpdate$) {
      this.rangeUpdate$.unsubscribe();
    }
  }
}
