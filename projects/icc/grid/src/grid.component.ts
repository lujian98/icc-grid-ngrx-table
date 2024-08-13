import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IccGridFacade } from './+state/grid.facade';
import { IccGridConfig } from './+state/grid.reducer';
import { IccColumnConfig } from './models/grid-column.model';

export interface PeriodicElement {
  name: string;
  position: number;
  symbol: string;
  weight: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'icc-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IccGridComponent {
  private gridFacade = inject(IccGridFacade);
  gridConfig!: IccGridConfig;
  private _gridName: string = '';

  @Input()
  set gridName(value: string) {
    this._gridName = value;
    this.gridFacade.setupGridConfig(value);
    this.gridFacade.selectGridConfig(this.gridName).subscribe((config)=>{
      console.log( ' config =', config)
      this.gridConfig = config;
    });
  }
  get gridName(): string {
    return this._gridName;
  }

  @Input() columnConfig: IccColumnConfig[] = [];
  @Input() gridData!: any[];
  //gridData = ELEMENT_DATA;



}
