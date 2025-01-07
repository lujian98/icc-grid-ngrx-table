import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IccCheckboxComponent } from '@icc/ui/checkbox';

@Component({
  selector: 'icc-row-select',
  templateUrl: 'row-select.component.html',
  styleUrls: ['./row-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IccCheckboxComponent],
})
export class IccRowSelectComponent {
  @Input() selected: boolean = false;
}
