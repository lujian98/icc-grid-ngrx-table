import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TextFieldComponent } from '@icc/ui/fields';
import { IccFieldFilterComponent } from '../field-filter.component';

@Component({
  selector: 'icc-text-filter',
  templateUrl: './text-filter.component.html',
  styleUrls: ['text-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, TextFieldComponent, IccFieldFilterComponent],
})
export class IccTextFilterComponent extends IccFieldFilterComponent {
  filterPlaceholder: string = 'Filter ...';

  onValueChange(value: string): void {
    this.filterChanged$.next(value);
  }
}
