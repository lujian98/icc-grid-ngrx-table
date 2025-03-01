import { CdkMenu, CdkMenuTrigger } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IccDisabled } from '@icc/ui/core';
import { IccIconModule } from '@icc/ui/icon';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { IccMenuItemComponent } from './components/menu-item/menu-item.component';
import { IccMenuItem } from './directive/menu-item';
import { IccMenuConfig } from './models/menu-item.model';

//WARNING: cdk menus not works with grid column hide/show due to the point menu without element reference
@Component({
  selector: 'cdk-menus',
  templateUrl: './cdk-menus.component.html',
  styleUrls: ['./cdk-menus.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CdkMenu,
    IccIconModule,
    CdkMenuTrigger,
    IccMenuItem,
    IccMenuItemComponent,
  ],
})
export class CdkMenusComponent<T> implements OnDestroy {
  private _items: IccMenuConfig[] = [];
  private selected: IccMenuConfig | undefined;
  private destroy$ = new Subject<void>();
  private _values: { [key: string]: boolean } = {};

  @Input() form: FormGroup | undefined;
  @Input() disabled: IccDisabled[] = [];

  getDisabled(menu: IccMenuConfig): boolean {
    const find = this.disabled.find((item) => item.name === menu.name);
    return find ? find.disabled : false;
  }

  @Input()
  set items(val: IccMenuConfig[]) {
    this._items = val;
    this.setItems();
  }
  get items(): IccMenuConfig[] {
    return this._items;
  }

  @Input()
  set values(values: { [key: string]: boolean }) {
    if (this.form && values) {
      this.form.patchValue({ ...values }, { emitEvent: false });
    }
    this._values = values;
  }
  get values(): { [key: string]: boolean } {
    return this._values;
  }

  @Input() level = 0;

  @Output() iccMenuItemClick = new EventEmitter<IccMenuConfig>(false);
  @Output() iccMenuFormChanges = new EventEmitter<T>(false);

  menuItemClick(item: IccMenuConfig): void {
    if (!item.checkbox) {
      this.iccMenuItemClick.emit(item);
    }
    this.setSelected(item);
  }

  isLeafMenu(item: IccMenuConfig): boolean {
    return !item.hidden && (!item.children || item.children.length === 0);
  }

  hasChildItem(item: IccMenuConfig): boolean {
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

  private setSelected(selectedItem: IccMenuConfig): void {
    this.items.forEach((item) => (item.selected = item.name === selectedItem.name));
    this.selected = selectedItem;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
