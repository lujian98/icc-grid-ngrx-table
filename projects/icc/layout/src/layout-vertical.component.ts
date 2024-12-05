import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { uniqueId } from '@icc/ui/core';
import { IccResizeDirective, IccResizeInfo } from '@icc/ui/resize';
import { take, timer } from 'rxjs';

@Component({
  selector: 'icc-layout-top',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class IccLayoutTopComponent {}

@Component({
  selector: 'icc-layout-middle',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class IccLayoutMiddleComponent {}

@Component({
  selector: 'icc-layout-bottom',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class IccLayoutBottomComponent {}

@Component({
  selector: 'icc-layout-vertical',
  templateUrl: './layout-vertical.component.html',
  styleUrls: ['./layout-vertical.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    IccResizeDirective,
    IccLayoutTopComponent,
    IccLayoutMiddleComponent,
    IccLayoutBottomComponent,
  ],
})
export class IccLayoutVerticalComponent implements AfterViewInit {
  private elementRef = inject(ElementRef);
  elementKey = uniqueId(16);
  @Input() resizeable!: boolean;

  @ViewChild('tplResizeTopBottom', { static: true }) tplResizeTopBottom!: TemplateRef<any>;
  @ViewChild('tplResizeBottomTop', { static: true }) tplResizeBottomTop!: TemplateRef<any>;
  @ViewChild('contentResizeTopBottom', { read: ViewContainerRef }) contentResizeTopBottom!: ViewContainerRef;
  @ViewChild('contentResizeBottomTop', { read: ViewContainerRef }) contentResizeBottomTop!: ViewContainerRef;

  ngAfterViewInit(): void {
    if (this.resizeable) {
      this.checkResizeCondition();
    }
  }

  private checkResizeCondition(): void {
    const elements: HTMLDivElement[] = Array.from(this.elementRef.nativeElement.children);
    const top = elements.find((el) => el.localName === 'icc-layout-top');
    const middle = elements.find((el) => el.localName === 'icc-layout-middle');
    const bottom = elements.find((el) => el.localName === 'icc-layout-bottom');
    if (top && (middle || bottom)) {
      this.contentResizeTopBottom.createEmbeddedView(this.tplResizeTopBottom);
    }
    if (bottom && middle) {
      this.contentResizeBottomTop.createEmbeddedView(this.tplResizeBottomTop);
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
