import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IccFormComponent, defaultFormConfig } from '@icc/ui/form';

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
  selector: 'app-theme-form',
  templateUrl: './theme-form.component.html',
  styleUrls: ['./theme-form.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IccFormComponent],
})
export class AppThemeFormDemoComponent {
  onChange(event: any): void {
    const root: any = document.querySelector(':root');
    const hue = event.target.value;
    console.log(' change=', hue);
    // const color = lighten(red, 40%);
    // console.log( ' color=', color)
    root.style.setProperty('--background-color', `oklch(${hue}% 0 0)`);
  }

  /*
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


  // background: linear-gradient(#e66465, #9198e5);
  oklch(100% 0 106.37411429114086);

  root.style.setProperty('--background-color', `oklch(45.12% 0.267 ${hue})`)

  root.style.setProperty('--background-color', `oklch(100% 0 ${hue})`)
    --background-color: oklch(45.12% 0.267 268.81);

  const root = document.querySelector(':root')

slider.addEventListener('input', () => {
  const hue = slider.value
slider.addEventListener('input', () => {
  const hue = slider.value

  root.style.setProperty('--primary-color', `oklch(45.12% 0.267 ${hue})`)
  root.style.setProperty('--secondary-color', `oklch(94.45% 0.03 ${hue})`)
})


  root.style.setProperty('--primary-color', `oklch(45.12% 0.267 ${hue})`)
  root.style.setProperty('--secondary-color', `oklch(94.45% 0.03 ${hue})`)
})

*/
}
