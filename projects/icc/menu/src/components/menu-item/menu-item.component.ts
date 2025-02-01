import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { defaultCheckboxFieldConfig, IccCheckboxFieldComponent, IccCheckboxFieldConfig } from '@icc/ui/fields';
import { IccIconModule } from '@icc/ui/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { IccMenuItem } from '../../models/menu-item.model';

@Component({
  selector: 'icc-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  private _menuItem!: IccMenuItem;
  @Input() menuType!: string;
  @Input() form!: FormGroup;
  private _disabled: boolean = false;

  fieldConfig: IccCheckboxFieldConfig = {
    ...defaultCheckboxFieldConfig,
  };

  @Input()
  set menuItem(val: IccMenuItem) {
    this._menuItem = val;
    this.fieldConfig = {
      ...defaultCheckboxFieldConfig,
      fieldName: this.menuItem.name,
      fieldLabel: this.menuItem.title || this.menuItem.name,
      labelBeforeCheckbox: false,
      editable: true,
    };
  }
  get menuItem(): IccMenuItem {
    return this._menuItem;
  }

  @HostBinding('class.menu-item-separator')
  get separator() {
    return this.menuItem.separator;
  }

  @HostBinding('class.selected')
  get selectedClass(): boolean {
    return !!this.menuItem.selected;
  }

  @HostBinding('class.disabled')
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

  @Output() iccMenuItemClick = new EventEmitter<IccMenuItem>(false);

  hasChildItem(item: IccMenuItem): boolean {
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
