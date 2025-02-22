import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, inject } from '@angular/core';
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
  private _record!: T;
  private _gridConfig!: IccGridConfig;

  fieldConfig!: Partial<IccFormField>;

  @Input() rowIndex!: number;
  @Input() column!: IccColumnConfig;

  @Input()
  set gridConfig(value: IccGridConfig) {
    this._gridConfig = { ...value };
    this.checkField();
    this.changeDetectorRef.markForCheck();
  }
  get gridConfig(): IccGridConfig {
    return this._gridConfig;
  }

  @Input()
  set record(data: T) {
    this._record = { ...data };
    console.log(' 3333 record change=', data);
    this.changeDetectorRef.markForCheck();
  }
  get record(): T {
    return this._record;
  }

  get data(): T {
    return (this.record as { [index: string]: T })[this.column.name];
  }

  checkField(): void {}
}
