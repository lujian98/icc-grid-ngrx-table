import { CdkDrag } from '@angular/cdk/drag-drop';
import { CommonModule, DOCUMENT } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, Input } from '@angular/core';
import { IccButtonComponent } from '@icc/ui/button';
import { uniqueId } from '@icc/ui/core';
import { IccDialogRef } from '@icc/ui/overlay';
import { IccResizeDirective, IccResizeInfo, IccResizeType } from '@icc/ui/resize';
import { take, timer } from 'rxjs';
import { defaultWindowConfig, IccWindowConfig } from './models/window.model';

@Component({
  selector: 'icc-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, CdkDrag, IccResizeDirective, IccButtonComponent],
})
export class IccWindowComponent<T> implements AfterViewInit {
  private dialogRef = inject(IccDialogRef<T>);
  private document = inject(DOCUMENT);
  private elementRef = inject(ElementRef);
  private _windowConfig: IccWindowConfig = defaultWindowConfig;

  resizeType = IccResizeType;
  elementKey = uniqueId(16);

  @Input()
  set windowConfig(val: IccWindowConfig) {
    this._windowConfig = { ...defaultWindowConfig, ...val };
  }
  get windowConfig(): IccWindowConfig {
    return this._windowConfig;
  }

  get element(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  ngAfterViewInit(): void {
    timer(10)
      .pipe(take(1))
      .subscribe(() => this.initWindow());
  }

  private initWindow(): void {
    const overlayEl = this.document.querySelector('.cdk-overlay-container');
    const width = overlayEl?.clientWidth!;
    const height = overlayEl?.clientHeight!;
    const w = this.element.clientWidth;
    const h = this.element.clientHeight;
    const topAdjust = w > width / 2 ? 4 : 2;
    const left = width < w ? 0 : (width - w) / 2;
    const top = height < h ? 0 : (height - h) / topAdjust;
    this.setWindowTop(top);
    this.setWindowLeft(left);
  }

  //TODO drag start issue???
  dragEnded(event: any): void {
    console.log(' droped=', event);
    const element = this.elementRef.nativeElement;
    const childEl = element.firstChild;
    //console.log( ' this.childEl=', childEl)
    var style = window.getComputedStyle(childEl);
    //console.log(' style.transform=', style.transform)
    const transformValue = style.getPropertyValue('transform');
    const matrix = transformValue
      .match(/matrix\((.*)\)/)![1]
      .split(',')
      .map(Number);
    //console.log(' matrix=', matrix)
    const translateX = matrix[4];
    const translateY = matrix[5];
    //console.log( 'element.style.top=', element.style.top)
    const top = parseFloat(element.style.top) + translateY;
    const left = parseFloat(element.style.left) + translateX;

    this.setWindowTop(top);
    this.setWindowLeft(left);
    childEl.style.transform = 'none';
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
