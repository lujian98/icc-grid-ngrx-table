import { Directive, input } from '@angular/core';
import { isNumeric } from '@icc/ui/core';

@Directive({
  selector: 'icc-form-field[iccFieldWidth], fieldset[iccFieldWidth]',
})
export class IccFieldWidthDirective {
  width = input(undefined, {
    alias: 'iccFieldWidth',
    transform: (width: number | string | undefined) => {
      if (width) {
        return isNumeric(width) ? `${width}px` : (width as string);
      }
      return undefined;
    },
  });
}
