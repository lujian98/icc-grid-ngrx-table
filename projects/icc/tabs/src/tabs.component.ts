import { CdkDrag, CdkDragDrop, CdkDropList, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, Input } from '@angular/core';
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
  protected selectedTabIndex = 0;

  @Input() tabs!: T[];

  onSelectedIndexChange(index: number): void {
    this.selectedTabIndex = index;
  }

  drop(event: CdkDragDrop<T[]>): void {
    const prevActive = this.tabs[this.selectedTabIndex];
    moveItemInArray(this.tabs, event.previousIndex, event.currentIndex);
    this.selectedTabIndex = this.tabs.indexOf(prevActive);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {}
}
