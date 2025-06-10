import { Directive, input } from '@angular/core';
import { isNumeric } from '@icc/ui/core';

@Directive({
  selector: 'form[iccFormLabelWidth]',
})
export class IccFormLabelWidthDirective {
  width = input(undefined, {
    alias: 'iccFormLabelWidth',
    transform: (width: number | string | undefined) => {
      if (width) {
        return isNumeric(width) ? `${width}px` : (width as string);
      }
      return undefined;
    },
  });
}
