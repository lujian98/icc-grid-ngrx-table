import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IccTextFieldComponent, IccTextFieldConfig } from '@icc/ui/fields';
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
    this.fieldConfig = {
      fieldName: this.column.name,
      clearValue: false,
      editable: true,
    };
  }

  get value(): string {
    return this.data as string;
  }

  onValueChange(value: string): void {
    console.log(' mmmm ss v=', value);
    //this.filterChanged$.next(value);
  }
}
