import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IccDisabled } from '@icc/ui/core';
import { IccMenuItem, IccMenusComponent } from '@icc/ui/menu';

@Component({
  selector: 'icc-menu-panel',
  templateUrl: './menu-panel.component.html',
  styleUrls: ['./menu-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IccMenusComponent],
})
export class IccMenuPanelComponent {
  @Input() level: number = 0;
  @Input() menuItems: IccMenuItem[] = [];
  @Input() values: { [key: string]: boolean }[] = [];
  @Input() disabled: IccDisabled[] = [];

  //TODO output may not working when use with IccPopoverComponent may need a service to do this?
  @Output() iccItemChangedEvent: EventEmitter<IccMenuItem> = new EventEmitter();

  onMenuFormChanges(values: { [key: string]: boolean }): void {}

  onMenuItemClick(item: IccMenuItem): void {
    this.iccItemChangedEvent.emit(item);
  }
}
