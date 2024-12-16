import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IccTrigger, IccPosition } from '@icc/ui/overlay';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IccPopoverDirective } from '@icc/ui/popover';
import { IccMenuItemComponent } from './components/menu-item/menu-item.component';
import { IccMenuItem } from './models/menu-item.model';
import { IccButtonComponent } from '@icc/ui/button';
import { IccIconModule } from '@icc/ui/icon';

@Component({
  selector: 'icc-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IccIconModule,
    IccMenuItemComponent,
    IccPopoverDirective,
    IccButtonComponent,
  ],
})
export class IccMenusComponent {
  private _items: IccMenuItem[] = [];
  private selected: IccMenuItem | undefined;
  //form: FormGroup = new FormGroup({});
  bottom = IccPosition.BOTTOM;
  rightBottom = IccPosition.RIGHTBOTTOM;
  hoverTrigger = IccTrigger.HOVERCLICK; //HOVER;

  @Input() form: FormGroup | undefined;

  @Input()
  set items(val: IccMenuItem[]) {
    this._items = val;
    if (this.selected) {
      this.items.forEach((item) => (item.selected = item.name === this.selected!.name));
    }

    if (!this.form) {
      this.form = new FormGroup({});
      this.items.forEach((item) => {
        // TODO disabled ??
        if (item.checkbox) {
          this.form!.addControl(item.name, new FormControl<boolean>({ value: false, disabled: false }, []));
        }
      });
    }
  }
  get items(): IccMenuItem[] {
    return this._items;
  }

  /*

  this.form.addControl(field.fieldName!, new FormControl<string>({ value: '', disabled: !!field.readonly }, []));

    private addFormControls(formFields: IccFormField[]): void {
    formFields.forEach((field) => {
      if (field.fieldType === 'fieldset') {
        this.addFormControls((field as IccFieldsetConfig).formFields);
      } else if (!this.form.get(field.fieldName!)) {
        this.form.addControl(field.fieldName!, new FormControl<string>({ value: '', disabled: !!field.readonly }, []));
        this.setValidators(field);
      }
    });
  }
    */
  @Input() level = 0;
  @Input() menuTrigger: IccTrigger = IccTrigger.CLICK;

  @Output() iccMenuItemChange = new EventEmitter<IccMenuItem>(true);
  @Output() iccMenuItemClick = new EventEmitter<IccMenuItem>(false);

  menuItemClick(item: IccMenuItem): void {
    //console.log(' 1111 iccMenuItemClick=', item);
    this.iccMenuItemClick.emit(item);
  }

  isLeafMenu(item: IccMenuItem): boolean {
    return !item.hidden && (!item.children || item.children.length === 0);
  }

  hasChildItem(item: IccMenuItem): boolean {
    return !item.hidden && !!item.children && item.children.length > 0;
  }

  itemClicked(event: MouseEvent, selectedItem: IccMenuItem): void {
    if (selectedItem.disabled) {
      event.stopPropagation();
    } else {
      if (selectedItem.checkbox) {
        selectedItem = {
          ...selectedItem,
          checked: !selectedItem.checked,
        };
      }
      this.setSelected(selectedItem);
      this.iccMenuItemChange.emit(selectedItem);
    }
  }

  onMenuItemChange(item: IccMenuItem): void {
    if (item.name) {
      // console.log('11111 item changed=', item);
      this.setSelected(item);
      this.iccMenuItemChange.emit(item);
    }
  }

  private setSelected(selectedItem: IccMenuItem): void {
    this.items.forEach((item) => (item.selected = item.name === selectedItem.name));
    this.selected = selectedItem;
  }
}
