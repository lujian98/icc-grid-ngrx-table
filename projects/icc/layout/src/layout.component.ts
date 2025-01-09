import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, inject } from '@angular/core';
import { uniqueId } from '@icc/ui/core';
import { IccResizeDirective, IccResizeInfo, IccResizeType } from '@icc/ui/resize';
import { IccLayoutHeaderComponent } from './layout-header.component';

@Component({
  selector: 'icc-layout-footer',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class IccLayoutFooterComponent {}

@Component({
  selector: 'icc-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IccLayoutHeaderComponent, IccLayoutFooterComponent, IccResizeDirective],
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

  @HostBinding('class.icc-main-viewport-layout')
  get viewportLayout(): boolean {
    return this.layout === 'viewport';
  }

  @HostBinding('class.icc-normal-layout')
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
