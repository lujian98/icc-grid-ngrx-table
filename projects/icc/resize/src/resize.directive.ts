import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  inject,
} from '@angular/core';
import { IccResizeInfo, IccResizeType } from './model';

@Directive({
  selector: '[iccResize]',
  exportAs: 'iccResize',
  standalone: true,
})
export class IccResizeDirective implements OnInit, OnDestroy {
  private renderer = inject(Renderer2);
  private elementRef = inject(ElementRef);

  @Input() direction!: IccResizeType;
  @Input() elementKey!: string;

  private resizableMousedown!: () => void;
  private resizableMousemove!: () => void;
  private resizableMouseup!: () => void;

  private isResizing = false;
  private resizeInfo!: IccResizeInfo;

  @Output() iccResizeEvent: EventEmitter<IccResizeInfo> = new EventEmitter<IccResizeInfo>();

  ngOnInit(): void {
    this.resizableMousedown = this.renderer.listen(document, 'mousedown', (event: MouseEvent) => {
      const el = document.elementFromPoint(event.x, event.y)!;
      const direction = el.getAttribute('ng-reflect-direction');
      const elementKey = el.getAttribute('ng-reflect-element-key');
      if (!this.isResizing && elementKey === this.elementKey && direction === this.direction) {
        this.isResizing = true;
        this.setElementResize(event);
      }
    });
  }

  private setElementResize(e: MouseEvent): void {
    let el = this.elementRef.nativeElement.parentNode;
    if (this.direction === IccResizeType.LEFT_RIGHT || this.direction === IccResizeType.TOP_BOTTOM) {
      el = this.elementRef.nativeElement.previousElementSibling;
    } else if (this.direction === IccResizeType.RIGHT_LEFT || this.direction === IccResizeType.BOTTOM_TOP) {
      el = this.elementRef.nativeElement.nextElementSibling;
    }
    const box = el.getBoundingClientRect();
    this.resizeInfo = {
      direction: this.direction,
      element: el,
      isResized: false,
      origin: null,
      width: box.width,
      height: box.height,
      dx: 0,
      dy: 0,
      scaleX: 1,
      scaleY: 1,
      signX: Math.abs(box.right - e.pageX) < 10 ? 1 : -1,
      signY: Math.abs(box.bottom - e.pageY) < 10 ? 1 : -1,
    };
    this.resizableMousemove = this.renderer.listen(document, 'mousemove', (event: MouseEvent) => {
      if (this.isResizing && e && box) {
        this.resizeInfo.dx = event.pageX - e.pageX;
        this.resizeInfo.dy = event.pageY - e.pageY;
        this.resizeInfo.scaleX = (box.width + this.resizeInfo.signX * this.resizeInfo.dx) / box.width;
        this.resizeInfo.scaleY = (box.height + this.resizeInfo.signY * this.resizeInfo.dy) / box.height;
        this.elementTransform();
        if (this.resizeInfo.origin) {
          this.iccResizeEvent.emit(this.resizeInfo);
          if (this.direction === IccResizeType.LEFT_RIGHT || this.direction === IccResizeType.RIGHT_LEFT) {
            const width = this.resizeInfo.width * this.resizeInfo.scaleX;
            el.style.flex = `0 0 ${width}px`;
          } else if (this.direction === IccResizeType.TOP_BOTTOM || this.direction === IccResizeType.BOTTOM_TOP) {
            const height = this.resizeInfo.height * this.resizeInfo.scaleY;
            el.style.flex = `0 0 ${height}px`;
          } else {
            el.style['transform-origin'] = this.resizeInfo.origin;
            el.style.transform = `scale(${this.resizeInfo.scaleX}, ${this.resizeInfo.scaleY})`;
          }
        }
      }
    });
    this.resizableMouseup = this.renderer.listen(document, 'mouseup', (event: MouseEvent) => {
      if (this.isResizing && this.resizeInfo.origin) {
        if (this.direction === IccResizeType.TOP_BOTTOM || this.direction === IccResizeType.BOTTOM_TOP) {
          const height = this.resizeInfo.height * this.resizeInfo.scaleY;
          const parent = this.elementRef.nativeElement.parentElement;
          const dh = parent.scrollHeight - parent.clientHeight;
          el.style.flex = `0 0 ${height - dh}px`;
        } else if (this.direction === IccResizeType.LEFT_RIGHT) {
          const parent = this.elementRef.nativeElement.parentElement;
          const dw = parent.scrollWidth - parent.clientWidth;
          const width = this.resizeInfo.width * this.resizeInfo.scaleX;
          el.style.flex = `0 0 ${width - dw}px`;
        }
        el.style['transform-origin'] = '';
        el.style.transform = '';
        this.resizeInfo.isResized = true;
        this.iccResizeEvent.emit(this.resizeInfo);
        if (
          this.direction === IccResizeType.LEFT_RIGHT ||
          this.direction === IccResizeType.RIGHT_LEFT || // WARNING IE not supported
          this.direction === IccResizeType.TOP_BOTTOM ||
          this.direction === IccResizeType.BOTTOM_TOP
        ) {
          window.dispatchEvent(new Event('resize'));
        }
      }
      this.isResizing = false;
      event.preventDefault();
      event.stopPropagation();
      this.resizableMousemove();
      this.resizableMouseup();
    });
  }

  private elementTransform(): void {
    this.resizeInfo.origin = null;
    switch (this.direction) {
      case IccResizeType.TOP:
      case IccResizeType.TOP_BOTTOM:
        this.resizeInfo.origin = 'bottom';
        this.resizeInfo.scaleX = 1;
        break;
      case IccResizeType.RIGHT:
      case IccResizeType.LEFT_RIGHT:
        this.resizeInfo.origin = 'left';
        this.resizeInfo.scaleY = 1;
        break;
      case IccResizeType.BOTTOM:
      case IccResizeType.BOTTOM_TOP:
        this.resizeInfo.origin = 'top';
        this.resizeInfo.scaleX = 1;
        break;
      case IccResizeType.LEFT:
      case IccResizeType.RIGHT_LEFT:
        this.resizeInfo.origin = 'right';
        this.resizeInfo.scaleY = 1;
        break;
      case IccResizeType.TOP_LEFT:
        this.resizeInfo.origin = 'bottom right';
        break;
      case IccResizeType.TOP_RIGHT:
        this.resizeInfo.origin = 'bottom left';
        break;
      case IccResizeType.BOTTOM_RIGHT:
        this.resizeInfo.origin = 'top left';
        break;
      case IccResizeType.BOTTOM_LEFT:
        this.resizeInfo.origin = 'top right';
        break;
    }
  }

  ngOnDestroy(): void {
    this.resizableMousedown();
  }
}
