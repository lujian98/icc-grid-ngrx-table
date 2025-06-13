import { CdkMenu, CdkMenuTrigger } from '@angular/cdk/menu';
import { ChangeDetectionStrategy, Component, input, OnDestroy, output, signal } from '@angular/core';
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
  private readonly destroy$ = new Subject<void>();
  private selected: IccMenuConfig | undefined;
  private isFirstTime: boolean = true;
  items$ = signal<IccMenuConfig[]>([]);
  values$ = signal<{ [key: string]: boolean }>({});
  form = input(new FormGroup({}), { transform: (form: FormGroup) => form });
  disabled = input<IccDisabled[]>([]);
  level = input<number>(0);
  items = input([], {
    transform: (items: IccMenuConfig[]) => {
      this.items$.set(items);
      this.setSelected(this.selected);
      if (this.isFirstTime) {
        this.form()
          .valueChanges.pipe(debounceTime(100), distinctUntilChanged(), takeUntil(this.destroy$))
          .subscribe((val) => {
            this.iccMenuFormChanges.emit(this.form().value as T);
            this.values$.set(this.form().value);
          });
        this.isFirstTime = false;
      }
      items.forEach((item) => {
        const field = this.form().get(item.name);
        if (item.checkbox && !field) {
          this.form().addControl(item.name, new FormControl<boolean>({ value: false, disabled: false }, []));
        }
      });
      return items;
    },
  });
  values = input(
    {},
    {
      transform: (values: { [key: string]: boolean }) => {
        this.values$.set(values);
        if (this.form && values) {
          this.form().patchValue({ ...values }, { emitEvent: false });
        }
        return values;
      },
    },
  );

  iccMenuItemClick = output<IccMenuConfig>();
  iccMenuFormChanges = output<T>();

  getDisabled(menu: IccMenuConfig): boolean {
    const find = this.disabled().find((item) => item.name === menu.name);
    return find ? find.disabled : false;
  }

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

  private setSelected(selected: IccMenuConfig | undefined): void {
    if (selected) {
      const items = this.items$().map((item) => ({
        ...item,
        selected: item.name === selected.name,
      }));
      this.items$.set(items);
    }
    this.selected = selected;
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
