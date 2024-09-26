import { Directive, Input } from '@angular/core';
import { isNumeric } from '@icc/ui/core';

@Directive({
  selector: 'icc-form-field[iccFieldWidth], fieldset[iccFieldWidth]',
  standalone: true,
})
export class IccFieldWidthDirective {
  private _width!: string;

  @Input('iccFieldWidth')
  set width(width: number | string | undefined) {
    if (width) {
      console.log(' width=', width);
      this._width = isNumeric(width) ? `${width}px` : (width as string);
    }
  }
  get width(): string {
    return this._width;
  }
}
