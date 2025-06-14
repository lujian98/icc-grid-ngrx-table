import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IccDateFieldComponent, IccDateFieldConfig, defaultDateFieldConfig } from '@icc/ui/fields';
import { IccCellEditBaseComponent } from '../cell-edit-base.component';

@Component({
  selector: 'icc-cell-edit-date',
  templateUrl: './cell-edit-date.component.html',
  styleUrls: ['cell-edit-date.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IccDateFieldComponent],
})
export class IccCellEditDateComponent extends IccCellEditBaseComponent<Date> {
  override fieldConfig!: Partial<IccDateFieldConfig>;

  override checkField(): void {
    const config = this.column.rendererFieldConfig ? this.column.rendererFieldConfig : {};
    this.fieldConfig = {
      ...defaultDateFieldConfig,
      ...config,
      fieldName: this.column.name,
      clearValue: false,
      editable: true,
    };
  }
}
