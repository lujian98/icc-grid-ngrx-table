import { Component } from '@angular/core';
import { SunNumberField } from '../../../../fields/number_field';
import { SunCellEditComponent } from '../cell-edit-base.component';
import { SunKeyboard } from '../../../../fields/fieldConfig.model';
import { SunUtils } from '../../../../utils/utils';

@Component({
  selector: 'sun-cell-edit-number',
  templateUrl: './cell-edit-number.component.html',
  standalone: false,
})
export class SunCellEditNumberComponent<T> extends SunCellEditComponent<T> {
  set column(val: SunNumberField) {
    this._column = val;
    this.setValidations(val);
  }

  get column(): SunNumberField {
    return this._column as SunNumberField;
  }

  SunKeyboard = SunKeyboard;

  constructor() {
    super();
  }

  isValueChanged(): boolean {
    if (
      Number(this.value) !== Number(this.record[this.column.field]) ||
      !(this.value === null && this.record[this.column.field] === null)
    ) {
      return super.isValueChanged();
    } else {
      return false;
    }
  }

  click(event: MouseEvent) {
    event.stopPropagation();
  }

  focus(event: FocusEvent) {
    setTimeout(() => {
      // @ts-ignore
      event.target.select();
    }, 1);
  }

  wheel(event: MouseEvent) {
    event.stopPropagation();
  }

  keydown(event: KeyboardEvent) {
    const keyCode = event.keyCode;
    if (
      keyCode === SunKeyboard.HOME ||
      keyCode === SunKeyboard.LEFT_ARROW ||
      keyCode === SunKeyboard.END ||
      keyCode === SunKeyboard.RIGHT_ARROW
    ) {
      this.cellEditSpecialKeyEvent(event.keyCode);
    }
  }

  isFieldSelected(): boolean {
    if (typeof this.value === 'number' || typeof this.value === 'string') {
      return Number(document.getSelection()) === Number(this.value);
    } else {
      return false;
    }
  }

  isValidKeyEvent(keyCode: number): boolean {
    if (this.isFieldSelected()) {
      return true;
    } else {
      return false;
    }
  }

  saveCellValue() {
    super.saveCellValue();
    const decimals = SunUtils.countDecimals(this.value);
    this.step = 1 / Math.pow(10, decimals);
  }
}
