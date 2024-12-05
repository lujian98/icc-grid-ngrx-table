import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, OnInit, inject } from '@angular/core';
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
export class IccLayoutComponent implements OnInit {
  private elementRef = inject(ElementRef);
  elementKey = uniqueId(16);

  @Input() height!: string; // TODO set input width and height
  @Input() width!: string;
  @Input() resizeable!: boolean;

  @Input() layout = 'fit'; // fit | viewport

  ngOnInit(): void {
    this.setVieportSize();
  }

  private setVieportSize(): void {
    if (this.layout === 'viewport') {
      const width = window.innerWidth || document.body.clientWidth;
      const height = window.innerHeight || document.body.clientHeight;
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

  //Not sure it is used
  onResizePanel(resizeInfo: IccResizeInfo): void {
    if (resizeInfo.isResized) {
      const height = resizeInfo.height * resizeInfo.scaleY;
      const width = resizeInfo.width * resizeInfo.scaleX;
      this.setHeight(`${height}px`);
      this.setWidth(`${width}px`);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: MouseEvent) {
    this.setVieportSize();
  }
}
