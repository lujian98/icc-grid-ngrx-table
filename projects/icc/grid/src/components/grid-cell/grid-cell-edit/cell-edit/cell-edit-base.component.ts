import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { isEqual } from '@icc/ui/core';
import { IccFormField } from '@icc/ui/fields';
import { IccGridFacade } from '../../../../+state/grid.facade';
import { IccColumnConfig, IccGridConfig, IccCellEdit, IccGridSetting } from '../../../../models/grid-column.model';

@Component({
  selector: 'icc-grid-cell-edit-base',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class IccCellEditBaseComponent<T> {
  private changeDetectorRef = inject(ChangeDetectorRef);
  private gridFacade = inject(IccGridFacade);
  private _gridConfig!: IccGridConfig;
  private _column!: IccColumnConfig;
  private _record!: T;
  form!: FormGroup;

  fieldConfig!: Partial<IccFormField>;

  @Input() rowIndex!: number;

  @Input() gridSetting!: IccGridSetting;
  @Input()
  set gridConfig(value: IccGridConfig) {
    this._gridConfig = { ...value };
    this.checkField();
    if (this.gridSetting.restEdit) {
      this.resetField();
    }
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
    //console.log(' edit set cell record=', data);
    this._record = data;
    this.resetField();
  }
  get record(): T {
    return this._record;
  }

  get data(): T {
    return (this.record as { [index: string]: T })[this.column.name];
  }

  get recordId(): string {
    return (this.record as { [index: string]: string })[this.gridConfig.recordKey];
  }
  checkField(): void {}

  resetField(): void {
    this.field.setValue(this.data);
    this.field.markAsPristine();
  }

  onValueChange(value: T | null): void {
    const changed = !isEqual(value, this.data);
    if (changed) {
      this.field.markAsDirty();
    } else {
      this.resetField();
    }
    const modified: IccCellEdit<unknown> = {
      recordKey: this.gridConfig.recordKey,
      recordId: this.recordId,
      field: this.column.name,
      value: value,
      originalValue: this.data,
      changed: changed,
    };
    //this.filterChanged$.next(value); // TODO debounce change

    this.gridFacade.setGridRecordModified(this.gridConfig, modified);
  }
}
