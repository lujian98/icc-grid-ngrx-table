import { Directive, input } from '@angular/core';
import { isNumeric } from '@icc/ui/core';

@Directive({
  selector: 'fieldset[iccFieldsetLabelWidth]',
})
export class IccFieldsetLabelWidthDirective {
  width = input(undefined, {
    alias: 'iccFieldsetLabelWidth',
    transform: (width: number | string | undefined) => {
      if (width) {
        return isNumeric(width) ? `${width}px` : (width as string);
      }
      return undefined;
    },
  });
}
