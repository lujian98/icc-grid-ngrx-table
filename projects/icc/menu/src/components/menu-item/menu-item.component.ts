import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, input, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { defaultCheckboxFieldConfig, IccCheckboxFieldComponent, IccCheckboxFieldConfig } from '@icc/ui/fields';
import { IccIconModule } from '@icc/ui/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { IccMenuConfig } from '../../models/menu-item.model';

@Component({
  selector: 'icc-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.menu-item-separator]': 'menuItem().separator',
    '[class.selected]': 'menuItem().selected',
    '[class.disabled]': 'disabled()',
  },
  imports: [RouterModule, FormsModule, ReactiveFormsModule, IccCheckboxFieldComponent, TranslatePipe, IccIconModule],
})
export class IccMenuItemComponent {
  fieldConfig: IccCheckboxFieldConfig = { ...defaultCheckboxFieldConfig };
  form = input.required<FormGroup>();
  menuItem = input.required({
    transform: (menuItem: IccMenuConfig) => {
      this.fieldConfig = {
        ...defaultCheckboxFieldConfig,
        fieldName: menuItem.name,
        fieldLabel: menuItem.title || menuItem.name,
        labelBeforeCheckbox: false,
        editable: true,
      };
      return menuItem;
    },
  });
  disabled = input<boolean>(false);

  get separator() {
    return this.menuItem().separator;
  }

  get selectedClass(): boolean {
    return !!this.menuItem().selected;
  }

  get title(): string {
    return this.menuItem().title === undefined ? this.menuItem().name : this.menuItem().title!;
  }

  @Output() iccMenuItemClick = new EventEmitter<IccMenuConfig>(false);

  hasChildItem(item: IccMenuConfig): boolean {
    return !item.hidden && !!item.children && item.children.length > 0;
  }

  @HostListener('click', ['$event']) onClick(event: MouseEvent): void {
    if (this.disabled()) {
      event.stopPropagation();
    }
    if (!this.menuItem().checkbox && !this.disabled()) {
      this.iccMenuItemClick.emit(this.menuItem);
    }
  }
}
