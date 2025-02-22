import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IccKeyboard } from '../../../../../models/cell-edit.model';
import { IccCellEditBaseComponent } from '../cell-edit-base.component';
import { IccTextFieldComponent, IccTextFieldConfig } from '@icc/ui/fields';

@Component({
  selector: 'icc-cell-edit-text',
  templateUrl: './cell-edit-text.component.html',
  styleUrls: ['cell-edit-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IccTextFieldComponent],
})
export class IccCellEditTextComponent<T> extends IccCellEditBaseComponent<T> {
  //IccKeyboard = IccKeyboard;
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

  /*
  //@ViewChild('cellInput', { static: true }) cellInput!: ElementRef<HTMLInputElement>;


  constructor() {
    super();
  }


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
    */
}
