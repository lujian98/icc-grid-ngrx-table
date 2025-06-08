import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IccCheckboxComponent } from '@icc/ui/checkbox';

@Component({
  selector: 'icc-row-select',
  templateUrl: 'row-select.component.html',
  styleUrls: ['./row-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IccCheckboxComponent],
})
export class IccRowSelectComponent {
  selected = input<boolean>(false);
  indeterminate = input<boolean>(false);
}
