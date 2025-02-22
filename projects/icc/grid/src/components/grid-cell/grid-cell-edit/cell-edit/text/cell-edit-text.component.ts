import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IccTextFieldComponent, IccTextFieldConfig, defaultTextFieldConfig } from '@icc/ui/fields';
import { IccCellEditBaseComponent } from '../cell-edit-base.component';

@Component({
  selector: 'icc-cell-edit-text',
  templateUrl: './cell-edit-text.component.html',
  styleUrls: ['cell-edit-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
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

  get value(): string {
    console.log(' name=', this.column.name, ' 5555555 data=', this.data);
    //console.log( ' val=', this.data)
    return this.data as string;
  }

  onValueChange(value: string): void {
    console.log(' text change v=', value);
    //this.filterChanged$.next(value);
  }
}
