import { Directive, Input } from '@angular/core';
import { isNumeric } from '@icc/ui/core';

@Directive({
  selector: 'form[iccFormLabelWidth]',
  standalone: true,
})
export class IccFormLabelWidthDirective {
  private _width!: string;

  @Input('iccFormLabelWidth')
  set width(width: number | string | undefined) {
    if (width) {
      this._width = isNumeric(width) ? `${width}px` : (width as string);
    }
  }
  get width(): string {
    return this._width;
  }
}
