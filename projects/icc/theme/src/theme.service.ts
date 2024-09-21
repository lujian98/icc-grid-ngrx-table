import { Platform } from '@angular/cdk/platform';
import { Inject, Injectable, Renderer2, RendererFactory2, inject } from '@angular/core';
import { ICC_DOCUMENT, ICC_THEME_OPTIONS } from './theme.options';

@Injectable()
export class IccThemeService {
  private platform = inject(Platform);
  private rendererFactory = inject(RendererFactory2);
  currentTheme!: string;
  private renderer: Renderer2 = this.rendererFactory.createRenderer(null, null);

  constructor(
    @Inject(ICC_THEME_OPTIONS) protected options: any,
    @Inject(ICC_DOCUMENT) protected document: Document,
  ) {
    if (options?.name) {
      this.changeTheme(options.name);
    }
  }

  changeTheme(current: string): void {
    if (this.platform.TRIDENT) {
      current = 'light';
    }
    const previous = this.currentTheme;
    this.currentTheme = current;
    localStorage.removeItem('currentTheme');
    localStorage.setItem('currentTheme', current);
    this.updateTheme(current, previous);
  }

  private updateTheme(current: string, previous: string): void {
    const body = this.document.getElementsByTagName('body')[0];
    if (previous) {
      this.renderer.removeClass(body, `icc-theme-${previous}`);
    }
    this.renderer.addClass(body, `icc-theme-${current}`);
  }
}
