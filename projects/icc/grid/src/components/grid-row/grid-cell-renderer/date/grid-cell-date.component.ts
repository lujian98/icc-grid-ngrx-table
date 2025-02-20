import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IccGridCellRendererComponent } from '../grid-cell-renderer.component';

@Component({
  selector: 'icc-grid-cell-date',
  templateUrl: './grid-cell-date.component.html',
  styleUrls: ['./grid-cell-date.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class IccGridCellDateComponent extends IccGridCellRendererComponent<Date> {
  private translateService = inject(TranslateService);

  get display(): string {
    if (this.data) {
      const locale = this.translateService.currentLang || 'en-US';
      const dateFormat = this.column.dateFormat || 'longDate';
      return new DatePipe(locale).transform(this.data, dateFormat)!;
    } else {
      return '';
    }
  }
}
