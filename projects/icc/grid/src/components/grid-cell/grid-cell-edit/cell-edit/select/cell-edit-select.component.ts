import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IccSelectFieldComponent, IccSelectFieldConfig, defaultSelectFieldConfig } from '@icc/ui/fields';
import { IccCellEditBaseComponent } from '../cell-edit-base.component';

@Component({
  selector: 'icc-cell-edit-select',
  templateUrl: './cell-edit-select.component.html',
  styleUrls: ['cell-edit-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IccSelectFieldComponent],
})
export class IccCellEditSelectComponent<T> extends IccCellEditBaseComponent<T> {
  override fieldConfig!: Partial<IccSelectFieldConfig>;

  override checkField(): void {
    const config = this.column.rendererFieldConfig ? this.column.rendererFieldConfig : {};
    this.fieldConfig = {
      ...defaultSelectFieldConfig,
      ...config,
      fieldName: this.column.name,
      clearValue: false,
      editable: true, // TODO from column config ???
      mouseLeaveBlur: true,
    };
  }

  /*
  get value(): string | object | string[] | object[] {
    return this.data as string | object | string[] | object[];
  }*/
}
