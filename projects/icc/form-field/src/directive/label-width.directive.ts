import { Directive, Input } from '@angular/core';
import { isNumeric } from '@icc/ui/core';

@Directive({
  selector: 'form[iccLabelWidth], fieldset[iccLabelWidth], icc-form-field[iccLabelWidth]',
  standalone: true,
})
export class IccLabelWidthDirective {
  private _width!: string;

  @Input('iccLabelWidth')
  set width(width: number | string | undefined) {
    if (width) {
      this._width = isNumeric(width) ? `${width}px` : (width as string);
    }
  }
  get width(): string {
    return this._width;
  }
}
