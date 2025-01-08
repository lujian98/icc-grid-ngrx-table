import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IccButtonComponent } from '@icc/ui/button';
import { IccDisabled } from '@icc/ui/core';
import { IccIconModule } from '@icc/ui/icon';
import { IccPosition, IccTrigger } from '@icc/ui/overlay';
import { IccPopoverDirective } from '@icc/ui/popover';
import { Subject } from 'rxjs';
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
export class IccMenusComponent implements OnDestroy {
  private _items: IccMenuItem[] = [];
  private selected: IccMenuItem | undefined;
  private destroy$ = new Subject<void>();
  bottom = IccPosition.BOTTOM;
  rightBottom = IccPosition.RIGHTBOTTOM;
  hoverTrigger = IccTrigger.HOVER;
  private _values: any[] = [];

  @Input() form: FormGroup | undefined;
  @Input() disabled: IccDisabled[] = [];

  getDisabled(menu: IccMenuItem): boolean {
    const find = this.disabled.find((item) => item.name === menu.name);
    return find ? find.disabled : false;
  }

  @Input()
  set items(val: IccMenuItem[]) {
    this._items = val;
    this.setItems();
  }
  get items(): IccMenuItem[] {
    return this._items;
  }

  @Input()
  set values(values: any[]) {
    if (this.form && values) {
      this.form.patchValue({ ...values }, { emitEvent: false });
    }
    this._values = values;
  }
  get values(): any[] {
    return this._values;
  }

  @Input() level = 0;
  @Input() clickToClose = false;
  @Input() menuTrigger: IccTrigger = IccTrigger.CLICK;

  @Output() iccMenuItemClick = new EventEmitter<IccMenuItem>(false);
  @Output() iccMenuFormChanges = new EventEmitter<any>(false);

  menuItemClick(item: IccMenuItem): void {
    if (!item.checkbox) {
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

  private setItems(): void {
    if (this.selected) {
      this.items.forEach((item) => (item.selected = item.name === this.selected!.name));
    }
    if (!this.form) {
      this.form = new FormGroup({});
      this.form.valueChanges
        .pipe(debounceTime(100), distinctUntilChanged(), takeUntil(this.destroy$))
        .subscribe((val) => {
          this.iccMenuFormChanges.emit(this.form?.value);
          this.values = this.form?.value;
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

  private setSelected(selectedItem: IccMenuItem): void {
    this.items.forEach((item) => (item.selected = item.name === selectedItem.name));
    this.selected = selectedItem;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
