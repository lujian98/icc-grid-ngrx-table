import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IccCheckboxModule } from '@icc/ui/checkbox';
//import { SelectionType } from '../../config';
//import { isCheckboxSelection, isRadioSelection } from '../../util/selection';

@Component({
  selector: 'icc-row-select',
  templateUrl: 'row-select.component.html',
  styleUrls: ['./row-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    IccCheckboxModule,
  ],
})
export class IccRowSelectComponent {
  @Input() isSelected = false;
  // @Input() id: any;
  // @Input() type: SelectionType;

  @Output() selected = new EventEmitter();

  /*
  get inputId() {
    return `${this.id}-${this.type}`;
  }

  isCheckbox() {
    return isCheckboxSelection(this.type);
  }

  isRadio() {
    return isRadioSelection(this.type);
  }
*/
  select() {
    if (!this.isSelected) {
      this.selected.emit();
    }
  }

}
