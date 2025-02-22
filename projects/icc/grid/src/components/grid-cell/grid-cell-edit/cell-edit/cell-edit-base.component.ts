import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, inject } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { IccFormField } from '@icc/ui/fields';
import { Subject } from 'rxjs';
import { IccCellEditData, IccCellEditKey, IccDirection, IccKeyboard } from '../../../../models/cell-edit.model';
import { IccColumnConfig, IccGridCell, IccGridConfig } from '../../../../models/grid-column.model';

@Component({
  selector: 'icc-grid-cell-edit-base',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.grid-cell-align-center]': 'align === "center"',
    '[class.grid-cell-align-right]': 'align === "right"',
  },
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
    //this.changeDetectorRef.markForCheck();
  }
  get gridConfig(): IccGridConfig {
    return this._gridConfig;
  }

  @Input()
  set record(data: T) {
    this._record = { ...data };
    this.changeDetectorRef.markForCheck();
  }
  get record(): T {
    return this._record;
  }

  get data(): T {
    return (this.record as { [index: string]: T })[this.column.name];
  }

  get align(): string {
    return this.column.align ? this.column.align : 'left';
  }

  get alignCenter() {
    return this.align === 'center';
  }

  get alignRight() {
    return this.align === 'right';
  }

  checkField(): void {}
  /*
  dataKeyId!: string;
  field!: string;
  rowIndex!: number;
  colIndex!: number;
  record!: { [index: string]: any };
  //dataSource!: IccBaseGridDataSource<T>;
  step = 1;

  _column!: IccColumnConfig;
  protected _value: any;
  private _message!: string;
  private _validations!: Validators;
  private _isChangeSaved!: boolean;

  IccKeyboard = IccKeyboard;
  IccDirection = IccDirection;

  saveCellEditValue$: Subject<IccCellEditData<T>> = new Subject();
  cellEditSpecialKeyEvent$: Subject<IccCellEditKey> = new Subject();

  set column(val: IccColumnConfig) {
    this._column = val;
    this.setValidations(val);
  }

  get column(): IccColumnConfig {
    return this._column;
  }

  set value(val: any) {
    this._value = val;
  }

  get value(): any {
    return this._value;
  }

  set validations(val: Validators) {
    this._validations = val;
  }

  get validations(): Validators {
    return this._validations;
  }

  set message(val: string) {
    this._message = val;
  }

  get message(): string {
    return this._message || '';
  }

  set isChangeSaved(val: boolean) {
    this._isChangeSaved = val;
  }

  get isChangeSaved(): boolean {
    return this._isChangeSaved;
  }

  setValidations(val: any): void {
    if (val.validations instanceof Array) {
      this.validations = val.validations.map((item: any) => {
        return item.validator;
      });
    }
  }

  valueChanged(event: any) {
    const value: T = event.target.value;
    this.isChangeSaved = false;
    if (event.keyCode === IccKeyboard.ENTER) {
      this.saveCellValue();
    } else {
      this.value = value;
      this.isValidChange(value);
    }
  }

  isValidKeyEvent(keyCode: number): boolean {
    return false;
  }

  cellEditSpecialKeyEvent(keyCode: number) {
    const data: IccCellEditKey = { rowIndex: this.rowIndex, colIndex: this.colIndex, keyCode: keyCode, direction: '' };
    if (this.isValidKeyEvent(keyCode)) {
      switch (keyCode) {
        case IccKeyboard.PAGE_UP:
        case IccKeyboard.UP_ARROW:
          data.direction = IccDirection.UP;
          break;
        case IccKeyboard.PAGE_DOWN:
        case IccKeyboard.DOWN_ARROW:
          data.direction = IccDirection.DOWN;
          break;
        case IccKeyboard.HOME:
        case IccKeyboard.LEFT_ARROW:
          data.direction = IccDirection.LEFT;
          break;
        case IccKeyboard.END:
        case IccKeyboard.RIGHT_ARROW:
          data.direction = IccDirection.RIGHT;
          break;
      }
    }
    if (data.direction !== '') {
      this.cellEditSpecialKeyEvent$.next(data);
    }
  }

  onBlur() {
    this.saveCellValue();
  }

  isValidChange(value: T): boolean {
    const control = new UntypedFormControl(value, this.validations);
    this.message = '';
    if (control.errors) {
      Object.keys(control.errors).forEach((name) => {

        //const validation = IccUtils.findExactByKey(this.column.validations, 'name', name);
       // if (validation) {
       //   this.message = validation.message;
       // }
      });
      return false;
    } else {
      return true;
    }
  }

  isValueChanged(): boolean {
    return !this.message ? true : false;
  }

  saveCellValue() {
    if (!this.isChangeSaved && this.isValidChange(this.value) && this.isValueChanged()) {
      this.isChangeSaved = true;
      const cellData: IccCellEditData<T> = {
        dataKeyId: this.dataKeyId,
        dataKeyValue: this.record[this.dataKeyId],
        field: this.field,
        value: this.value,
      };
      this.saveCellEditValue$.next(cellData);
    }
  }

  resetValue(event: MouseEvent) {
    event.stopPropagation();
    this.value = this.record[this.column.name];
    this.message = '';
  }
    */
}
