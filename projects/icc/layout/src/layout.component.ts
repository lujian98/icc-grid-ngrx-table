import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, input } from '@angular/core';
import { uniqueId } from '@icc/ui/core';
import { IccResizeDirective, IccResizeInfo, IccResizeType } from '@icc/ui/resize';

@Component({
  selector: 'icc-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.icc-main-viewport-layout]': 'layout() === "viewport"',
    '[class.icc-normal-layout]': 'layout() !== "viewport"',
  },
  imports: [CommonModule, IccResizeDirective],
})
export class IccLayoutComponent {
  private readonly elementRef = inject(ElementRef);
  resizeType = IccResizeType;
  elementKey = uniqueId(16);
  resizeable = input<boolean>(false);
  layout = input<string>(''); // viewport
  height = input<string>('');
  width = input<string>('');

  get viewportLayout(): boolean {
    return this.layout() === 'viewport';
  }

  get normalLayout(): boolean {
    return this.layout() !== 'viewport';
  }

  constructor() {
    effect(() => {
      if (this.height()) {
        this.setHeight(this.height());
      }
      if (this.width()) {
        this.setWidth(this.width());
      }
    });
  }

  onResizePanel(resizeInfo: IccResizeInfo): void {
    if (resizeInfo.isResized) {
      const height = resizeInfo.height * resizeInfo.scaleY;
      const width = resizeInfo.width * resizeInfo.scaleX;
      this.setHeight(`${height}px`);
      this.setWidth(`${width}px`);
    }
  }

  private setHeight(height: string): void {
    const el = this.elementRef.nativeElement;
    if (el) {
      el.style.height = height;
    }
  }

  private setWidth(width: string): void {
    const el = this.elementRef.nativeElement;
    if (el) {
      el.style.width = width;
    }
  }
}
