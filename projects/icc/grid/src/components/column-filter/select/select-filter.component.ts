import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { SelectFieldComponent } from '@icc/ui/form-field';
//import { SunTextField } from '../../../../fields/text_field';
import { IccGridFacade } from '../../../+state/grid.facade';
import { IccGridConfig, IccColumnConfig } from '../../../models/grid-column.model';

@Component({
  selector: 'icc-select-filter',
  templateUrl: './select-filter.component.html',
  styleUrls: ['select-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, SelectFieldComponent],
})
export class IccSelectFilterComponent {
  private gridFacade = inject(IccGridFacade);
  //private _gridName!: string;
  private _gridConfig!: IccGridConfig;
  column!: IccColumnConfig;
  //gridConfig$!: Observable<IccGridConfig>;
  private _value: any;
  filterPlaceholder: string = 'Filter ...';

  options = [
    { title: '', name: '' },
    { title: 'Audi', name: 'Audi' },
    { title: 'BMW', name: 'BMW' },
    { title: 'Mercedes', name: 'Mercedes' },
    { title: 'Renault', name: 'Renault' },
    { title: 'Volvo', name: 'Volvo' },
    { title: 'Fiat', name: 'Fiat' },
    { title: 'Chrysler', name: 'Chrysler' },
    { title: 'Ford', name: 'Ford' },
    { title: 'GM', name: 'GM' },
    { title: 'Honda', name: 'Honda' },
    { title: 'Jaguar', name: 'Jaguar' },
    { title: 'VW', name: 'VW' },
  ];
  @Input()
  set gridConfig(value: IccGridConfig) {
    this._gridConfig = value;
    //console.log(' gridConfig=', value, ' column=', this.column)
    const find = this.gridConfig.columnFilters.find((column) => column.name === this.column.name);
    if (find) {
      this.value = find.value;
    }
  }
  get gridConfig(): IccGridConfig {
    return this._gridConfig;
  }

  set value(val: any) {
    this._value = val;
  }
  get value(): any {
    return this._value;
  }

  /*
  @Input()
  set gridName(value: string) {
    this._gridName = value;
    this.gridConfig$ = this.gridFacade.selectGridConfig(this.gridName);
  }
  get gridName(): string {
    return this._gridName;
  }
    setGridColumnFilters(gridName: string, columnFilters: IccColumnFilter[]): void {
    this.store.dispatch(gridActions.setGridColumnFilters({ gridName, columnFilters }));
    //this.getGridData(gridName);
  }
  */

  onSelectionChange<T>(value: any): void {
    //console.log(' filtr select change options=', value);
    this.applyFilter(value);
  }

  private applyFilter(filterValue: any): void {
    this.value = filterValue;
    let columnFilters = [...this.gridConfig.columnFilters];

    const find = this.gridConfig.columnFilters.find((column) => column.name === this.column.name);
    if (find) {
      columnFilters = columnFilters.filter((col) => col.name !== this.column.name);
    }
    if (this.value) {
      columnFilters.push({
        name: this.column.name,
        value: this.value,
      });
    }
    this.gridFacade.setGridColumnFilters(this.gridConfig.gridName, columnFilters);
  }
}
