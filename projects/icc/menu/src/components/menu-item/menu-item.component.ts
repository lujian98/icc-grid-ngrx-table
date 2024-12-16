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
import { IccCheckboxComponent } from '@icc/ui/checkbox';
import { defaultCheckboxFieldConfig, IccCheckboxFieldComponent, IccCheckboxFieldConfig } from '@icc/ui/fields';
import { IccSuffixDirective } from '@icc/ui/form-field';
import { IccIconModule } from '@icc/ui/icon';
import { TranslateModule } from '@ngx-translate/core';
import { IccMenuItem } from '../../models/menu-item.model';

@Component({
  selector: 'icc-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    IccCheckboxFieldComponent,
    IccSuffixDirective,
    TranslateModule,
    IccIconModule,
    IccCheckboxComponent,
  ],
})
export class IccMenuItemComponent {
  private _menuItem!: IccMenuItem;
  @Input() menuType!: string;
  @Input() form!: FormGroup;

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
  get disabled(): boolean {
    return !!this.menuItem.disabled;
  }

  get title(): string {
    return this.menuItem.title === undefined ? this.menuItem.name : this.menuItem.title;
  }

  @Output() iccMenuItemClick = new EventEmitter<IccMenuItem>(false);
  //@Output() iccMenuItemChange = new EventEmitter<IccMenuItem>(false);

  hasChildItem(item: IccMenuItem): boolean {
    return !item.hidden && !!item.children && item.children.length > 0;
  }

  /*
  onMenuItemChange(item: IccMenuItem): void {
    if(item.name) {
      console.log( '33333333333 item changed=', item)
      this.iccMenuItemChange.emit(item);
    }
  }*/

  @HostListener('click', ['$event']) onClick(event: MouseEvent) {
    // console.log(' 22222 =', this.menuItem);
    this.iccMenuItemClick.emit(this.menuItem);
    //this.iccMenuItemChange.emit(this.menuItem);
  }
}
