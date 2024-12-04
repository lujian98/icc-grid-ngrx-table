import {
  ChangeDetectionStrategy,
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  ContentChildren,
  ViewChildren,
  QueryList,
  ViewContainerRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IccResizeInfo, IccResizeDirective } from '@icc/ui/resize';
import { IccLayoutContentComponent } from './layout-content.component';

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
  imports: [
    CommonModule,
    IccLayoutHeaderComponent,
    IccLayoutContentComponent,
    IccLayoutFooterComponent,
    IccResizeDirective,
  ],
})
export class IccLayoutComponent implements AfterViewInit, AfterContentInit, OnInit, OnChanges {
  @Input() height!: string;
  @Input() width!: string;
  @Input() resizeable!: boolean;
  @Input() layout = 'fit'; // fit | viewport

  constructor(
    private elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef,
  ) {}

  ngOnInit() {
    this.initPanelSize();
  }

  ngAfterContentInit() {
    // console.log(' 111111 viewChildren=', this.viewChildren);
    // console.log(' 222222 contentChildren=', this.contentChildren);
  }

  ngAfterViewInit() {
    // console.log(' 3333333 viewChildren=', this.viewChildren);
    // console.log(' 4444444444 contentChildren=', this.contentChildren);
  }

  ngOnChanges(changes: SimpleChanges) {}

  private initPanelSize() {
    if (this.layout === 'viewport' || this.layout === 'fit') {
      this.setFitLayout();
    }
    if (this.height) {
      this.setHeight(this.height);
    }
    if (this.width) {
      this.setWidth(this.width);
    }
  }

  private setFitLayout() {
    // TODO fit width if width is set
    const size = this.getParentSize();
    if (size) {
      this.setHeight(`${size.height}px`);
      if (this.layout === 'viewport') {
        this.setWidth(`${size.width}px`);
      }
    }
  }

  private setHeight(height: string) {
    const el = this.elementRef.nativeElement;
    el.style.height = height;
  }

  private setWidth(width: string) {
    const el = this.elementRef.nativeElement;
    el.style.width = width;
    el.parentNode.style.width = width;
  }

  private getParentSize() {
    let size = null;
    if (this.layout === 'viewport') {
      size = {
        width: window.innerWidth || document.body.clientWidth,
        height: window.innerHeight || document.body.clientHeight,
      };
    } else {
      const el = this.elementRef.nativeElement;
      let ownerCt = el.parentNode.parentNode;
      if (!ownerCt || ownerCt.clientHeight <= 0) {
        ownerCt = ownerCt.parentNode;
      }
      if (ownerCt) {
        size = { width: ownerCt.clientWidth, height: ownerCt.clientHeight };
      }
    }
    return size;
  }

  onResizePanel(resizeInfo: IccResizeInfo) {
    if (resizeInfo.isResized) {
      const height = resizeInfo.height * resizeInfo.scaleY;
      const width = resizeInfo.width * resizeInfo.scaleX;
      this.setHeight(`${height}px`);
      this.setWidth(`${width}px`);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: MouseEvent) {
    if (this.layout === 'fit' || this.layout === 'viewport') {
      this.setFitLayout();
    }
  }
}
