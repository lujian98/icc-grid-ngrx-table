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
  selector: 'icc-layout-left',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class IccLayoutLeftComponent {}

@Component({
  selector: 'icc-layout-center',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class IccLayoutCenterComponent {}

@Component({
  selector: 'icc-layout-right',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class IccLayoutRightComponent {}

@Component({
  selector: 'icc-layout-horizontal',
  templateUrl: './layout-horizontal.component.html',
  styleUrls: ['./layout-horizontal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    IccResizeDirective,
    IccLayoutLeftComponent,
    IccLayoutCenterComponent,
    IccLayoutRightComponent,
  ],
})
export class IccLayoutHorizontalComponent implements AfterViewInit, OnDestroy {
  private elementRef = inject(ElementRef);

  @Input() resizeable!: boolean;
  @ViewChild('tplResizeLeftRight', { static: true }) tplResizeLeftRight!: TemplateRef<any>;
  @ViewChild('tplResizeRightLeft', { static: true }) tplResizeRightLeft!: TemplateRef<any>;
  //@ViewChild('tplResizeTopBottom', { static: true }) tplResizeTopBottom!: TemplateRef<any>;
  //@ViewChild('tplResizeBottomTop', { static: true }) tplResizeBottomTop!: TemplateRef<any>;
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
    //this.checkPanelHeight();
  }

  private checkResizeCondition(): void {
    // TODO createEmbeddedView will disable the html input???
    // console.log(' 111111111111 this.divContainer=', this.divContainer, ' this.elementRef=', this.elementRef);
    const elements: HTMLDivElement[] = Array.from(this.elementRef.nativeElement.children);
    let left = false;
    let center = false;
    let right = false;
    console.log(' this.elementRef=', this.elementRef);
    // const contents = Array.from(this.elementRef.nativeElement.children);
    elements.forEach((el: HTMLDivElement) => {
      //console.log(' el=', el)
      const mmm = el.localName;
      console.log(' el localName=', mmm);
      if (!left && el.localName === 'icc-layout-left') {
        left = true;
      }
      if (!center && el.localName === 'icc-layout-center') {
        center = true;
      }
      if (!right && el.localName === 'icc-layout-right') {
        right = true;
      }
    });
    const style = window.getComputedStyle(this.elementRef.nativeElement);
    if (left && (center || right)) {
      this.contentResizeLeftRight.createEmbeddedView(this.tplResizeLeftRight);
      /*
      if (style.flexDirection === 'row') {
        this.contentResizeLeftRight.createEmbeddedView(this.tplResizeLeftRight);
      } else if (style.flexDirection === 'column') {
        //this.contentResizeLeftRight.createEmbeddedView(this.tplResizeTopBottom);
      }*/
    }
    if (right && center) {
      this.contentResizeRightLeft.createEmbeddedView(this.tplResizeRightLeft);
      /*
      if (style.flexDirection === 'row') {
        this.contentResizeRightLeft.createEmbeddedView(this.tplResizeRightLeft);
      } else if (style.flexDirection === 'column') {
        //this.contentResizeRightLeft.createEmbeddedView(this.tplResizeBottomTop);
      }*/
    }
  }

  onResizePanel(resizeInfo: IccResizeInfo): void {
    if (resizeInfo.isResized) {
      // this.checkPanelHeight();
      //resize grid need get viewport size
      timer(500)
        .pipe(take(1))
        .subscribe(() => {
          window.dispatchEvent(new Event('resize'));
        });
    }
  }

  /*
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
  }*/

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
