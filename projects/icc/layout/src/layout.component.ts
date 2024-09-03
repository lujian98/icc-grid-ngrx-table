import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Renderer2,
  Inject,
  OnDestroy,
  HostListener,
  inject,
  ElementRef,
  AfterContentChecked,
} from '@angular/core';
/*
import { takeWhile } from 'rxjs/operators';

import { IccThemeService } from '../theming/theme.service';
import { ICC_DOCUMENT, ICC_WINDOW } from '../theming/theme.options';
import { IccUtils } from '../utils/utils';
*/
@Component({
  selector: 'icc-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IccLayoutComponent implements OnInit, OnDestroy {
  /*
  private alive = true;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.themeService.changeWindowWidth(event.target.innerWidth);
  }
*/
  constructor /*
    protected themeService: IccThemeService,
    protected renderer: Renderer2,
    @Inject(ICC_DOCUMENT) protected document: Document,
    @Inject(ICC_WINDOW) protected window: Window
    */() {}

  ngOnInit() {
    /*
    this.themeService
      .onThemeChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe((theme: any) => {
        const body = this.document.getElementsByTagName('body')[0];
        if (theme.previous) {
          this.renderer.removeClass(body, `icc-theme-${theme.previous}`);
        }
        this.renderer.addClass(body, `icc-theme-${theme.name}`);
      });

    this.themeService.changeWindowWidth(this.window.innerWidth);
    */
  }

  ngOnDestroy() {
    // this.alive = false;
  }
}

@Component({
  selector: 'icc-layout-header',
  template: ` <ng-content></ng-content> `,
})
export class IccLayoutHeaderComponent {}

@Component({
  selector: 'icc-layout-sidebar',
  template: ` <ng-content></ng-content> `,
})
export class IccLayoutSidebarComponent {}

@Component({
  selector: 'icc-layout-center',
  template: ` <ng-content></ng-content> `,
})
export class IccLayoutCenterComponent {}

@Component({
  selector: 'icc-layout-footer',
  template: ` <ng-content></ng-content> `,
})
export class IccLayoutFooterComponent {}
