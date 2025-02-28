import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IccMenuConfig, IccMenusComponent, IccPopoverMenuComponent } from '@icc/ui/menu';
import { IccTrigger } from '@icc/ui/overlay';
import { MockMenuItems } from '../mock-menu';

@Component({
  selector: 'app-simple-menu',
  templateUrl: './simple-menu.component.html',
  styleUrls: ['./simple-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IccMenusComponent, IccPopoverMenuComponent],
})
export class AppSimpleMenuComponent implements OnInit {
  contextmenu: IccTrigger = IccTrigger.CONTEXTMENU;

  menuItems: any;
  testMenuItems = MockMenuItems;

  ngOnInit() {
    this.menuItems = [this.testMenuItems];
  }

  menuItemClick(item: IccMenuConfig): void {
    console.log(' 999999 end  iccMenuItemClick=', item);
  }
}
