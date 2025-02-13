import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IccTabComponent, IccTabGroupComponent, IccTabsComponent } from '@icc/ui/tabs';

@Component({
  selector: 'app-simple-tabs',
  templateUrl: './simple-tabs.component.html',
  styleUrls: ['./simple-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IccTabComponent, IccTabGroupComponent, IccTabsComponent],
})
export class AppSimpleTabsComponent {
  tabs = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];
}
