import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IccTextFieldComponent, IccTextFieldConfig, defaultTextFieldConfig } from '@icc/ui/fields';
import { IccCellEditBaseComponent } from '../cell-edit-base.component';

@Component({
  selector: 'icc-cell-edit-text',
  templateUrl: './cell-edit-text.component.html',
  styleUrls: ['cell-edit-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IccTextFieldComponent],
})
export class IccCellEditTextComponent extends IccCellEditBaseComponent<string> {
  override fieldConfig!: Partial<IccTextFieldConfig>;

  override checkField(): void {
    const config = this.column.rendererFieldConfig ? this.column.rendererFieldConfig : {};
    this.fieldConfig = {
      ...defaultTextFieldConfig,
      ...config,
      fieldName: this.column.name,
      clearValue: false,
      editable: true,
    };
  }
}
