import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { delay, Subject, takeUntil } from 'rxjs';
import { IccGridCellRendererComponent } from '../grid-cell-renderer.component';
import { IccDateFieldConfig, defaultDateFieldConfig } from '@icc/ui/fields';

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

  get fieldConfig(): IccDateFieldConfig {
    const config = this.column.rendererFieldConfig ? this.column.rendererFieldConfig : {};
    return {
      ...defaultDateFieldConfig,
      ...config,
    };
  }

  get display(): string {
    if (this.data) {
      const locale = this.translateService.currentLang || 'en-US';
      return new DatePipe(locale).transform(this.data, this.fieldConfig.dateFormat)!;
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
