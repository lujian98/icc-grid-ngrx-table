import { CdkDrag, CdkDragDrop, CdkDropList, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  HostListener,
} from '@angular/core';
import { IccPortalComponent } from '@icc/ui/portal';
import { take, timer } from 'rxjs';
import { IccTabGroupComponent } from './components/tab-group/tab-group.component';
import { IccTabComponent } from './components/tab/tab.component';
import { IccTabLabelDirective } from './directives/tab-label.directive';
import { IccTabConfig } from './models/tabs.model';

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
    IccPortalComponent,
  ],
})
export class IccTabsComponent<T> implements OnInit, AfterViewInit, OnDestroy {
  protected selectedTabIndex = 0;

  @Input() tabs!: IccTabConfig[];

  getTabLabel(tab: IccTabConfig): string {
    return tab.title || tab.name;
  }

  onSelectedIndexChange(index: number): void {
    this.selectedTabIndex = index;
    //this.setWindow();
    window.dispatchEvent(new Event('resize'));
  }

  private setWindow(): void {
    timer(50)
      .pipe(take(1))
      .subscribe(() => window.dispatchEvent(new Event('resize')));
  }

  drop(event: CdkDragDrop<IccTabConfig>): void {
    const prevActive = this.tabs[this.selectedTabIndex];
    moveItemInArray(this.tabs, event.previousIndex, event.currentIndex);
    this.selectedTabIndex = this.tabs.indexOf(prevActive);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    //this.setWindow();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: MouseEvent): void {
    //this.setWindow();
    // window.dispatchEvent(new Event('resize'));
  }

  ngOnDestroy(): void {}
}
