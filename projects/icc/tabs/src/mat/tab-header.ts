import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  OnDestroy,
  QueryList,
  ViewChild,
} from '@angular/core';
import { IccTabLabelWrapper } from './tab-label-wrapper';
import { IccInkBar } from './ink-bar';
import { IccPaginatedTabHeader } from './paginated-tab-header';
import { CdkObserveContent } from '@angular/cdk/observers';

@Component({
  selector: 'icc-tab-header',
  templateUrl: 'tab-header.html',
  //styleUrls: ['./tab-header.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'mat-mdc-tab-header',
    '[class.mat-mdc-tab-header-pagination-controls-enabled]': '_showPaginationControls',
    '[class.mat-mdc-tab-header-rtl]': "_getLayoutDirection() == 'rtl'",
  },
  imports: [CdkObserveContent],
})
export class IccTabHeader
  extends IccPaginatedTabHeader
  implements AfterContentChecked, AfterContentInit, AfterViewInit, OnDestroy
{
  @ContentChildren(IccTabLabelWrapper, { descendants: false }) _items!: QueryList<IccTabLabelWrapper>;
  @ViewChild('tabListContainer', { static: true }) _tabListContainer!: ElementRef;
  @ViewChild('tabList', { static: true }) _tabList!: ElementRef;
  @ViewChild('tabListInner', { static: true }) _tabListInner!: ElementRef;
  @ViewChild('nextPaginator') _nextPaginator!: ElementRef<HTMLElement>;
  @ViewChild('previousPaginator') _previousPaginator!: ElementRef<HTMLElement>;
  _inkBar!: IccInkBar;

  @Input('aria-label') ariaLabel!: string;
  @Input('aria-labelledby') ariaLabelledby!: string;

  override ngAfterContentInit() {
    this._inkBar = new IccInkBar(this._items);
    super.ngAfterContentInit();
  }

  protected _itemSelected(event: KeyboardEvent) {
    event.preventDefault();
  }
}
