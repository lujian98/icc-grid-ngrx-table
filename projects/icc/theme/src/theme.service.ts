import { Injectable, Renderer2, RendererFactory2, inject } from '@angular/core';
import { ICC_DOCUMENT, ICC_THEME_OPTIONS, IccThemeOptions } from './theme.options';

@Injectable()
export class IccThemeService {
  private rendererFactory = inject(RendererFactory2);
  private document: Document = inject(ICC_DOCUMENT);
  private options: IccThemeOptions = inject(ICC_THEME_OPTIONS);
  private renderer: Renderer2 = this.rendererFactory.createRenderer(null, null);
  currentTheme!: string;
  rangeMax = 20; // background color lightness

  constructor() {
    if (this.options?.name) {
      this.changeTheme(this.options.name);
    }
  }

  changeTheme(current: string): void {
    const previous = this.currentTheme;
    this.currentTheme = current;
    localStorage.removeItem('currentTheme');
    localStorage.setItem('currentTheme', current);
    this.updateTheme(current, previous);
    this.setBackgroundColor(this.rangeMax);
  }

  private updateTheme(current: string, previous: string): void {
    const body = this.document.getElementsByTagName('body')[0];
    if (previous) {
      this.renderer.removeClass(body, `icc-theme-${previous}`);
    }
    this.renderer.addClass(body, `icc-theme-${current}`);
  }

  setBackgroundColor(value: number): void {
    const root: HTMLBodyElement = document.querySelector(':root')!;
    const range = this.rangeMax - Number(value);
    const lightness = this.currentTheme === 'light' ? 100 - range : range;
    const backgroundColor = `hsl(0 0% ${lightness}%)`;
    root.style.setProperty('--app-background-color', backgroundColor);
  }
}
