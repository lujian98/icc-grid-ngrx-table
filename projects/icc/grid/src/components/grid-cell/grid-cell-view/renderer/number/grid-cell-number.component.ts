import { ChangeDetectionStrategy, Component } from '@angular/core';
import { isNumeric } from '@icc/ui/core';
import { IccNumberFieldConfig, defaultNumberFieldConfig } from '@icc/ui/fields';
import { IccGridCellRendererComponent } from '../grid-cell-renderer.component';

@Component({
  selector: 'icc-grid-cell-number',
  templateUrl: './grid-cell-number.component.html',
  styleUrls: ['./grid-cell-number.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IccGridCellNumberComponent extends IccGridCellRendererComponent<number> {
  get fieldConfig(): IccNumberFieldConfig {
    const config = this.column.rendererFieldConfig ? this.column.rendererFieldConfig : {};
    return {
      ...defaultNumberFieldConfig,
      ...config,
    };
  }

  get display(): number | string {
    if (isNumeric(this.data)) {
      return this.data.toFixed(this.fieldConfig.decimals);
    } else {
      return '';
    }
  }
}
