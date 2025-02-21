import { Component } from '@angular/core';
import { SunCellEditComponent } from '../cell-edit-base.component';
import { SunSelectField } from '../../../../fields/select_field';

@Component({
  selector: 'sun-cell-edit-select',
  templateUrl: './cell-edit-select.component.html',
  styleUrls: ['./cell-edit-select.component.scss'],
  standalone: false,
})
export class SunCellEditSelectComponent<T> extends SunCellEditComponent<T> {
  set column(val: SunSelectField<T>) {
    this._column = val;
    this.setValidations(val);
  }

  get column(): SunSelectField<T> {
    return this._column as SunSelectField<T>;
  }

  constructor() {
    super();
  }

  selectionChange(value: any) {
    if (this.column.multiSelect && value.length > 0 && !value[0]) {
      value = [];
    }
    this.isChangeSaved = false;
    this.value = value;
    this.isValidChange(value);
    if (!this.column.multiSelect) {
      this.saveCellValue();
    }
  }

  overlayOpen(isOverlayOpen: boolean): void {
    if (!isOverlayOpen && this.column.multiSelect) {
      this.saveCellValue();
    }
  }

  isValueChanged(): boolean {
    if (!this.message) {
      if (this.column.multiSelect) {
        const recordValue = this.column.getCheckedValue(this.record[this.column.field]);
        return JSON.stringify(this.value) !== JSON.stringify(recordValue);
      } else {
        return this.value !== this.record[this.column.field];
      }
    } else {
      return false;
    }
  }

  resetValue(event: MouseEvent) {
    super.resetValue(event);
    this.value = this.column.getCheckedValue(this.value);
  }
}
