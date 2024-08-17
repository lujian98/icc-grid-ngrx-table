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
export class IccGridComponent {
  private gridFacade = inject(IccGridFacade);
  private _gridConfig: IccGridConfig = defaultGridConfig;
  gridConfig$!: Observable<IccGridConfig>;


  @Input()
  set gridConfig(value: IccGridConfig) {
    this._gridConfig = value;
    this.gridConfig$ = this.gridFacade.selectGridConfig(this.gridConfig.gridName);
    this.gridFacade.setupGridConfig(value);
  }
  get gridConfig(): IccGridConfig {
    return this._gridConfig;
  }

  @Input() columnConfig: IccColumnConfig[] = [];
  @Input() gridData!: IccGridData<any>;

  refresh(): void {
    this.gridFacade.getGridData(this.gridConfig.gridName);
  }
}
