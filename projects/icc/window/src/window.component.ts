import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, Input } from '@angular/core';
import { uniqueId } from '@icc/ui/core';
import { IccResizeDirective, IccResizeInfo, IccResizeType } from '@icc/ui/resize';
import { IccDialogRef } from '@icc/ui/overlay';
import { IccButtonComponent } from '@icc/ui/button';

@Component({
  selector: 'icc-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IccResizeDirective, IccButtonComponent],
})
export class IccWindowComponent<T> {
  private dialogRef = inject(IccDialogRef<T>);

  private elementRef = inject(ElementRef);
  resizeType = IccResizeType;
  elementKey = uniqueId(16);
  @Input() resizeable: boolean = true;

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
