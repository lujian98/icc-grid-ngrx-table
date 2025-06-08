import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { IccTextFieldComponent, IccTextFieldConfig } from '@icc/ui/fields';
import { TranslateService } from '@ngx-translate/core';
import { delay, takeUntil } from 'rxjs';
import { IccFieldFilterComponent } from '../field-filter.component';

@Component({
  selector: 'icc-number-filter',
  templateUrl: './number-filter.component.html',
  styleUrls: ['number-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IccTextFieldComponent],
})
export class IccNumberFilterComponent extends IccFieldFilterComponent implements OnInit {
  override fieldConfig!: Partial<IccTextFieldConfig>;
  private readonly translateService = inject(TranslateService);

  override checkField(): void {
    const filterI18n = this.translateService.instant('ICC.UI.GRID.FILTER');
    this.fieldConfig = {
      fieldName: this.column.name,
      clearValue: true,
      placeholder: `${filterI18n} > < <= >= = null !null`,
      editable: true,
    };
  }

  override set value(val: string) {
    this._value = val;
  }

  override get value(): string {
    return this._value as string;
  }

  ngOnInit(): void {
    this.translateService.onLangChange.pipe(delay(50), takeUntil(this.destroy$)).subscribe(() => {
      this.checkField();
      this.changeDetectorRef.markForCheck();
    });
  }

  onValueChange(value: string): void {
    this.filterChanged$.next(value);
  }
}
