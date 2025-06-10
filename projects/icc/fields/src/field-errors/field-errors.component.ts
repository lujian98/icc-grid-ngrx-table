import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { IccErrorDirective } from '@icc/ui/form-field';
import { IccIconModule } from '@icc/ui/icon';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'icc-field-errors',
  templateUrl: './field-errors.component.html',
  styleUrls: ['./field-errors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe, IccIconModule, IccErrorDirective],
})
export class IccFieldsErrorsComponent {
  errors = input.required({
    transform: (errors: ValidationErrors) => {
      return Object.keys(errors).map((key) => ({ type: key, ...errors[key] }));
    },
  });
}
