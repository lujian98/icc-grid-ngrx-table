import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTab, MatTabGroup } from '@icc/ui/tabs';

@Component({
  selector: 'app-simple-tabs',
  templateUrl: './simple-tabs.component.html',
  styleUrls: ['./simple-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatTab, MatTabGroup],
})
export class AppSimpleTabsComponent {}
