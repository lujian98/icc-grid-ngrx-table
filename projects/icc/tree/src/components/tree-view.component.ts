import { DragDropModule, CdkDragDrop, CdkDragMove } from '@angular/cdk/drag-drop';
import { DOCUMENT } from '@angular/common';
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
import { IccTreeConfig, IccTreeNode, IccTreeDropInfo } from '../models/tree-grid.model';
import { IccTreeRowComponent } from './tree-row/tree-row.component';
import { iccFindNodeId, iccGetNodeParent } from '../utils/nested-tree';

@Component({
  selector: 'icc-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, DragDropModule, ScrollingModule, IccGridHeaderViewComponent, IccTreeRowComponent],
})
export class IccTreeViewComponent<T> implements AfterViewInit, OnDestroy {
  private document = inject(DOCUMENT);
  private treeFacade = inject(IccTreeFacade);
  private gridFacade = inject(IccGridFacade);
  private _treeConfig!: IccTreeConfig;
  gridTemplateColumns: string = '';
  sizeChanged$: BehaviorSubject<any> = new BehaviorSubject({});
  treeData$!: Observable<IccTreeNode<T>[]>;
  columnHeaderPosition = 0;
  private dragNode: IccTreeNode<T> | null = null;
  private dropInfo: IccTreeDropInfo<T> | null = null;

  @Input() columns: IccColumnConfig[] = [];

  @Input()
  set treeConfig(val: IccTreeConfig) {
    this._treeConfig = { ...val };
    if (!this.treeData$) {
      this.treeData$ = this.treeFacade.selectTreeData(this.treeConfig);
    }
  }
  get treeConfig(): IccTreeConfig {
    return this._treeConfig;
  }

  getRecord(record: IccTreeNode<T>): IccTreeNode<T> {
    return { ...record };
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

  dragStart(node: IccTreeNode<T>): void {
    this.dragNode = node;
  }

  dragMoved(event: CdkDragMove, nodes: IccTreeNode<T>[]): void {
    this.dropInfo = null;
    const e = this.document.elementFromPoint(event.pointerPosition.x, event.pointerPosition.y);
    if (!e) {
      this.clearDragInfo();
      return;
    }
    const container = e.classList.contains('icc-tree-row') ? e : e.closest('.icc-tree-node');
    if (!container) {
      this.clearDragInfo();
      return;
    }
    const target = iccFindNodeId(container.getAttribute('tree-node-id')!, nodes)!;
    if (this.isNodeDroppable(target, nodes)) {
      this.dropInfo = {
        target: target,
      };
      const targetRect = container.getBoundingClientRect();
      const oneThird = targetRect.height / 3;
      if (event.pointerPosition.y - targetRect.top < oneThird && this.isDroppablePosition(target, 'before', nodes)) {
        this.dropInfo.position = 'before';
      } else if (
        event.pointerPosition.y - targetRect.top > 2 * oneThird &&
        this.isDroppablePosition(target, 'after', nodes)
      ) {
        this.dropInfo.position = 'after';
      } else {
        const dragParent = iccGetNodeParent(this.dragNode!, nodes);
        if (target.id !== dragParent?.id) {
          this.dropInfo = {
            ...this.dropInfo!,
            targetParent: target,
            targetIndex: 0,
            position: 'inside',
          };
        }
      }
      if (this.dropInfo.position) {
        this.showDragInfo();
      } else {
        this.clearDragInfo();
        this.dropInfo = null;
      }
    }
  }

  private isDroppablePosition(target: IccTreeNode<T>, position: string, nodes: IccTreeNode<T>[]): boolean {
    let targetIndex = nodes.indexOf(target);
    let dragIndex = nodes.indexOf(this.dragNode!);
    const targetParent = iccGetNodeParent(target, nodes);
    const dragParent = iccGetNodeParent(this.dragNode!, nodes);
    let parentNodes = targetParent?.children;
    if (targetParent == undefined) {
      parentNodes = nodes.filter((node) => node.level === 0);
    }
    targetIndex = parentNodes?.findIndex((node) => node.id === target.id)!;
    if (position === 'before') {
      targetIndex--;
    } else if (position === 'after') {
      targetIndex++;
    }

    this.dropInfo = {
      ...this.dropInfo!,
      targetParent,
      targetIndex: targetIndex < 0 ? 0 : targetIndex,
    };

    if ((targetParent == undefined && dragParent === undefined) || targetParent?.id === dragParent?.id) {
      dragIndex = parentNodes?.findIndex((node) => node.id === this.dragNode!.id)!;
      return dragIndex !== targetIndex;
    }
    return true;
  }

  private isNodeDroppable(target: IccTreeNode<T>, nodes: IccTreeNode<T>[]): boolean {
    return target.id !== this.dragNode?.id && !this.dragNodeHasSameParent(target, this.dragNode!, nodes);
  }

  private dragNodeHasSameParent<T>(target: IccTreeNode<T>, dragNode: IccTreeNode<T>, nodes: IccTreeNode<T>[]): boolean {
    const targetParent = iccGetNodeParent(target, nodes);
    if (targetParent?.id === this.dragNode?.id) {
      return true;
    }
    return targetParent ? this.dragNodeHasSameParent(targetParent, dragNode, nodes) : false;
  }

  private showDragInfo(): void {
    this.clearDragInfo();
    if (this.dropInfo?.target.id) {
      this.document.getElementById(this.dropInfo.target.id)?.classList.add('icc-tree-drop-' + this.dropInfo.position);
    }
  }

  private clearDragInfo(dropped: boolean = false): void {
    if (dropped) {
      this.dropInfo = null;
      this.dragNode = null;
    }
    this.document
      .querySelectorAll('.icc-tree-drop-before')
      .forEach((element) => element.classList.remove('icc-tree-drop-before'));
    this.document
      .querySelectorAll('.icc-tree-drop-after')
      .forEach((element) => element.classList.remove('icc-tree-drop-after'));
    this.document
      .querySelectorAll('.icc-tree-drop-inside')
      .forEach((element) => element.classList.remove('icc-tree-drop-inside'));
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (this.dropInfo && this.dragNode) {
      this.treeFacade.dropNode(this.treeConfig, this.dragNode, this.dropInfo.targetParent!, this.dropInfo.targetIndex!);
    }
    this.clearDragInfo(true);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: MouseEvent) {
    this.sizeChanged$.next(event);
  }

  ngOnDestroy(): void {
    this.sizeChanged$.complete();
  }
}
