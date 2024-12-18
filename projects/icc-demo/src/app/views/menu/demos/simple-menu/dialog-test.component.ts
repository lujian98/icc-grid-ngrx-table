import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, ElementRef, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IccButtonComponent } from '@icc/ui/button';
import { IccCalendarModule } from '@icc/ui/calendar';
import { IccCheckboxComponent } from '@icc/ui/checkbox';
import { IccFormComponent } from '@icc/ui/form';
import { IccFormFieldComponent, IccLabelDirective, IccSuffixDirective } from '@icc/ui/form-field';
import {
  IccLayoutComponent,
  IccLayoutHeaderComponent,
  IccLayoutFooterComponent,
  IccLayoutCenterComponent,
  IccLayoutHorizontalComponent,
  IccLayoutLeftComponent,
  IccLayoutRightComponent,
} from '@icc/ui/layout';
import { uniqueId } from '@icc/ui/core';
import { IccResizeDirective, IccResizeInfo, IccResizeType } from '@icc/ui/resize';
import { AppDialogDemoComponent } from './dialog.component';
import { IccDialogRef, IccDynamicOverlayService, IccOverlayModule } from '@icc/ui/overlay';

@Component({
  selector: 'app-dialog-test',
  templateUrl: './dialog-test.component.html',
  styleUrls: ['./dialog-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    IccButtonComponent,
    IccOverlayModule,
    IccLayoutComponent,
    IccLayoutHeaderComponent,
    IccLayoutFooterComponent,
    IccLayoutCenterComponent,
    IccLayoutHorizontalComponent,
    IccLayoutLeftComponent,
    IccLayoutRightComponent,
    IccFormComponent,
    ReactiveFormsModule,
    AppDialogDemoComponent,
    IccCheckboxComponent,
    IccCalendarModule,

    IccFormFieldComponent,
    IccLabelDirective,
    IccSuffixDirective,
    IccResizeDirective,
  ],
  providers: [IccDynamicOverlayService],
})
export class AppDialogTestDemoComponent {
  private elementRef = inject(ElementRef);
  resizeType = IccResizeType;
  elementKey = uniqueId(16);
  @Input() resizeable: boolean = true;

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

  private dialogRef = inject(IccDialogRef<AppDialogTestDemoComponent>);

  dialog: any;

  close(): void {
    //console.log('tttttttttttttttttttt close clicked');
    // this.dynamicOverlayService.hide();
    this.dialogRef.close('test uujj make love');
  }
}
