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
import { CommonModule } from '@angular/common';
import { IccTabLabelWrapperDirective } from '../../directives/tab-label-wrapper.directive';
import { IccInkBar } from '../../directives/ink-bar.directive';
import { IccPaginatedTabHeaderDirective } from '../../directives/paginated-tab-header.directive';
import { CdkObserveContent } from '@angular/cdk/observers';
import { IccIconModule } from '@icc/ui/icon';
import { IccButtonComponent } from '@icc/ui/button';

@Component({
  selector: 'icc-tab-header',
  templateUrl: './tab-header.component.html',
  styleUrls: ['./tab-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'icc-mdc-tab-header',
    '[class.icc-mdc-tab-header-pagination-controls-enabled]': '_showPaginationControls',
    '[class.icc-mdc-tab-header-rtl]': "_getLayoutDirection() == 'rtl'",
  },
  imports: [CommonModule, CdkObserveContent, IccIconModule, IccButtonComponent],
})
export class IccTabHeaderComponent
  extends IccPaginatedTabHeaderDirective
  implements AfterContentChecked, AfterContentInit, AfterViewInit, OnDestroy
{
  @ContentChildren(IccTabLabelWrapperDirective, { descendants: false }) _items!: QueryList<IccTabLabelWrapperDirective>;
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
