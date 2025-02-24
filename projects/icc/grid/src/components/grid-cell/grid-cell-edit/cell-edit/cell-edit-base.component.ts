import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IccFormField } from '@icc/ui/fields';
import { IccColumnConfig, IccGridConfig } from '../../../../models/grid-column.model';

@Component({
  selector: 'icc-grid-cell-edit-base',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class IccCellEditBaseComponent<T> {
  protected changeDetectorRef = inject(ChangeDetectorRef);
  private _gridConfig!: IccGridConfig;
  private _column!: IccColumnConfig;
  private _record!: T;
  form!: FormGroup;

  fieldConfig!: Partial<IccFormField>;

  @Input() rowIndex!: number;

  @Input()
  set gridConfig(value: IccGridConfig) {
    console.log(' cell edit grid config change value =', value);
    this._gridConfig = { ...value };
    this.checkField();
    this.changeDetectorRef.markForCheck();
  }
  get gridConfig(): IccGridConfig {
    return this._gridConfig;
  }

  @Input()
  set column(val: IccColumnConfig) {
    this._column = val;
    if (!this.form) {
      this.form = new FormGroup({
        [this.column.name]: new FormControl<T | null>(null),
      });
    }
  }
  get column(): IccColumnConfig {
    return this._column;
  }

  get field(): FormControl {
    return this.form!.get(this.column.name) as FormControl;
  }

  @Input()
  set record(data: T) {
    console.log(' edit set cell record=', data);
    this._record = data;
    this.resetField();
  }
  get record(): T {
    return this._record;
  }

  get data(): T {
    return (this.record as { [index: string]: T })[this.column.name];
  }

  checkField(): void {}

  resetField(): void {
    this.field.setValue(this.data);
    this.field.markAsPristine();
  }
}
