import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  signal,
  input,
  OnDestroy,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IccDisabled } from '@icc/ui/core';
import { IccIconModule } from '@icc/ui/icon';
import { IccPosition, IccTrigger } from '@icc/ui/overlay';
import { IccPopoverDirective } from '@icc/ui/popover';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { IccMenuItemComponent } from './components/menu-item/menu-item.component';
import { IccMenuConfig } from './models/menu-item.model';

@Component({
  selector: 'icc-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, FormsModule, IccIconModule, IccMenuItemComponent, IccPopoverDirective],
})
export class IccMenusComponent<T> implements OnDestroy {
  private selected: IccMenuConfig | undefined;
  private destroy$ = new Subject<void>();
  private isFirstTime: boolean = true;
  bottom = IccPosition.BOTTOM;
  rightBottom = IccPosition.RIGHTBOTTOM;
  hoverTrigger = IccTrigger.HOVER;
  items$ = signal<IccMenuConfig[]>([]);
  values$ = signal<{ [key: string]: boolean }>({});

  @Input() form: FormGroup | undefined;
  disabled = input<IccDisabled[]>([]);
  level = input<number>(0);
  clickToClose = input<boolean>(false);
  menuTrigger = input<IccTrigger>(IccTrigger.CLICK);

  items = input([], {
    transform: (items: IccMenuConfig[]) => {
      this.items$.set(items);
      this.setItems(items);
      return items;
    },
  });

  values = input(
    {},
    {
      transform: (values: { [key: string]: boolean }) => {
        this.values$.set(values);
        if (this.form && values) {
          this.form.patchValue({ ...values }, { emitEvent: false });
        }
        return values;
      },
    },
  );

  @Output() iccMenuItemClick = new EventEmitter<IccMenuConfig>(false);
  @Output() iccMenuFormChanges = new EventEmitter<T>(false);

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

  private setItems(items: IccMenuConfig[]): void {
    if (this.selected) {
      const items = this.items$().map((item) => {
        return {
          ...item,
          selected: item.name === this.selected!.name,
        };
      });
      this.items$.set(items);
    }
    if (!this.form) {
      this.form = new FormGroup({});
      this.form.valueChanges
        .pipe(debounceTime(100), distinctUntilChanged(), takeUntil(this.destroy$))
        .subscribe((val) => {
          this.iccMenuFormChanges.emit(this.form?.value);
          this.values$.set(this.form?.value);
          this.values = this.form?.value;
        });
    }
    items.forEach((item) => {
      // TODO disabled ??
      const field = this.form!.get(item.name);
      if (item.checkbox && !field) {
        this.form!.addControl(item.name, new FormControl<boolean>({ value: false, disabled: false }, []));
      }
    });
  }

  private setSelected(selectedItem: IccMenuConfig): void {
    const items = this.items$().map((item) => {
      return {
        ...item,
        selected: item.name === selectedItem.name,
      };
    });
    this.items$.set(items);
    this.selected = selectedItem;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
