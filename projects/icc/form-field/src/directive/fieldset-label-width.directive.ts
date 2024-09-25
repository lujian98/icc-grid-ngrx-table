import { Directive, Input } from '@angular/core';
import { isNumeric } from '@icc/ui/core';

@Directive({
  selector: 'fieldset[iccFieldsetLabelWidth]',
  standalone: true,
})
export class IccFieldsetLabeLabelWidthDirective {
  private _width!: string;

  @Input('iccFieldsetLabelWidth')
  set width(width: number | string | undefined) {
    if (width) {
      this._width = isNumeric(width) ? `${width}px` : (width as string);
    }
  }
  get width(): string {
    return this._width;
  }
}
