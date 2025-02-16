import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Input, inject } from '@angular/core';
import { uniqueId } from '@icc/ui/core';
import { IccResizeDirective, IccResizeInfo, IccResizeType } from '@icc/ui/resize';

@Component({
  selector: 'icc-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.icc-main-viewport-layout]': 'layout === "viewport"',
    '[class.icc-normal-layout]': 'layout !== "viewport"',
  },
  imports: [CommonModule, IccResizeDirective],
})
export class IccLayoutComponent {
  private elementRef = inject(ElementRef);
  private _width: string = '';
  private _height: string = '';
  resizeType = IccResizeType;
  elementKey = uniqueId(16);
  @Input() resizeable!: boolean;
  @Input() layout: string = ''; // viewport

  @Input()
  set height(val: string) {
    this._height = val;
    if (val) {
      this.setHeight(val);
    }
  }
  get height(): string {
    return this._height;
  }

  @Input()
  set width(val: string) {
    this._width = val;
    if (val) {
      this.setWidth(val);
    }
  }
  get width(): string {
    return this._width;
  }

  get viewportLayout(): boolean {
    return this.layout === 'viewport';
  }

  get normalLayout(): boolean {
    return this.layout !== 'viewport';
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
