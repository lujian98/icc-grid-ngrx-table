import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { IccSelectFieldConfig, defaultSelectFieldConfig } from '@icc/ui/fields';
import { IccGridCellRendererComponent } from '../grid-cell-renderer.component';

@Component({
  selector: 'icc-grid-cell-select',
  templateUrl: './grid-cell-select.component.html',
  styleUrls: ['./grid-cell-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TranslatePipe],
})
export class IccGridCellSelectComponent<T> extends IccGridCellRendererComponent<T> {
  get fieldConfig(): IccSelectFieldConfig {
    const config = this.column.rendererFieldConfig ? this.column.rendererFieldConfig : {};
    return {
      ...defaultSelectFieldConfig,
      ...config,
    };
  }

  get display(): string {
    if (this.data) {
      const labelKey = this.fieldConfig.optionLabel;
      return (this.data as { [key: string]: string })[labelKey];
    } else {
      return '';
    }
  }
}
