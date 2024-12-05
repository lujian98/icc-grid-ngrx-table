import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  OnDestroy,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { IccResizeDirective, IccResizeInfo, IccSize } from '@icc/ui/resize';
import { Observable, Subject, take, timer } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'icc-layout-content',
  templateUrl: './layout-content.component.html',
  styleUrls: ['./layout-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IccResizeDirective],
})
export class IccLayoutContentComponent implements AfterViewInit, OnDestroy {
  private elementRef = inject(ElementRef);

  @Input() resizeable!: boolean;
  @ViewChild('tplResizeLeftRight', { static: true }) tplResizeLeftRight!: TemplateRef<any>;
  @ViewChild('tplResizeRightLeft', { static: true }) tplResizeRightLeft!: TemplateRef<any>;
  @ViewChild('tplResizeTopBottom', { static: true }) tplResizeTopBottom!: TemplateRef<any>;
  @ViewChild('tplResizeBottomTop', { static: true }) tplResizeBottomTop!: TemplateRef<any>;
  @ViewChild('contentResizeLeftRight', { read: ViewContainerRef }) contentResizeLeftRight!: ViewContainerRef;
  @ViewChild('contentResizeRightLeft', { read: ViewContainerRef }) contentResizeRightLeft!: ViewContainerRef;
  @ContentChildren('divContainer', { read: ViewContainerRef }) divContainer!: QueryList<ViewContainerRef>;

  private destroy$ = new Subject<boolean>();

  ngAfterViewInit(): void {
    if (this.resizeable) {
      this.setupPanelSizeObserver();
      this.checkResizeCondition();
    }
  }

  private setupPanelSizeObserver(): void {
    new Observable<IccSize>((observer) => {
      const config = { attributes: true, childList: true, subtree: true };
      new MutationObserver(() => observer.next(this.getPanelSize())).observe(this.elementRef.nativeElement, config);
    })
      .pipe(debounceTime(50), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((size) => this.initPanelSize());
  }

  getPanelSize(): IccSize {
    return {
      height: this.elementRef.nativeElement.offsetHeight,
      width: this.elementRef.nativeElement.offsetWidth,
    };
  }

  private initPanelSize(): void {
    this.checkPanelHeight();
  }

  private checkResizeCondition(): void {
    // TODO createEmbeddedView will disable the html input???
    // console.log(' 111111111111 this.divContainer=', this.divContainer, ' this.elementRef=', this.elementRef);
    const elements: HTMLDivElement[] = Array.from(this.elementRef.nativeElement.children);
    let start: any = null;
    let middle: any = null;
    let end: any = null;
    console.log(' this.elementRef=', this.elementRef);
    // const contents = Array.from(this.elementRef.nativeElement.children);
    elements.forEach((el: HTMLDivElement) => {
      //console.log(' el=', el)
      const mmm = el.localName;
      console.log(' el localName=', mmm);
      if (start === null) {
        start = el.getAttribute('start');
      }
      if (middle === null) {
        middle = el.getAttribute('middle');
      }
      if (end === null) {
        end = el.getAttribute('end');
      }
    });
    const style = window.getComputedStyle(this.elementRef.nativeElement);
    if (start !== null && (middle !== null || end !== null)) {
      if (style.flexDirection === 'row') {
        this.contentResizeLeftRight.createEmbeddedView(this.tplResizeLeftRight);
      } else if (style.flexDirection === 'column') {
        this.contentResizeLeftRight.createEmbeddedView(this.tplResizeTopBottom);
      }
    }
    if (end !== null && middle !== null) {
      if (style.flexDirection === 'row') {
        this.contentResizeRightLeft.createEmbeddedView(this.tplResizeRightLeft);
      } else if (style.flexDirection === 'column') {
        this.contentResizeRightLeft.createEmbeddedView(this.tplResizeBottomTop);
      }
    }
  }

  onResizePanel(resizeInfo: IccResizeInfo): void {
    if (resizeInfo.isResized) {
      this.checkPanelHeight();
      //resize grid need get viewport size
      timer(500)
        .pipe(take(1))
        .subscribe(() => {
          window.dispatchEvent(new Event('resize'));
        });
    }
  }

  private checkPanelHeight(): void {
    const natEl = this.elementRef.nativeElement;
    const style = window.getComputedStyle(natEl);
    if (style.flexDirection === 'column' && natEl.scrollHeight !== natEl.clientHeight) {
      const dh = natEl.scrollHeight - natEl.clientHeight;
      const elements: HTMLDivElement[] = Array.from(natEl.children);
      const els = elements.filter((element: HTMLDivElement) => element.getAttribute('middle') !== null);
      if (els.length === 1) {
        const height = els[0].clientHeight - dh;
        els[0].style.height = `${height}px`;
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
