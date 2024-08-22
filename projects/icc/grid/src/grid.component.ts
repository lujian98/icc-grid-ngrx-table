import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IccGridFacade } from './+state/grid.facade';
import { IccGridConfig, IccColumnConfig, defaultGridConfig, IccGridData } from './models/grid-column.model';

@Component({
  selector: 'icc-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IccGridComponent<T> {
  private gridFacade = inject(IccGridFacade);
  private _gridConfig: IccGridConfig = defaultGridConfig;
  gridConfig$!: Observable<IccGridConfig>;
  columnsConfig$!: Observable<IccColumnConfig[]>;


  @Input()
  set gridConfig(value: IccGridConfig) {
    this._gridConfig = value;
    this.gridConfig$ = this.gridFacade.selectGridConfig(this.gridConfig.gridName);
    this.columnsConfig$ = this.gridFacade.selectColumnsConfig(this.gridConfig.gridName);
    this.gridFacade.setupGridConfig(value);
  }
  get gridConfig(): IccGridConfig {
    return this._gridConfig;
  }

  //@Input() columnConfig: IccColumnConfig[] = []; //TODO if input here
  @Input() gridData!: IccGridData<T>;

  refresh(): void {
    this.gridFacade.getGridData(this.gridConfig.gridName);
  }
}
