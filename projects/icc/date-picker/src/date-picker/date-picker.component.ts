import { CommonModule, DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { IccButtonComponent } from '@icc/ui/button';
import { IccFormFieldComponent } from '@icc/ui/form-field';
import { IccIconModule } from '@icc/ui/icon';
import { IccDialogService, IccPosition } from '@icc/ui/overlay';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { IccDateRangeOptions } from '../model/model';
import { IccDatePickerOverlayComponent } from '../picker-overlay/date-picker-overlay.component';
import { IccDateConfigStoreService } from '../services/date-config-store.service';
import { IccDateRangeStoreService } from '../services/date-range-store.service';

@Component({
  selector: 'icc-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TranslatePipe, IccIconModule, IccFormFieldComponent, IccButtonComponent],
  providers: [IccDateRangeStoreService, IccDateConfigStoreService, provideNativeDateAdapter()],
})
export class IccDatePickerComponent implements OnInit, OnDestroy {
  private dialogService = inject(IccDialogService);
  private injector = inject(Injector);

  @Input() options!: IccDateRangeOptions;
  tooltipPosition: IccPosition = IccPosition.BOTTOM;

  @ViewChild('calendarInput', { static: true }) calendarInput!: ElementRef<HTMLInputElement>;
  @Output() readonly selectedDateChanged: EventEmitter<Date> = new EventEmitter<Date>();

  selectedDate = '';
  private dateUpdate$!: Subscription;

  constructor(
    private changeDetectionRef: ChangeDetectorRef,
    public rangeStoreService: IccDateRangeStoreService,
    public configStoreService: IccDateConfigStoreService,
    private translationService: TranslateService,
  ) {}

  ngOnInit(): void {
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

  // TODO add options.calendarOverlayConfig
  openCalendar(): void {
    this.dialogService.open(IccDatePickerOverlayComponent, {
      hostElemRef: this.calendarInput,
      injector: this.injector,
    });
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
