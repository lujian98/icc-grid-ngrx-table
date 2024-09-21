import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  IccLayoutComponent,
  IccLayoutFooterComponent,
  IccLayoutHeaderComponent,
  IccLayoutMainComponent,
} from '@icc/ui/layout';
import { IccThemeService } from '@icc/ui/theme';

/** eg. gradient("#FF0000", "#0000FF", 0.5) => "#800080" */
function gradient(color1: string, color2: string, ratio: number) {
  const from = rgb(color1);
  const to = rgb(color2);

  const r = Math.ceil(from.r * ratio + to.r * (1 - ratio));
  const g = Math.ceil(from.g * ratio + to.g * (1 - ratio));
  const b = Math.ceil(from.b * ratio + to.b * (1 - ratio));

  return '#' + hex(r) + hex(g) + hex(b);
}

/** eg. rgb("#FF0080") => { r: 256, g: 0, b: 128 } */
function rgb(color: string) {
  const hex = color.replace('#', '');
  return {
    r: parseInt(hex.substring(0, 2), 16),
    g: parseInt(hex.substring(2, 4), 16),
    b: parseInt(hex.substring(4, 6), 16),
  };
}

/** eg. hex(123) => "7b" */
function hex(num: number) {
  let number = num.toString(16);
  return number.length == 1 ? '0' + number : number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
    IccLayoutComponent,
    IccLayoutMainComponent,
    IccLayoutHeaderComponent,
    IccLayoutFooterComponent,
  ],
})
export class AppComponent {
  private themeService = inject(IccThemeService);
  title = 'icc-demo';

  gridUrl = `grid`;
  d3Url = `d3`;
  formUrl = `form`;
  selectUrl = `select`;

  toggleTheme(): void {
    this.themeService.changeTheme(this.themeService.currentTheme === 'light' ? 'dark' : 'light');
    this.setColor(0);
  }

  onChange(event: any): void {
    const hue: number = event.target.value;
    this.setColor(hue);
  }

  private setColor(hue: number): void {
    const root: any = document.querySelector(':root');
    let backgroundColor = '';
    let textColor = '';
    if (this.themeService.currentTheme === 'light') {
      backgroundColor = `hsl(0, 0%, ${100 - hue}%)`; // works
      let c = 31 + Number(hue);
      textColor = `hsl(213, 6%, ${c}%)`; // works
      // --text-basic-color:hsl(213, 6%, 31%), //#4b4f54,
      // backgroundColor = `darken(hsl(0, 0%, 100%), ${hue}%)`; // not working
    } else {
      backgroundColor = `hsl(0 0% ${hue}%)`;
    }

    console.log(' color=', backgroundColor);
    console.log(' textColor=', textColor);
    root.style.setProperty('--background-color', backgroundColor);
    //root.style.setProperty('--text-basic-color', textColor);
  }
}
/*
hsl(hue, saturation, lightness)
Hue is a degree on the color wheel from 0 to 360. 0 is red, 120 is green, and 240 is blue.
Saturation is a percentage value. 0% means a shade of gray, and 100% is the full color.
Lightness is also a percentage. 0% is black, 50% is neither light or dark, 100% is white


Saturation can be described as the intensity of a color.
100% is pure color, no shades of gray.
50% is 50% gray, but you can still see the color.
0% is completely gray; you can no longer see the color.

L (Lightness): How bright or dark do you want the color to be (0% means completely dark or black, 50%: pure color, 100%: pure white)

The lightness of a color can be described as how much light you want to give the color, 
where 0% means no light (black), 
50% means 50% light (neither dark nor light) and 100% means full lightness (white).

`oklch(45.12% 0.267 ${hue})`)

    root.style.setProperty('--background-color', color);

oklch(0% 0 0);
  .danger-alert {
  color: red;
  // light background color of same hue
  background-color: lighten(red, 40%);
}

button:hover {
  // darken the background color on hover
  background-color: darken(#eee, 10%);
}
*/
