import { Injectable, Inject } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { share, map, pairwise, filter, startWith } from 'rxjs/operators';

import { ICC_THEME_OPTIONS } from './theme.options';
import { IccMediaBreakpointsService, IccMediaBreakpoint } from './media-breakpoints.service';
import { Platform } from '@angular/cdk/platform';

@Injectable()
export class IccThemeService {
  currentTheme!: string;
  private themeChanges$ = new ReplaySubject(1);
  private windowWidthChanges$ = new ReplaySubject<number>(2);

  constructor(
    @Inject(ICC_THEME_OPTIONS) protected options: any,
    private breakpointService: IccMediaBreakpointsService,
    private platform: Platform
  ) {
    if (options?.name) {
      this.changeTheme(options.name);
    }
  }

  changeTheme(name: string): void {
    console.log( ' xxxxxx changeTheme=', name)
    if (this.platform.TRIDENT) {
      name = 'light';
    }
    this.themeChanges$.next({ name, previous: this.currentTheme });
    this.currentTheme = name;

    localStorage.removeItem('currentTheme');
    localStorage.setItem('currentTheme', name);

    this.updateIframesTheme(name);
  }

  updateIframesTheme(name: string) {
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
    }
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
