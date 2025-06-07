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
  selector: 'icc-layout-left',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IccLayoutLeftComponent {}

@Component({
  selector: 'icc-layout-center',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IccLayoutCenterComponent {}

@Component({
  selector: 'icc-layout-right',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IccLayoutRightComponent {}

@Component({
  selector: 'icc-layout-horizontal',
  templateUrl: './layout-horizontal.component.html',
  styleUrls: ['./layout-horizontal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IccResizeDirective],
})
export class IccLayoutHorizontalComponent<T> implements AfterViewInit {
  private elementRef = inject(ElementRef);
  elementKey = uniqueId(16);
  resizeType = IccResizeType;
  resizeable = input<boolean>(false);

  @ViewChild('tplResizeLeftRight', { static: true }) tplResizeLeftRight!: TemplateRef<T>;
  @ViewChild('tplResizeRightLeft', { static: true }) tplResizeRightLeft!: TemplateRef<T>;
  @ViewChild('contentResizeLeftRight', { read: ViewContainerRef }) contentResizeLeftRight!: ViewContainerRef;
  @ViewChild('contentResizeRightLeft', { read: ViewContainerRef }) contentResizeRightLeft!: ViewContainerRef;

  ngAfterViewInit(): void {
    if (this.resizeable()) {
      this.checkResizeCondition();
    }
  }

  private checkResizeCondition(): void {
    const left = this.getPanelEl('left');
    const center = this.getPanelEl('center');
    const right = this.getPanelEl('right');
    if (left && (center || right)) {
      this.contentResizeLeftRight.createEmbeddedView(this.tplResizeLeftRight);
    }
    if (right && center) {
      this.contentResizeRightLeft.createEmbeddedView(this.tplResizeRightLeft);
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
