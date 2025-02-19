import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject, Output, EventEmitter } from '@angular/core';
import { IccDisabled } from '@icc/ui/core';
import { IccMenuItem, IccMenusComponent } from '@icc/ui/menu';
import { Observable, combineLatest, map } from 'rxjs';

@Component({
  selector: 'icc-menu-panel',
  templateUrl: './menu-panel.component.html',
  styleUrls: ['./menu-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IccMenusComponent],
})
export class IccMenuPanelComponent {
  level = 0;

  @Input() menuItems: IccMenuItem[] = [];
  @Input() values: { [key: string]: boolean }[] = [];
  @Input() disabled: IccDisabled[] = [];
  @Output() iccItemChangedEvent: EventEmitter<IccMenuItem> = new EventEmitter();

  onMenuFormChanges(values: { [key: string]: boolean }): void {
    //console.log(' pppppp menu form values =', values);
  }

  onMenuItemClick(item: IccMenuItem): void {
    //console.log(' pppppp menu click =', item);
    this.iccItemChangedEvent.emit(item);
  }
}
