import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { uniqueId } from '@icc/ui/core';
import { IccResizeDirective, IccResizeInfo, IccResizeType } from '@icc/ui/resize';
import { take, timer } from 'rxjs';

@Component({
  selector: 'icc-layout-top',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IccLayoutTopComponent {}

@Component({
  selector: 'icc-layout-middle',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IccLayoutMiddleComponent {}

@Component({
  selector: 'icc-layout-bottom',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IccLayoutBottomComponent {}

@Component({
  selector: 'icc-layout-vertical',
  templateUrl: './layout-vertical.component.html',
  styleUrls: ['./layout-vertical.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IccResizeDirective],
})
export class IccLayoutVerticalComponent<T> implements AfterViewInit {
  private elementRef = inject(ElementRef);
  elementKey = uniqueId(16);
  resizeType = IccResizeType;
  resizeable = input<boolean>(false);

  @ViewChild('tplResizeTopBottom', { static: true }) tplResizeTopBottom!: TemplateRef<T>;
  @ViewChild('tplResizeBottomTop', { static: true }) tplResizeBottomTop!: TemplateRef<T>;
  @ViewChild('contentResizeTopBottom', { read: ViewContainerRef }) contentResizeTopBottom!: ViewContainerRef;
  @ViewChild('contentResizeBottomTop', { read: ViewContainerRef }) contentResizeBottomTop!: ViewContainerRef;

  ngAfterViewInit(): void {
    if (this.resizeable()) {
      this.checkResizeCondition();
    }
  }

  private checkResizeCondition(): void {
    const top = this.getPanelEl('top');
    const middle = this.getPanelEl('middle');
    const bottom = this.getPanelEl('bottom');
    if (top && (middle || bottom)) {
      this.contentResizeTopBottom.createEmbeddedView(this.tplResizeTopBottom);
    }
    if (bottom && middle) {
      this.contentResizeBottomTop.createEmbeddedView(this.tplResizeBottomTop);
    }
  }

  togglePanel(panel: string): void {
    const el = this.getPanelEl(panel);
    if (el) {
      const style = window.getComputedStyle(el);
      const display = style.display === 'flex' ? 'none' : 'flex';
      el.style.setProperty('display', display);
      window.dispatchEvent(new Event('resize'));
    }
  }

  private getPanelEl(panel: string): HTMLDivElement | undefined {
    const elements: HTMLDivElement[] = Array.from(this.elementRef.nativeElement.children);
    return elements.find((el) => el.localName === `icc-layout-${panel}`);
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
