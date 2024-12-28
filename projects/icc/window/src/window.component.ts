import { CommonModule } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, Input, AfterViewInit } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { take, timer } from 'rxjs';
import { uniqueId } from '@icc/ui/core';
import { IccResizeDirective, IccResizeInfo, IccResizeType } from '@icc/ui/resize';
import { IccDialogRef } from '@icc/ui/overlay';
import { IccButtonComponent } from '@icc/ui/button';
import { IccWindowConfig, defaultWindowConfig } from './models/window.model';

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

  ngAfterViewInit(): void {
    timer(20)
      .pipe(take(1))
      .subscribe(() => this.initWindow());
  }

  private initWindow(): void {
    const overlayEl = this.document.querySelector('.cdk-overlay-container');
    const width = overlayEl?.clientWidth!;
    const height = overlayEl?.clientHeight!;
    const element = this.elementRef.nativeElement;
    const w = element.clientWidth;
    const h = element.clientHeight;
    const topAdjust = w > width / 2 ? 4 : 2;
    const left = width < w ? 0 : (width - w) / 2;
    const top = height < h ? 0 : (height - h) / topAdjust;
    element.style.top = `${top}px`;
    element.style.left = `${left}px`;
  }

  close(): void {
    this.dialogRef.close();
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
      //el.parentNode.style.width = width;
    }
  }
}
