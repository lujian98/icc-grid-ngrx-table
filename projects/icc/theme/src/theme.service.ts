import { Injectable, Inject, Renderer2, RendererFactory2 } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { share, map, pairwise, filter, startWith } from 'rxjs/operators';

import { ICC_THEME_OPTIONS, ICC_DOCUMENT } from './theme.options';
import { IccMediaBreakpointsService, IccMediaBreakpoint } from './media-breakpoints.service';
import { Platform } from '@angular/cdk/platform';

@Injectable()
export class IccThemeService {
  currentTheme!: string;
  private themeChanges$ = new ReplaySubject(1);
  private windowWidthChanges$ = new ReplaySubject<number>(2);
  private renderer!: Renderer2;

  constructor(
    @Inject(ICC_THEME_OPTIONS) protected options: any,
    private breakpointService: IccMediaBreakpointsService,
    private platform: Platform,
    private rendererFactory: RendererFactory2,
    @Inject(ICC_DOCUMENT) protected document: Document,
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    if (options?.name) {
      this.changeTheme(options.name);
    }
  }

  changeTheme(current: string): void {
    if (this.platform.TRIDENT) {
      current = 'light';
    }
    this.themeChanges$.next({ name, previous: this.currentTheme });
    const previous = this.currentTheme;
    this.currentTheme = current;

    localStorage.removeItem('currentTheme');
    localStorage.setItem('currentTheme', current);

    this.updateIframesTheme(current, previous);
  }

  updateIframesTheme(current: string, previous: string): void {
    const body = this.document.getElementsByTagName('body')[0];
    if (previous) {
      this.renderer.removeClass(body, `icc-theme-${previous}`);
    }
    this.renderer.addClass(body, `icc-theme-${current}`);

    /*
    const iframes = Array.prototype.slice.call(document.querySelectorAll('iframe'));

    if (iframes.length > 0) {
      iframes.forEach((f) => {
        try {
          const body = f.contentDocument.body || f.contentWindow.document.body;

          if (typeof body !== 'undefined' && body !== null) {
            Array.prototype.slice.call(body.classList).forEach((c, i) => {
              if (c.indexOf('icc-theme-') > -1 && c !== `icc-theme-${name}`) {
                body.classList.remove(c);
                body.classList.add(`icc-theme-${name}`);
              }
            });
          }
        } catch (e) {
          // Ignore iframe preventing script access
        }
      });
    }*/
  }

  changeWindowWidth(width: number): void {
    this.windowWidthChanges$.next(width);
  }

  onThemeChange(): Observable<any> {
    return this.themeChanges$.pipe(share());
  }

  onWindowWidthChange(): Observable<number> {
    return this.windowWidthChanges$.pipe(share());
  }

  onMediaQueryChange(): Observable<IccMediaBreakpoint[]> {
    return this.windowWidthChanges$.pipe(
      // @ts-ignore
      startWith(<number>undefined),
      pairwise(),
      map(([prevWidth, width]: [number, number]) => {
        return [this.breakpointService.getByWidth(prevWidth), this.breakpointService.getByWidth(width)];
      }),
      filter(([prevBreakpoint, breakpoint]) => {
        return prevBreakpoint.name !== breakpoint.name;
      }),
      share()
    );
  }
}
