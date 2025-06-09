import { CdkDrag, CdkDragEnd, CdkDragHandle } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, ElementRef, inject, input } from '@angular/core';
import { IccButtonComponent } from '@icc/ui/button';
import { uniqueId } from '@icc/ui/core';
import { IccIconModule } from '@icc/ui/icon';
import { IccLayoutHeaderComponent } from '@icc/ui/layout';
import { IccDialogRef } from '@icc/ui/overlay';
import { IccResizeDirective, IccResizeInfo, IccResizeType } from '@icc/ui/resize';
import { ICC_DOCUMENT } from '@icc/ui/theme';
import { take, timer } from 'rxjs';
import { defaultWindowConfig, IccWindowConfig, IccWindowInfo } from './models/window.model';

@Component({
  selector: 'icc-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IccIconModule, CdkDrag, CdkDragHandle, IccResizeDirective, IccButtonComponent, IccLayoutHeaderComponent],
})
export class IccWindowComponent<T> {
  private readonly dialogRef = inject(IccDialogRef<T>);
  private readonly document = inject(ICC_DOCUMENT);
  private readonly elementRef = inject(ElementRef);
  private windowInfo!: IccWindowInfo;
  resizeType = IccResizeType;
  elementKey = uniqueId(16);
  windowConfig = input.required({
    transform: (val: IccWindowConfig) => {
      const windowConfig = { ...defaultWindowConfig, ...val };
      this.setWindow(windowConfig);
      return windowConfig;
    },
  });

  get element(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  get overlay(): HTMLElement {
    return this.document.querySelector('.cdk-overlay-container')!;
  }

  get isMaxWindowSize(): boolean {
    return (
      this.element.clientWidth === this.overlay.clientWidth && this.element.clientHeight === this.overlay.clientHeight
    );
  }

  private setWindow(windowConfig: IccWindowConfig): void {
    const height = windowConfig.height;
    if (height) {
      this.setHeight(parseFloat(height));
    }
    this.setWidth(parseFloat(windowConfig.width));

    timer(10)
      .pipe(take(1))
      .subscribe(() => this.initWindow());
  }

  private initWindow(): void {
    const width = this.overlay.clientWidth;
    const height = this.overlay.clientHeight;
    const w = this.element.clientWidth;
    const h = this.element.clientHeight;
    const topAdjust = h < height / 2 ? 4 : 2;
    const left = width < w ? 0 : (width - w) / 2;
    const top = height < h ? 0 : (height - h) / topAdjust;
    this.setWindowTop(top);
    this.setWindowLeft(left);
    this.setWindowInfo();
  }

  dragEnded(event: CdkDragEnd): void {
    const element = this.elementRef.nativeElement;
    const childEl = element.firstChild;
    var style = window.getComputedStyle(childEl);
    const transformValue = style.getPropertyValue('transform');
    const matrix = transformValue
      .match(/matrix\((.*)\)/)![1]
      .split(',')
      .map(Number);
    const translateX = matrix[4];
    const translateY = matrix[5];
    const top = this.getTop(translateY);
    const left = this.getLeft(translateX);

    this.setWindowTop(top);
    this.setWindowLeft(left);
    childEl.style.transform = 'none';
  }

  private getTop(translateY: number): number {
    const element = this.elementRef.nativeElement;
    const top = parseFloat(element.style.top) + translateY;
    if (top < 0) {
      return 0;
    } else if (top > this.overlay.clientHeight) {
      return top - 20;
    }
    return top;
  }

  private getLeft(translateX: number): number {
    const element = this.elementRef.nativeElement;
    const left = parseFloat(element.style.left) + translateX;
    if (left < 0) {
      return 0;
    } else if (left > this.overlay.clientWidth) {
      return left - 20;
    }
    return left;
  }

  maximize(): void {
    this.setWindowInfo();
    this.setWindowTop(0);
    this.setWindowLeft(0);
    this.setHeight(this.overlay.clientHeight);
    this.setWidth(this.overlay.clientWidth);
  }

  restore(): void {
    this.setWindowTop(this.windowInfo.top);
    this.setWindowLeft(this.windowInfo.left);
    this.setHeight(this.windowInfo.height);
    this.setWidth(this.windowInfo.width);
  }

  private setWindowInfo(): void {
    this.windowInfo = {
      top: parseFloat(this.element.style.top),
      left: parseFloat(this.element.style.left),
      width: this.element.clientWidth,
      height: this.element.clientHeight,
    };
  }

  close(): void {
    this.dialogRef.close();
  }

  onResizePanel(resizeInfo: IccResizeInfo): void {
    if (resizeInfo.isResized) {
      this.setWindowPosition(resizeInfo);
      this.setHeight(resizeInfo.height * resizeInfo.scaleY);
      this.setWidth(resizeInfo.width * resizeInfo.scaleX);
    }
  }

  private setWindowPosition(resizeInfo: IccResizeInfo): void {
    const top = parseFloat(this.element.style.top);
    const left = parseFloat(this.element.style.left);
    switch (resizeInfo.direction) {
      case IccResizeType.TOP:
      case IccResizeType.TOP_RIGHT:
        this.setWindowTop(top + resizeInfo.dy);
        break;
      case IccResizeType.LEFT:
      case IccResizeType.BOTTOM_LEFT:
        this.setWindowLeft(left + resizeInfo.dx);
        break;
      case IccResizeType.TOP_LEFT:
        this.setWindowTop(top + resizeInfo.dy);
        this.setWindowLeft(left + resizeInfo.dx);
        break;
    }
  }

  private setWindowTop(top: number): void {
    this.element.style.top = `${top}px`;
  }

  private setWindowLeft(left: number): void {
    this.element.style.left = `${left}px`;
  }

  private setHeight(height: number): void {
    const el = this.element;
    if (el) {
      el.style.height = `${height}px`;
    }
  }

  private setWidth(width: number): void {
    const el = this.element;
    if (el) {
      el.style.width = `${width}px`;
    }
  }
}
