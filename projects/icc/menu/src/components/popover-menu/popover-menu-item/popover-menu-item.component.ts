import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
//import { IccItemFieldService } from '../../../items/item_field.service';
//import { IccFieldViewService } from '../../../directives/field-view/field-view.service';
import { IccItemConfig } from '../model';
import { IccPopoverComponent, IccPopoverDirective } from '@icc/ui/popover';
import { IccMenuFieldDirective } from '../menu-field.directive';

@Component({
  selector: 'icc-popover-menu-item',
  templateUrl: './popover-menu-item.component.html',
  styleUrls: ['./popover-menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IccPopoverComponent, IccPopoverDirective, IccMenuFieldDirective],
})
export class IccPopoverMenuItemComponent implements OnInit {
  @Input() menuItemConfigs!: IccItemConfig[];
  @Input() menuItems: IccItemConfig[] | undefined = undefined;
  @Input() level = 0;

  @Output() iccItemChangedEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    //private itemService: IccItemFieldService,
    //private fieldViewService: IccFieldViewService,
    public router: Router,
  ) {}

  ngOnInit() {
    if (this.menuItemConfigs) {
      this.setMenuItems();
    }
  }

  setMenuItems() {
    this.menuItems = this.getMenuItems(this.menuItemConfigs);
    console.log(' this.menuItems=', this.menuItems);
  }

  private getMenuItems(configs: IccItemConfig[]): IccItemConfig[] | undefined {
    if (configs && configs.length > 0) {
      const menuItems: IccItemConfig[] = [];
      configs.forEach((config: IccItemConfig) => {
        const item: IccItemConfig | undefined = this.getMenuItem(config);
        if (config.children && config.children.length > 0) {
          if (item && item.children) {
            item.children = this.getMenuItems(config.children);
          }
        }
        menuItems.push(item);
      });
      return menuItems;
    }
    return undefined;
  }

  private getMenuItem(config: IccItemConfig): IccItemConfig {
    if (!config.type) {
      config.type = 'button';
    }
    //const item = this.itemService.getItem(config);
    //item.menuField = this.fieldViewService.getFieldView(config);
    //return item;
    return config;
  }

  onMenuItemChanged(event: any) {
    if (!event.disabled) {
      this.iccItemChangedEvent.emit(event);
    }
  }

  onMenuFieldChanged(event: any, item: any) {
    this.iccItemChangedEvent.emit(event);
  }
}
