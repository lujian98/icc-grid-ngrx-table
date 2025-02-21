import { Component, ElementRef, ViewChild } from '@angular/core';
import { IccKeyboard } from '../../../../../models/cell-edit.model';
import { IccCellEditBaseComponent } from '../cell-edit-base.component';

@Component({
  selector: 'icc-cell-edit-text',
  templateUrl: './cell-edit-text.component.html',
  standalone: false,
})
export class IccCellEditTextComponent<T> extends IccCellEditBaseComponent<T> {
  //IccKeyboard = IccKeyboard;

  @ViewChild('cellInput', { static: true }) cellInput!: ElementRef<HTMLInputElement>;

  /*
  constructor() {
    super();
  }*/

  override isValueChanged(): boolean {
    if (this.value !== this.record[this.column.name]) {
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

  keydown(event: KeyboardEvent) {
    this.cellEditSpecialKeyEvent(event.keyCode);
  }

  isFieldSelected(): boolean {
    const selected = document.getSelection();
    if (typeof this.value === 'string' && selected) {
      return selected.toString() === this.value;
    } else {
      return false;
    }
  }

  override isValidKeyEvent(keyCode: number): boolean {
    if (
      keyCode === IccKeyboard.HOME ||
      keyCode === IccKeyboard.LEFT_ARROW ||
      keyCode === IccKeyboard.END ||
      keyCode === IccKeyboard.RIGHT_ARROW
    ) {
      if (this.isFieldSelected()) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
}
