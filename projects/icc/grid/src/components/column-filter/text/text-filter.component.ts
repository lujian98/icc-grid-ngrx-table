import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { SunTextField } from '../../../../fields/text_field';
import { IccColumnConfig } from '../../../models/grid-column.model';

@Component({
  selector: 'icc-text-filter',
  templateUrl: './text-filter.component.html',
  styleUrls: ['text-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
  ],
})
export class IccTextFilterComponent {
  column!: IccColumnConfig;
  value: string = '';
  filterPlaceholder: string = 'Filter ...';

  applyFilter(event: KeyboardEvent) {
    // @ts-ignore
    const filterValue: T = event.target.value;
    event.stopPropagation();
    this.value = filterValue;
    console.log( ' filter column =', this.column)
    console.log( ' filter value =', this.value)
    //this.filteredValues[this.column.field] = filterValue;
    //this.setDataFilters();
  }
}
