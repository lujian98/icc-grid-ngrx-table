import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
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
    '[class.menu-item-separator]': 'menuItem.separator',
    '[class.selected]': 'menuItem.selected',
    '[class.disabled]': 'disabled',
  },
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    IccCheckboxFieldComponent,
    TranslatePipe,
    IccIconModule,
  ],
})
export class IccMenuItemComponent {
  private _menuItem!: IccMenuConfig;
  private _disabled: boolean = false;
  fieldConfig: IccCheckboxFieldConfig = {
    ...defaultCheckboxFieldConfig,
  };

  @Input() menuType!: string;
  @Input() form!: FormGroup;

  @Input()
  set menuItem(val: IccMenuConfig) {
    this._menuItem = val;
    this.fieldConfig = {
      ...defaultCheckboxFieldConfig,
      fieldName: this.menuItem.name,
      fieldLabel: this.menuItem.title || this.menuItem.name,
      labelBeforeCheckbox: false,
      editable: true,
    };
  }
  get menuItem(): IccMenuConfig {
    return this._menuItem;
  }

  get separator() {
    return this.menuItem.separator;
  }

  get selectedClass(): boolean {
    return !!this.menuItem.selected;
  }

  @Input()
  set disabled(disabled: boolean) {
    this._disabled = disabled;
  }
  get disabled(): boolean {
    return this._disabled;
  }

  get title(): string {
    return this.menuItem.title === undefined ? this.menuItem.name : this.menuItem.title;
  }

  @Output() iccMenuItemClick = new EventEmitter<IccMenuConfig>(false);

  hasChildItem(item: IccMenuConfig): boolean {
    return !item.hidden && !!item.children && item.children.length > 0;
  }

  @HostListener('click', ['$event']) onClick(event: MouseEvent): void {
    if (this.disabled) {
      event.stopPropagation();
    }
    if (!this.menuItem.checkbox && !this.disabled) {
      this.iccMenuItemClick.emit(this.menuItem);
    }
  }
}
