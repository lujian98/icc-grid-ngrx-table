import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IccNumberFieldComponent, IccNumberFieldConfig, defaultNumberFieldConfig } from '@icc/ui/fields';
import { IccCellEditBaseComponent } from '../cell-edit-base.component';

@Component({
  selector: 'icc-cell-edit-number',
  templateUrl: './cell-edit-number.component.html',
  styleUrls: ['cell-edit-number.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IccNumberFieldComponent],
})
export class IccCellEditNumberComponent extends IccCellEditBaseComponent<number> {
  override fieldConfig!: Partial<IccNumberFieldConfig>;

  override checkField(): void {
    const config = this.column.rendererFieldConfig ? this.column.rendererFieldConfig : {};
    this.fieldConfig = {
      ...defaultNumberFieldConfig,
      ...config,
      fieldName: this.column.name,
      clearValue: false,
      editable: true,
    };
  }
}
