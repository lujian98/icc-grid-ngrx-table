import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IccButtonComponent } from '@icc/ui/button';
import { IccIconModule } from '@icc/ui/icon';
import { IccPosition, IccTrigger } from '@icc/ui/overlay';
import { IccPopoverDirective } from '@icc/ui/popover';
import { Subject, timer, take } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { IccMenuItemComponent } from './components/menu-item/menu-item.component';
import { IccMenuItem } from './models/menu-item.model';

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
  private destroy$ = new Subject<void>();
  bottom = IccPosition.BOTTOM;
  rightBottom = IccPosition.RIGHTBOTTOM;
  hoverTrigger = IccTrigger.HOVER; // HOVERCLICK; //
  private _values: any;

  @Input() form: FormGroup | undefined;
  private _disabled!: any;
  /*
  private _checked!: any[];

  @Input()
  set checked(val: any[]) {
    this._checked = val;
    // const values  = [...val].join();
    const values: any = {
      ID: val[0],
      vin: val[1],
      brand: val[2],
      year: val[3],
      color: val[4],
    };
    //this.setFieldValue(values);
    // this.form?.patchValue({ ...values });
    //this.values = values;

    timer(100)
      .pipe(take(1))
      .subscribe(() => {
        this.form?.patchValue({ ...values });
      });

    console.log('vvvvvvvvvvvvvvvvvvvvvvvv values', values);
  }

  get checked(): any[] {
    return this._checked;
  }

  setFieldValue(checked: any[]): void {

  }*/

  @Input()
  set disabled(disabled: any) {
    this._disabled = disabled;
  }
  get disabled(): any {
    return this._disabled;
  }

  @Input()
  set items(val: IccMenuItem[]) {
    this._items = val;
    if (this.selected) {
      this.items.forEach((item) => (item.selected = item.name === this.selected!.name));
    }

    if (!this.form) {
      this.form = new FormGroup({});
      this.form.valueChanges
        .pipe(debounceTime(100), distinctUntilChanged(), takeUntil(this.destroy$))
        .subscribe((val) => {
          this.iccMenuFormChanges.emit(this.form?.value);
        });
    }
    this.items.forEach((item) => {
      // TODO disabled ??
      const field = this.form!.get(item.name);
      if (item.checkbox && !field) {
        this.form!.addControl(item.name, new FormControl<boolean>({ value: false, disabled: false }, []));
      }
    });
  }
  get items(): IccMenuItem[] {
    return this._items;
  }

  @Input()
  set values(values: any) {
    this._values = values;
    if (this.form && values) {
      console.log('kkkkkkkkkkkkkkkkkkkvalues= ', values);
      this.form.patchValue({ ...values });
      // this.setFieldValue(this.checked);
    }
  }
  get values(): any {
    return this._values;
  }

  @Input() level = 0;
  @Input() menuTrigger: IccTrigger = IccTrigger.CLICK;

  getDisabled(item: IccMenuItem): boolean {
    return this.disabled ? this.disabled[item.name] : false;
  }

  @Output() iccMenuItemClick = new EventEmitter<IccMenuItem>(false);
  @Output() iccMenuFormChanges = new EventEmitter<any>(false);

  menuItemClick(item: IccMenuItem): void {
    if (!item.checkbox) {
      console.log(' item click=', item);
      this.iccMenuItemClick.emit(item);
    }
    this.setSelected(item);
  }

  isLeafMenu(item: IccMenuItem): boolean {
    return !item.hidden && (!item.children || item.children.length === 0);
  }

  hasChildItem(item: IccMenuItem): boolean {
    return !item.hidden && !!item.children && item.children.length > 0;
  }

  /*
  itemClicked(event: MouseEvent, selectedItem: IccMenuItem): void {
    if (selectedItem.disabled) {
      event.stopPropagation();
    } else {
      this.setSelected(selectedItem);
      this.iccMenuItemClick.emit(selectedItem);
    }
  }*/

  private setSelected(selectedItem: IccMenuItem): void {
    this.items.forEach((item) => (item.selected = item.name === selectedItem.name));
    this.selected = selectedItem;
  }
}
