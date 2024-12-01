import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Input,
  OnDestroy,
  ViewChild,
  inject,
} from '@angular/core';
import { IccColumnConfig, IccGridFacade, IccGridHeaderViewComponent } from '@icc/ui/grid';
import { BehaviorSubject, Observable, interval, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, skip, switchMap, take, takeUntil } from 'rxjs/operators';
import { IccTreeFacade } from '../+state/tree.facade';
import { IccTreeConfig, IccTreeNode } from '../models/tree-grid.model';
import { IccTreeRowComponent } from './tree-row/tree-row.component';

@Component({
  selector: 'icc-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, DragDropModule, ScrollingModule, IccGridHeaderViewComponent, IccTreeRowComponent],
})
export class IccTreeViewComponent<T> implements AfterViewInit, OnDestroy {
  private treeFacade = inject(IccTreeFacade);
  private gridFacade = inject(IccGridFacade);
  private _treeConfig!: IccTreeConfig;
  gridTemplateColumns: string = '';
  sizeChanged$: BehaviorSubject<any> = new BehaviorSubject({});
  treeData$!: Observable<IccTreeNode<T>[]>;
  columnHeaderPosition = 0;

  @Input() columns: IccColumnConfig[] = [];

  @Input()
  set treeConfig(val: IccTreeConfig) {
    this._treeConfig = { ...val };
    this.treeData$ = this.treeFacade.selectTreeData(this.treeConfig);
  }
  get treeConfig(): IccTreeConfig {
    return this._treeConfig;
  }

  gridTemplateColumnsEvent(event: string): void {
    this.gridTemplateColumns = event;
  }

  @ViewChild(CdkVirtualScrollViewport, { static: true })
  private viewport!: CdkVirtualScrollViewport;

  ngAfterViewInit(): void {
    interval(10)
      .pipe(take(1))
      .subscribe(() => this.setViewportPageSize());

    this.sizeChanged$
      .pipe(
        skip(1),
        debounceTime(250),
        distinctUntilChanged(),
        switchMap((event) => of(event).pipe(takeUntil(this.sizeChanged$.pipe(skip(1))))),
      )
      .subscribe(() => this.setViewportPageSize());
  }

  trackByIndex(index: number): number {
    return index;
  }

  onScrolledIndexChange(index: number): void {}

  onViewportScroll(event: any): void {
    this.columnHeaderPosition = -event.target.scrollLeft;
  }

  private setViewportPageSize(): void {
    const clientHeight = this.viewport.elementRef.nativeElement.clientHeight;
    const clientWidth = this.viewport.elementRef.nativeElement.clientWidth;
    const fitPageSize = Math.floor(clientHeight / this.treeConfig.rowHeight);
    const pageSize =
      !this.treeConfig.virtualScroll && !this.treeConfig.verticalScroll ? fitPageSize : this.treeConfig.pageSize;
    this.gridFacade.setViewportPageSize(this.treeConfig, pageSize, clientWidth);
    this.treeFacade.viewportReadyLoadData(this.treeConfig);
  }

  dragStart(node: T): void {
    //this.dragNode = node;
  }

  dragMoved(event: any): void {}

  drop(event: CdkDragDrop<string[]>): void {}

  @HostListener('window:resize', ['$event'])
  onResize(event: MouseEvent) {
    this.sizeChanged$.next(event);
  }

  ngOnDestroy(): void {
    this.sizeChanged$.complete();
  }
}
