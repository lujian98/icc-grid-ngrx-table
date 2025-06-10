import { Directive, input } from '@angular/core';
import { isNumeric } from '@icc/ui/core';

@Directive({
  selector: 'icc-form-field[iccLabelWidth]',
})
export class IccLabelWidthDirective {
  width = input(undefined, {
    alias: 'iccLabelWidth',
    transform: (width: number | string | undefined) => {
      if (width) {
        return isNumeric(width) ? `${width}px` : (width as string);
      }
      return undefined;
    },
  });
}
