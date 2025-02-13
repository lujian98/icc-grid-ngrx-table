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
  tabs = [
    {
      name: 'one',
      content: 'test1',
    },
    {
      name: 'two',
      title: 'Two',
      content: 'test2',
    },
    {
      name: 'three',
      content: 'test3',
    },
    {
      name: 'four',
      content: 'test4',
    },
    {
      name: 'five',
      content: 'test5',
    },
    {
      name: 'six',
      //content: 'test6',
    },
  ];
}
