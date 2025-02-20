import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { delay, Subject, takeUntil } from 'rxjs';
import { IccGridCellRendererComponent } from '../grid-cell-renderer.component';

@Component({
  selector: 'icc-grid-cell-date',
  templateUrl: './grid-cell-date.component.html',
  styleUrls: ['./grid-cell-date.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class IccGridCellDateComponent extends IccGridCellRendererComponent<Date> implements OnInit, OnDestroy {
  private translateService = inject(TranslateService);
  private destroy$ = new Subject<void>();

  get display(): string {
    if (this.data) {
      const locale = this.translateService.currentLang || 'en-US';
      const dateFormat = this.column.dateFormat || 'longDate';
      return new DatePipe(locale).transform(this.data, dateFormat)!;
    } else {
      return '';
    }
  }

  ngOnInit(): void {
    this.translateService.onLangChange
      .pipe(delay(50), takeUntil(this.destroy$))
      .subscribe(() => this.changeDetectorRef.markForCheck());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
