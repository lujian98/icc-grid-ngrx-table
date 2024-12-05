import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { IccResizeDirective, IccResizeInfo } from '@icc/ui/resize';
import { take, timer } from 'rxjs';

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
export class IccLayoutHorizontalComponent implements AfterViewInit {
  private elementRef = inject(ElementRef);
  @Input() resizeable!: boolean;
  @ViewChild('tplResizeLeftRight', { static: true }) tplResizeLeftRight!: TemplateRef<any>;
  @ViewChild('tplResizeRightLeft', { static: true }) tplResizeRightLeft!: TemplateRef<any>;
  @ViewChild('contentResizeLeftRight', { read: ViewContainerRef }) contentResizeLeftRight!: ViewContainerRef;
  @ViewChild('contentResizeRightLeft', { read: ViewContainerRef }) contentResizeRightLeft!: ViewContainerRef;
  @ContentChildren('divContainer', { read: ViewContainerRef }) divContainer!: QueryList<ViewContainerRef>;

  ngAfterViewInit(): void {
    if (this.resizeable) {
      this.checkResizeCondition();
    }
  }

  private checkResizeCondition(): void {
    const elements: HTMLDivElement[] = Array.from(this.elementRef.nativeElement.children);
    let left = false;
    let center = false;
    let right = false;
    elements.forEach((el: HTMLDivElement) => {
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
    //const style = window.getComputedStyle(this.elementRef.nativeElement);
    if (left && (center || right)) {
      this.contentResizeLeftRight.createEmbeddedView(this.tplResizeLeftRight);
    }
    if (right && center) {
      this.contentResizeRightLeft.createEmbeddedView(this.tplResizeRightLeft);
    }
  }

  onResizePanel(resizeInfo: IccResizeInfo): void {
    if (resizeInfo.isResized) {
      timer(500)
        .pipe(take(1))
        .subscribe(() => {
          window.dispatchEvent(new Event('resize'));
        });
    }
  }
}
