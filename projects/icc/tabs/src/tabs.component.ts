import { CdkDrag, CdkDragDrop, CdkDropList, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { IccTabGroupComponent } from './components/tab-group/tab-group.component';
import { IccTabComponent } from './components/tab/tab.component';
import { IccTabLabelDirective } from './directives/tab-label.directive';

@Component({
  selector: 'icc-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    DragDropModule,
    CdkDrag,
    CdkDropList,
    IccTabLabelDirective,
    IccTabComponent,
    IccTabGroupComponent,
  ],
})
export class IccTabsComponent<T> implements OnInit, AfterViewInit, OnDestroy {
  protected tabs = ['One', 'Two', 'Three', 'Four', 'Five'];
  protected selectedTabIndex = 0;

  drop(event: CdkDragDrop<string[]>): void {
    const prevActive = this.tabs[this.selectedTabIndex];
    moveItemInArray(this.tabs, event.previousIndex, event.currentIndex);
    console.log(' event.previousIndex =', event.currentIndex);
    this.selectedTabIndex = event.currentIndex; //this.tabs.indexOf(prevActive);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {}
}
