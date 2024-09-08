import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
//import { SunTextField } from '../../../../fields/text_field';
import { IccGridFacade } from '../../../+state/grid.facade';
import { IccGridConfig, IccColumnConfig } from '../../../models/grid-column.model';
import { TextFieldComponent } from '@icc/ui/form-field';

@Component({
  selector: 'icc-text-filter',
  templateUrl: './text-filter.component.html',
  styleUrls: ['text-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, TextFieldComponent],
})
export class IccTextFilterComponent {
  private gridFacade = inject(IccGridFacade);
  //private _gridId!: string;
  private _gridConfig!: IccGridConfig;
  column!: IccColumnConfig;
  //gridConfig$!: Observable<IccGridConfig>;
  private _value: string = '';
  filterPlaceholder: string = 'Filter ...';

  @Input()
  set gridConfig(value: IccGridConfig) {
    this._gridConfig = value;
    //console.log(' gridConfig=', value, ' column=', this.column)
    const find = this.gridConfig.columnFilters.find((column) => column.name === this.column.name);
    if (find) {
      this.value = find.value as string;
    }
  }
  get gridConfig(): IccGridConfig {
    return this._gridConfig;
  }

  set value(val: string) {
    this._value = val;
  }
  get value(): string {
    return this._value;
  }

  /*
  @Input()
  set gridId(value: string) {
    this._gridId = value;
    this.gridConfig$ = this.gridFacade.selectGridConfig(this.gridId);
  }
  get gridId(): string {
    return this._gridId;
  }
    setGridColumnFilters(gridId: string, columnFilters: IccColumnFilter[]): void {
    this.store.dispatch(gridActions.setGridColumnFilters({ gridId, columnFilters }));
    //this.getGridData(gridId);
  }
  */

  onValueChange(value: string): void {
    this.applyFilter(value);
  }

  private applyFilter(filterValue: string) {
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
    this.gridFacade.setGridColumnFilters(this.gridConfig.gridId, columnFilters);
  }
}
