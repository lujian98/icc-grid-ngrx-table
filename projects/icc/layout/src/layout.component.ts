import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  inject,
  HostBinding,
} from '@angular/core';
import { IccResizeDirective, IccResizeInfo } from '@icc/ui/resize';
import { uniqueId } from '@icc/ui/core';

@Component({
  selector: 'icc-layout-header',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class IccLayoutHeaderComponent {}

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
  standalone: true,
  imports: [CommonModule, IccLayoutHeaderComponent, IccLayoutFooterComponent, IccResizeDirective],
})
export class IccLayoutComponent {
  private elementRef = inject(ElementRef);
  elementKey = uniqueId(16);
  @Input() resizeable!: boolean;
  @Input() layout: string | undefined; // viewport

  @HostBinding('class.icc-main-viewport-layout')
  get viewportLayout(): boolean {
    return this.layout === 'viewport';
  }

  @HostBinding('class.icc-normal-layout')
  get normalLayout(): boolean {
    return this.layout !== 'viewport';
  }

  //Not sure it is used
  onResizePanel(resizeInfo: IccResizeInfo): void {
    //console.log( ' resize =', resizeInfo)
    if (resizeInfo.isResized) {
      const height = resizeInfo.height * resizeInfo.scaleY;
      const width = resizeInfo.width * resizeInfo.scaleX;
      this.setHeight(`${height}px`);
      this.setWidth(`${width}px`);
    }
  }

  private setHeight(height: string): void {
    const el = this.elementRef.nativeElement;
    el.style.height = height;
  }

  private setWidth(width: string): void {
    const el = this.elementRef.nativeElement;
    el.style.width = width;
    el.parentNode.style.width = width;
  }
}
